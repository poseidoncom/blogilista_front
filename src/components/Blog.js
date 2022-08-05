import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div className="blog">
      <table>
        <tbody>
          <div>
            <tr><td><h3>{blog.title}</h3></td></tr>
            <tr><td>{blog.author}</td></tr>
            <tr><td><button onClick={toggleVisibility}>{visible ? 'hide': 'show'}</button></td></tr>
          </div>
          <div style={showWhenVisible} className="hidedContent">
            <tr><td>likes: {blog.likes}</td><td><button id='like-button' onClick={like}>like</button></td></tr>
            <tr><td>{blog.url}</td></tr>
            <tr><td>added by: {blog.user.name}</td></tr>
            {user.username === blog.user.username ?
              <tr><td><button id ='remove-button' onClick={remove}>remove</button></td></tr>:null }
          </div>
        </tbody>
      </table>
    </div>
  )


}
export default Blog