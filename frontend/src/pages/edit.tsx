import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavBar from './components/navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
function EditPage() {
    const [content, setContent] = useState({ Title: '', Content: '' });
    const [oldTitle, setOldTitle] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        keyword:'',
    });
    const [editData, setEditData] = useState({
        Title: '',
        Content:'',
    })
    function handleEditChange(e) {
            setEditData({...editData,[e.target.name]:e.target.value});
     }
    async function handleEditSubmit() {
        const response = await fetch(`${API_BASE_URL}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                oldTitle: oldTitle,
                Title: editData.Title,
                Content:editData.Content,
            }),
        })
        const data =await response.json();
        if (data.errorflag === 'no') {
            alert('Blog edited successfully');
        }
        else { 
            alert('There was some problem editing blog');
        }

     }
    function handleChange(e) {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    async function handleSearch() {
        try {
            const userDataRequest = await fetch(`${API_BASE_URL}/userdata`, {
                method: 'GET',
                credentials:'include',
            });
            const userData = await userDataRequest.json();
            console.log(userData);
            
            const response=await fetch(`${API_BASE_URL}/search`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
                },
    credentials:'include',
    body: JSON.stringify(formData)
            })
            const data = await response.json();
            
            console.log(data);
            if (data.errorflag === 'yes') {
                console.log('no blog found');
                setEditData({
                    Title: 'No Blog Found',
                    Content: '',
                });
                navigate(data.redirecturl);
            }
            else if (userData.Name === data.bloglist[0].Author) {
                setOldTitle(data.bloglist[0].Title)
                setEditData({
                    Title: data.bloglist[0].Title,
                    Content: data.bloglist[0].Content,
                })
            }
            else { 
                alert("Please enter a valid title authored by you");
                
            }
         }
        catch(error) { console.log(error.message);
        }
     }
  return (
      <>
          <NavBar></NavBar>
          <InputGroup style={{width:'95%',border:'2px solid white',borderRadius:'0.6rem',marginLeft:'2.7rem',marginBottom:'1rem',marginTop:'1rem'}} className="">
        <Form.Control
                  name='keyword'
        onChange={handleChange}
        placeholder="Please Enter Title of Post Authored by You"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        />
              <Button variant="outline-secondary" style={{backgroundColor:"#1E1E1E"}} onClick={handleSearch} id="button-addon2">
          Search
        </Button>
      </InputGroup>
          <div className="blog-form">
            <Form style={{ width: '100%', padding: '2rem', color:'#E0E0E0'}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name='Title' style={{backgroundColor:'#888888'}} value={editData.Title} onChange={handleEditChange} placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" style={{backgroundColor:'#888888'}} value={editData.Content} onChange={handleEditChange} name='Content' rows={30} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleEditSubmit}>
        Submit
      </Button>
            </Form>
            </div>
     
    </>
  );
}

export default EditPage;