
// == DO NOT CHANGE THESE THREE LINES
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books } = require(`${dataPath}/library-data`)
// ==
const { v1: uuid }= require("uuid")
// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'a3559a1';


const resolvers = {
  Query: {
    bookCount: () => { return books.length },
    authorCount: () => { return authors.length },
    allBooks: (root, args) => {
      let filteredBooks = books
      if (args.author !== undefined) {
        filteredBooks = filteredBooks.filter(p => p.name === args.author)
      }
      if (args.genre !== undefined) {
        filteredBooks = filteredBooks.filter(p => p.genres.includes(args.genre))
      }
      return filteredBooks
    },
    allAuthors: () => {
      return authors
    }
  },
  Author: {
    bookCount: (root) => {
      return books.filter(p => p.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      const authorExists = authors.find(a => a.name === args.author)

      if (authorExists === undefined) {
        const author = { id: uuid(), "name": args.author, "born": null }
        authors = authors.concat(author)
      }

      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(p => p.name === args.name)

      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(p => p.name === args.name ? updatedAuthor : p)
      return updatedAuthor
    }
  }
}



// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
