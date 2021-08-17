
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = '4bc42cbdd87bd0067618ee497b0f2f73e0dfe71e';

const { v1: uuid } = require('uuid')

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
    allBooks: (root, args) => booksByParam(args)
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      var author = {
        name: book.author,
        id: uuid(),
        born: null
      }
      authors.push(author)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
  
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }   
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
