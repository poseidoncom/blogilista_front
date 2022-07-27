import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] =useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const like = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes+1 }
    const returnedBlog = await blogService.update(blog.id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  }

  const remove = async (id) => {
    await blogService.remove(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const addBlog = async (blogObject) => {

    const blog = await blogService.create(blogObject)
    setErrorMessage(`new Blog ${blog.title} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    setBlogs(blogs.concat(blog))

  }

  if (user === null){
    return(
      <div>
        <Notification message={errorMessage}/>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br/>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage}/>
      <p>logged in as a {user.name}</p>
      <button onClick={() => {setUser(null); window.localStorage.removeItem('loggedBlogappUser')}}>logout</button>
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <h2>Blogs</h2>
      {blogs.sort((a,b) => a.likes < b.likes ? 1 : -1).map(blog =>
        <Blog key={blog.id} blog={blog} like={() => like(blog.id)} remove={() => remove(blog.id)} user={user} />
      )}
    </div>
  )
}

export default App
