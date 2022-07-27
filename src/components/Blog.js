import { useState } from 'react'

const Blog = ({ blog, like, remove, user }) => {

  const [visible, setVisible] = useState(false)
  console.log(blog)
  console.log(user)
  if(visible){
    return(
      <div className="blog">
        <table>
          <tbody>
            <tr><td><h3>{blog.title}</h3></td></tr>
            <tr><td>{blog.url}</td></tr>
            <tr><td>likes: {blog.likes}</td><td><button onClick={like}>like</button></td></tr>
            <tr><td>{blog.author}</td></tr>
            <tr><td>added by: {blog.user.name}</td></tr>
            {user.username === blog.user.username ?
              <tr><td><button onClick={remove}>remove</button></td></tr>:null }
            <tr><td><button onClick={() => setVisible(false)}>hide</button></td></tr>
          </tbody>
        </table>
      </div>
    )
  }

  return(
    <div className="blog">
      <table>
        <tbody>
          <tr><td><h3>{blog.title}</h3></td></tr>
          <tr><td>{blog.url}</td></tr>
          <tr><td><button onClick={() => setVisible(true)}>show</button></td></tr>
        </tbody>
      </table>
    </div>

  )

}
export default Blog