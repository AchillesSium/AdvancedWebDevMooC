
// == DO NOT CHANGE THESE LINES
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
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
const commitSHA = 'b5bdaff';

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => books
      .filter(b => args.author === undefined ? true: b.author === args.author)
      .filter(b => args.genre === undefined ? true: b?.genres?.includes(args.genre)),
    allAuthors: () => authors,
    me: (root, args, context) => getCurrentUser(context.token, users),
    allUsers: () => users
  },
  Author: {
    bookCount: (root) => {
      return books.reduce((acc, cur) => cur.author === root.name ? acc + 1 : acc, 0)
    }
  },
  Mutation: {
    addBook: (root, args, context) => {
      const user = getCurrentUser(context.token, users)
      if (!user) {
        throw new AuthenticationError("You do not have permission to add new books.")
      }
      const newBook = { ...args, id: uuid() }
      books = books.concat(newBook)
      const newAuthor = { name: args.author, id: uuid() }
      authors = authors.map(a => a.name).includes(args.author) ? authors : authors.concat(newAuthor)

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

      return newBook
    },
    editAuthor: (root, args, context) => {
      const user = getCurrentUser(context.token, users)
      if (!user) {
        throw new AuthenticationError("You do not have permission to edit authors.")
      }
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        throw new UserInputError(`Author "${args.name}" not found.`)
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    },
    createUser: (root, args) => {
      if (!validateUser(args.username, users))
        throw new UserInputError("Invalid username or user already exists.")

      const user = { ...args, id: uuid() }
      users = users.concat(user)
      return user
    },
    login: async (root, args) => {
      const user = validateLogin(args.username, args.password, users)

      if (!user) {
        throw new AuthenticationError("Wrong credentials.")
      }

      const token = ({ value: getToken(user) })
      return token
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}


// == DO NOT CHANGE THIS LINE
module.exports = { resolvers, commitSHA }
// ==
