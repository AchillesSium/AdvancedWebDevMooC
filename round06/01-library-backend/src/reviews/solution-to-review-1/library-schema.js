
const { gql } = require('apollo-server')


const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    author: String!
    published: Int!
    genres: [String]
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`


module.exports = { typeDefs }
