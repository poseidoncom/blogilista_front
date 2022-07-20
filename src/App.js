import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] =useState(null)
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
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
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage('wrong username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const addBlog = async (event) =>{
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    const blog = await blogService.create(blogObject)
    setErrorMessage(`new Blog ${blog.title} added`)
    setTimeout(()=>{
      setErrorMessage(null)
    }, 5000)
    setBlogs(blogs.concat(blog))
    setAuthor('')
    setTitle('')
    setUrl('')

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
                  onChange={({target})=> setUsername(target.value)} 
                />
                <br/>
          password
                <input
                  type="password"
                  value={password}
                  onChange={({target})=> setPassword(target.value)}
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
      <button onClick={()=>{setUser(null); window.localStorage.removeItem('loggedBlogappUser')}}>logout</button>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        title:
          <input
            type="text"
            value={title}
            onChange={({target}) => setTitle(target.value)}
          /><br/>
        author:
          <input
            type="text"
            value={author}
            onChange={({target}) => setAuthor(target.value)}
          /><br/>
        url:
          <input
            type="text"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          /><br/>

        <button type='submit'>add</button>
      </form>
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
