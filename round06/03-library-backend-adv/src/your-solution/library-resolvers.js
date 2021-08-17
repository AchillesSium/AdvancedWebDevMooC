
// == DO NOT CHANGE THESE THREE LINES
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books, users } = require(`${dataPath}/library-data`)
// ==

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = '8a8c46f657a8269e79fd9f0672c118de8e88f21d';

const { v1: uuid } = require('uuid')
var token = ''
const pubsub = new PubSub()

const {
  validateUser,
  validateGenre,
  validateLogin,
  getToken,
  getCurrentUser } = require('./utils')

const atuhorsWithBooksCount = () => {
  authors.map((author) => {
    const booksOfAuthor = books.filter(book => book.author === author.name)
    const newCount = booksOfAuthor.length
    author["bookCount"] = newCount
  })
  return authors
}

const booksByParam = (args) => {
  if(args.author && args.genre) {
    const newbooks = books.filter(b => b.author === args.author )
    const finalBookList = []
    newbooks.forEach(book => {
      for(var i = 0; i < book.genres.length; i++){
        let genre = book.genres[i]
        if(genre === args.genre){
          finalBookList.push(book)
          break
        }
      }
    })
    return finalBookList
  } 

  if(args.author && args.author.length > 0) {
    return books.filter(b => b.author === args.author )
  }
  if (args.genre && args.genre.length > 0 ){
    var newBooks = []
    books.forEach(book => {
      for(var i = 0; i < book.genres.length; i++){
        let genre = book.genres[i]
        if(genre === args.genre){
          newBooks.push(book)
          break
        }
      }
    })
    return newBooks
  }
  return books
}

const resolvers = {
  Query: {
    bookCount : () => books.length,
    authorCount: () => authors.length,
    allBook: () => books,
    allAuthors: () => atuhorsWithBooksCount(),
    allBooks: (root, args) => booksByParam(args),
    me: () => getCurrentUser(token, users)
  },

  Mutation: {
    addBook: (root, args) => {
      if(token !== args.token) {
        throw new AuthenticationError("Invalid token")
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      var author = {
        name: book.author,
        id: uuid(),
        born: null
      }
      authors.push(author)
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: (root, args) => {
      if(token !== args.token) {
        throw new AuthenticationError("Invalid token")
      }
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
  
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    },
    
    createUser: (root, args) => {
      const user = { 
        username: args.username, 
        favoriteGenre: args.favoriteGenre, 
        id: uuid() 
      }

      if(validateUser(user.username, users)){
        users.push(user)
      }else{
        throw new UserInputError("Invalid user request")
      }

      return user
    },
    login: async (root, args) => {
      if(validateLogin(args.username, args.password, users)){
        const user = users.find(user => user.username === args.username)
        token = getToken(user)
        const tokenObj = { value: token}
        return tokenObj
      }else{
        throw new AuthenticationError("wrong credentials")
      }
    },
  },

  Subscription: {    
    bookAdded: {      
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])    
    }, 
  },
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
