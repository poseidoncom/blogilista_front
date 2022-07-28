import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog.js'

test('renders Title and url but nothing else', () => {
  const blog = {
    title: 'Testi',
    author: 'Mallikas Mikko',
    url: 'www.mima.fi',
    likes: 1
  }

  render(<Blog blog={blog}/>)
  screen.debug()

  const div = screen.querySelector('.togglableContent')
  expect(div).toHaveStyle('display: none')



})