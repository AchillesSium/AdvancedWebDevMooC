
import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors  {
          name
          born
          id
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks  {
            title
            published
            author
            id
            genres
        }
    }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $pub: Int!, $genres: [String!]) {
  addBook(
    title: $title,
    author: $author,
    published: $pub,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

export const UPDATE_BIRTHYEAR = gql`
  mutation updateBirthyear($name: String!, $br: Int!) {
    editAuthor(name: $name, setBornTo: $br)  {
      name
      born
      id
    }
  }
`