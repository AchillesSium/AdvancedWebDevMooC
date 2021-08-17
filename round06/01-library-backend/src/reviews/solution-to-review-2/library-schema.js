
const { gql } = require('apollo-server')


const typeDefs = gql`
  type Book {
    title: String
    author: String
    published: String
    genres: [String]
  }
  type Author {
    name: String!
    bookCount: String!
    born: Int
  }
  type Query {
    bookCount: String!
    authorCount: String!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: String!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;


module.exports = { typeDefs }

