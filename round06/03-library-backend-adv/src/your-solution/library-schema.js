
const { gql } = require('apollo-server')


const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String
  }

  type Book {
    title: String!,
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBook: [Book!]!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]
      token: String!
    ): Book
    
    editAuthor(name: String!, setBornTo: Int!, token: String!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }    
`

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3
  },
})

schema.plugin(uniqueValidator)
const mongooseModel = mongoose.model('User', schema)

module.exports = { typeDefs, mongooseModel }

