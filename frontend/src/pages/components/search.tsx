import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config';
function SearchBar({ blogs, setBlogs }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        keyword:'',
    });
    function handleChange(e) {
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    async function handleSearch() {
        try {
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
                setBlogs([{id:'',
                    Title: 'No Blog Found',
                    Author: '',
                    Content: '',}]);
                navigate(data.redirecturl);
            }
            else {

                setBlogs(data.bloglist.map(post => ({
                    id:post.id,
                    Title: post.Title,
                    Author: post.Author,
                    Content: post.Content,
                })))
             }
         }
        catch(error) { console.log(error.message);
        }
     }
  return (
    <>
          <InputGroup style={{width:'95%',border:'2px solid white',borderRadius:'0.6rem',marginLeft:'2.7rem',marginBottom:'3rem'}} className="">
        <Form.Control
        name='keyword'
        onChange={handleChange}
        placeholder="Please Enter Author's Name or Title to search for Original Voxify Posts"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
        />
              <Button variant="outline-secondary" style={{backgroundColor:"#1E1E1E"}} onClick={handleSearch} id="button-addon2">
          Search
        </Button>
      </InputGroup>

     
    </>
  );
}

export default SearchBar;