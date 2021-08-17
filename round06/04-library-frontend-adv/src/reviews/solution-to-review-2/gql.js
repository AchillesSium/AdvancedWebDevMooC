
import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author
    published
    genres
    id
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS} 
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  } 
  ${BOOK_DETAILS}
`
export const ALL_USERS = gql`
  query {
    allUsers {
      username
      favoriteGenre
    }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $setToBorn: Int!) {
    editAuthor(name: $name, setBornTo: $setToBorn)  {
      name
      born
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`