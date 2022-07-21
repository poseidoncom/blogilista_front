import Togglable from "./Togglable"

const Blog = ({blog, like, remove}) => {

  

  return(
    <div className="blog">
      <table>
        <tr><h3>{blog.title}</h3></tr>
        <Togglable buttonLabel="view">
          <tr>{blog.url}</tr>
          <tr><td>likes: {blog.likes}</td><td><button onClick={like}>like</button></td></tr> 
          <tr>{blog.author}</tr>
          <tr><button onClick={remove}>remove</button></tr>
        </Togglable>

      </table>
      
    </div>  
  )
}
export default Blog