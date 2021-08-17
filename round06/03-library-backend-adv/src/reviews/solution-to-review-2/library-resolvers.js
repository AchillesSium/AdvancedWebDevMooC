
// == DO NOT CHANGE THESE THREE LINES
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid');
const { basename } = require('path')
const dataPath = basename(__dirname) === 'your-solution' ? '../..' : '../../..'
let { authors, books, users } = require(`${dataPath}/library-data`)
const {
  validateUser,
  validateGenre,
  validateLogin,
  getToken,
  getCurrentUser } = require('./utils')
// ==


// == ENTER COMMIT SHA OF YOUR REPO IN HERE 
const commitSHA = 'd1cb2d9';

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author && args.genre) {
        return books.filter((book) => {
          return book.author === args.author && book.genres.includes(args.genre)
        })
      } else if (args.author) {
        return books.filter(book => book.author === args.author)
      } else if (args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => authors,
    allUsers: () => users,
    me: (root, args, context) => getCurrentUser(context.token, users),
  },
  Author: {
    bookCount: (root) => books.filter((book) => book.author === root.name).length
  },
  Mutation: {
    addBook: (root, args, context) => {
      if (getCurrentUser(context.token, users)) {
        const authorIndex = authors.findIndex((author) => author.name === args.author)
        if (authorIndex === -1) {
          authors.push({name: args.author, id: uuid()})
        }
        const book = { ...args, id: uuid() }
        books = books.concat(book)

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } else {
        return null;
      }
    },
    editAuthor: (root, args, context) => {
      if (getCurrentUser(context.token, users)) {
        const authorIndex = authors.findIndex((author) => author.name === args.name)
        if (authorIndex > -1) {
          authors[authorIndex].born = args.setBornTo
          return authors[authorIndex]
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    createUser: (root, args) => {
      const user = { ...args, id: uuid() }
      users = users.concat(user)
      return user
    },
    login: (root, args) => {
      const user = users.find((u) => u.username === args.username)
      if (validateLogin(args.username, args.password, users)) {
        return {value: getToken(user) }
      } else {
        return null
      }
    }
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
