import NavBar from "./components/navbar";
import './contact.css'
export default function Contact() {
    return (<>
        <NavBar></NavBar>
        <div className="contacts" style={{border:'2px solid white',borderRadius:'1rem',padding:'1rem',margin:'2rem',color:'#E0E0E0',width:'25rem'}}>
            <h1 style={{ textDecorationLine: 'underline' }}>Dev's Contact</h1>
            <p>E-Mail : **********.com</p>
            <p>LinkedIn : *************</p>
            <p>GitHub ID : ************</p>
        </div>
    </>);
 }