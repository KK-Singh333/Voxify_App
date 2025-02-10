import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
    });
    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials:'include',
            });
            const data = await response.json();
            if (data.errorflag === 'no') {
                alert('login successful')
                navigate(data.redirecturl)
            }
            else {
                alert('Wrong Credentials');
                navigate(data.redirecturl);
             }
        }
        catch {
            console.log("some error occured");
         }
    }
    return (<div className='login'>
      <h1 className='login-head'>Login</h1>
      <Form>
        
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
            <Button variant="primary" type="submit" style={{marginRight:'1rem'}} onClick={handleSubmit}>
        Submit
            </Button>
            <Button variant="primary" type="submit" href='/signup'>
        Register 
      </Button>
      </Form>
      </div>
  );
}

export default Login;