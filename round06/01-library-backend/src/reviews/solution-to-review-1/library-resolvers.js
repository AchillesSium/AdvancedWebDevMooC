
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==
const { v1: uuid } = require('uuid')

// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = '6c893d1 ';



const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if(!args.author && !args.genre) return books

      const byAuthor = args.author ? books.filter(book => book.author === args.author) : books
      const byGenre = args.genre ? byAuthor.filter(book => book.genres.some(g => g === args.genre)) : byAuthor
      return byGenre
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      if (!authors.some(author => author.name === args.author)) {
        authors = authors.concat({name: args.author, born: null})
      }
      return book
    },
    editAuthor: (root, args) => {
      authors = authors.map(author => {
        if (author.name === args.name) {
          author.born = args.setBornTo
          return author
        } else {
          return author
        }
      })
      const updatedAuthor = authors.find(author => author.name === args.name)
      return updatedAuthor
    }
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
