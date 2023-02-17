import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog.js'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'Testi',
      author: 'Mallikas Mikko',
      url: 'www.mima.fi',
      likes: 1,
      user:{
        name: 'Tuukka Hartikainen'
      }
    }
    const user = {
      username: 'tuukka',
      name: 'Tuukka Hartikainen',
      id: '62e0e0575072af2bb6827942',
    }

    container = render(
      <Blog blog={blog} user={user}/>
    ).container
  })

  

  test('renders title and author', () => {
    
  })
  screen.debug()
  test('at start the more info are not displayed', () => {
    const div = container.querySelector('.hidedContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const div = container.querySelector('.hidedContent')
    expect(div).not.toHaveStyle('display: none')
  })
})