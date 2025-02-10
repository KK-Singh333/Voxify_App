import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import { useState } from 'react';
import API_BASE_URL from '../config';
function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        Role:'VIEWER',
    });
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.errorflag === "no") {
                const path = data.redirecturl;
                alert("User Created\nRedirecting to Login page");
                
                navigate(path);
            }
            else{ 
                console.log("party");
                alert("email already used");
                navigate("/signup");
            }
        }
        
        catch(error) {
            console.log("some error");
            
         }
    }
    return (<div className='signup' style={{color:'#E0E0E0'}}>
      <h1 className='signup-head'>Sign Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='Name' required value={formData.Name } onChange={handleChange} placeholder="Enter Name" />
        <Form.Text className="text-muted">
          Please Enter Your Full Name
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='Email' value={formData.Email} onChange={handleChange} required placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" name='Password' value={formData.Password} onChange={handleChange} placeholder="Password" />
      </Form.Group>
       <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Select name="Role" value={formData.Role} onChange={handleChange}>
                <option value="VIEWER">Viewer</option>
                <option value="AUTHOR">Author</option>
            </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
      </div>
  );
}

export default SignUp;