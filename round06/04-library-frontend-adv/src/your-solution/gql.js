
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
mutation createBook($title: String!, $author: String!, $pub: Int!, $genres: [String!], $token: String!) {
  addBook(
    title: $title,
    author: $author,
    published: $pub,
    genres: $genres,
    token: $token
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

export const LOGIN = gql`
  mutation userLogin($username: String!, $password: String!) {
    login(username: $username, password: $password){
      value
    }
  }
`

export const CURRENT_USER = gql`
    query {
      me  {
          username
          favoriteGenre
      }
}
`

export const BOOK_ADDED = gql`  
  subscription {    
    bookAdded {      
      title
      published
      author
      genres 
    }  
  }  
`