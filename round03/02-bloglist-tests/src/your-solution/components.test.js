
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import { Blog, BlogForm } from './components'

// *** ENTER COMMIT SHA OF YOUR REPO IN HERE ***
const commitSHA = '49c26ad64de7c8526943c89746cecf16df44102a'

// *** DO NOT REMOVE OR CHANGE THIS LINE ***
describe(`\nCOMPONENT TESTS ${process.env.SOLUTION || 'your-solution'} [ ${commitSHA} ]\n`, () => {


  describe('Blog', () => {

    const blog = {
      title: 'eka',
      author: 'Ned',
      url: 'http://host/1',
      likes: 4,
      userId: 1,
      id: 1
    }

    const handleLikes = jest.fn()
    const handleDelete = jest.fn()

    test('renders the blog title and author, but does not render its url or number of likes by default', () => {
      const component = render(
        <Blog blog={blog} handleLikes={handleLikes} deleteBlog={handleDelete}/>
      )
      expect(component.container).toHaveTextContent(
        'eka Ned'
      )
    })

    test(' blog url and number of likes are shown', () => {
      const mockHandler = jest.fn()
      const component = render(
        <Blog blog={blog} handleLikes={handleLikes} deleteBlog={handleDelete}/>
      )
      const button = component.getByText('view')
      fireEvent.click(button)
      const div = component.container.querySelector('.togglableContent')
      expect(div).not.toHaveStyle('display: none')
    })

    test('like button is clicked twice', () => {
      
      const component = render(
        <Blog blog={blog} handleLikes={handleLikes} deleteBlog={handleDelete}/>
      )
      const button = component.getByText('view')
      fireEvent.click(button)
      
      const button2 = component.getByText('Like')
      fireEvent.click(button2)
      fireEvent.click(button2)
      expect(handleLikes).toHaveBeenCalledTimes(2)
    })
  })


  describe('BlogForm', () => {

    const setTitle = jest.fn();
    const setAuthor = jest.fn();
    const setUrl = jest.fn();
    const handleNewBlog = jest.fn();
    const newTitle = 'new title';
    const newAuthor = 'new author';
    const newUrl = 'new url';
  
    test('Calls the event handler it received as props with the right details', () => {
  
      const component = render(
        <BlogForm
          handleNewBlog={handleNewBlog}
          setTitle={setTitle}
          setAuthor={setAuthor}
          setUrl={setUrl}
        />
      );
  
      const form = component.container.querySelector('form');
      const title = component.container.querySelector('#title');
      const author = component.container.querySelector('#author');
      const url = component.container.querySelector('#url');
  
      fireEvent.change(title, {
        target: { value: newTitle },
      });
      fireEvent.change(author, {
        target: { value: newAuthor },
      });
      fireEvent.change(url, {
        target: { value: newUrl },
      });
  
      fireEvent.submit(form);
  
      expect(setTitle).toBeCalledTimes(1);
      expect(title.value).toEqual(newTitle);
      expect(setAuthor).toBeCalledTimes(1);
      expect(author.value).toEqual(newAuthor);
      expect(setUrl).toBeCalledTimes(1);
      expect(url.value).toEqual(newUrl);
      expect(handleNewBlog).toBeCalledTimes(1);
    });

  })


})

