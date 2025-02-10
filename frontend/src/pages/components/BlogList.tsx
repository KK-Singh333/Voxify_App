import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import API_BASE_URL from '../../config';
import './BlogList.css'
function BlogList({ blogs, setBlogs }) {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [clickedBlog, setClickedBlog] = useState({});
    function produceHandleClick(blog) {
        return (() => {
            setClickedBlog(blog);
            console.log(blog);
            
        navigate('/viewer', { state: blog });
     });
    }
    useEffect(() => {
        async function data() { 
            try {
            const response = await fetch(`${API_BASE_URL}/userdata`, {
                method: 'GET',
                credentials: 'include',
            });
            const userData = await response.json();
                setData(userData);
        }
        catch { 
            alert('Some Problem');
            navigate('/home');
        }
        }
        data();
     },[])
     
    return (
        <div className="blog-section">
      <div className="list-container">
      <ListGroup style={{width:'100%',borderRadius:'2rem'}} as="ol">
          { blogs.map(blog=>(<ListGroup.Item
              as="li"
              key={blog.id}
              style={{backgroundColor:'#1E1E1E',color:'#E0E0E0',fontSize:'1.3rem',fontWeight:'200',height:'5rem',cursor:'pointer'}}
              onClick={produceHandleClick(blog)}
        className="d-flex justify-content-between align-items-start list-item"
      >
        <div className="ms-2  article-title">
        <div className="fw-bold">{blog.Title }</div>
        {/* { blog?.Author} */}
        </div>
      </ListGroup.Item>))}
            </ListGroup>
            </div>
            <div className="welcome">
                <h1>Hello, {data?.Name }</h1>
                <p>Hope you would be having a nice day.</p>
                <p>Here you can read some famous blogs from over internet</p>
                <p>To read Voxify Originals please use the search bar above</p>
                <p>You can also scroll on the posts on the left.</p>
                <p>Click on the post you want to read</p>
                <h2>Best Voxify Author's</h2>
                <p>1.xxxxxx</p>
                <p>2.xxxxxx</p>
                <p>3.xxxxxx</p>
                <p>4.xxxxxx</p>
                <p>5.xxxxxx</p>
                <p>6.xxxxxx</p>
                <p>7.xxxxxx</p>
                <p>8.xxxxxx</p>
                <p>9.xxxxxx</p>
                <p>10.xxxxxx</p>
            </div>
        </div>
  );
}

export default BlogList;          