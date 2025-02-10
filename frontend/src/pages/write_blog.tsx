import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './components/navbar';
import './write_blog.css'
import API_BASE_URL from '../config'
function WriteBlog() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: '',
        Author: '',
        Titele: '',
        Content:'',
    });
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e) => { 
        const data_request = await fetch(`${API_BASE_URL}/userdata`);
        const user_data = await data_request.json();
        const response = await fetch(`${API_BASE_URL}/write_blog`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...formData,Author:user_data.Name,Email:user_data.Email}),
            credentials:'include',
        })
        const data = await response.json();
        if (data.errorflag === 'no') {
            alert('Successfully posted');
        }
        else { 
            alert('Blog not posted');
            navigate(data.redirecturl);
        }
    }
    return (
        <>
            <NavBar></NavBar>
      <div className="blog-form">
            <Form style={{ width: '100%', padding: '2rem', color:'#E0E0E0'}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name='Title' style={{backgroundColor:'#888888'}} value={formData.Title} onChange={handleChange} placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" style={{backgroundColor:'#888888'}} value={formData.Content} onChange={handleChange} name='Content' rows={30} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
            </Form>
            </div>
            </>
  );
}

export default WriteBlog;