
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import { Blog, NewBlog } from './components'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = 'b6f8fa2b'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nCOMPONENT TESTS ${process.env.SOLUTION || 'your-solution'} [ ${commitSHA} ]\n`, () => {

    describe('Blog', () => {

      const testBlog = {
      
        title: "toka",
        author: "Bart",
        url: "http://host/2",
        likes: 8,
        userId: 1,
        id: 2
      } 
  
      const likesUpdate = jest.fn()
      const deleteHandle = jest.fn()

      
    test('<Blog /> summary is shown', () => {         
      const blogComponent = render(
        <Blog blog={testBlog} likesUpdate={likesUpdate} deleteHandle={deleteHandle} />
      )

      const summaryDiv = blogComponent.container.querySelector('.summary')
      expect(summaryDiv).not.toHaveStyle('display: none')
      expect(summaryDiv).toHaveTextContent(testBlog.title +' '+testBlog.author)

      const detailDiv = blogComponent.container.querySelector('.detail')
      expect(detailDiv).toHaveStyle('display: none')

    })
    
    test('Click View button and testing other details are shown', () => {         
      const blogComponent = render(
        <Blog blog={testBlog} likesUpdate={likesUpdate} deleteHandle={deleteHandle} />
      )

      const viewButton = blogComponent.container.querySelector('.viewButton')
      fireEvent.click(viewButton)

      const detailDiv = blogComponent.container.querySelector('.detail')
      expect(detailDiv).not.toHaveStyle('display: none')
      expect(detailDiv).toHaveTextContent(testBlog.url)

      const summaryDiv = blogComponent.container.querySelector('.summary')
      expect(summaryDiv).toHaveStyle('display: none')
    })

    test('Clicking the like button twise should have called the event handler twise', () => {
      
      const blogComponent = render(
        <Blog blog={testBlog} likesUpdate={likesUpdate} deleteHandle={deleteHandle} />
      )

      const viewButton = blogComponent.container.querySelector('.viewButton')
      fireEvent.click(viewButton)

      const likeButton = blogComponent.container.querySelector('.likeButton')
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)

      expect(likesUpdate).toHaveBeenCalledTimes(2)

    })
    
    test('Adding new blog post should call the add function', () => {
      const handleCreate = jest.fn()
      const titleChange = jest.fn()
      const authorChange = jest.fn()
      const urlChange = jest.fn()

      const newBlogComponent = render(
        <NewBlog handleCreate={handleCreate} titleChange={titleChange} 
          authorChange={authorChange} urlChange={urlChange} />
      )

      const titleInput = newBlogComponent.container.querySelector('#title')
      fireEvent.change(titleInput, {target: {value: 'covid-19 updates'}})
      expect(titleChange).toHaveBeenCalled()

      const authorInput = newBlogComponent.container.querySelector('#author')
      fireEvent.change(authorInput, {target: {value: 'Micheal Jackson'}})
      expect(authorChange).toHaveBeenCalled()

      const urlInput = newBlogComponent.container.querySelector('#url')
      fireEvent.change(urlInput, {target: {value: 'http://www.covid-19.com'}})
      expect(urlChange).toHaveBeenCalled()

      const submitButton = newBlogComponent.container.querySelector('#submitButton')
      fireEvent.click(submitButton)
      expect(handleCreate).toHaveBeenCalled()
    })

  })



})

