import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import NavBar from "./components/navbar";
import API_BASE_URL from "../config";
import './account.css'
const Account = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        async function Data() {
            const response = await fetch(`${API_BASE_URL}/userdata`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await response.json();
            setUserData(data);
        }
        Data();
    }, []);
    return (<>
        <NavBar></NavBar>
        <div className="details-outer">
        <h1 style={{ textDecorationLine: 'underline' }}>Details</h1>
        <p>Name : {userData?.Name}</p>
        <p>Email : {userData?.Email}</p>
        <p>Role : {userData?.Role}</p>
        { userData?.Role==='AUTHOR'?(<div className="details-button">
                <button onClick={() => { navigate('/writeblog') }}>Write Blogs</button>
                <div className="space"></div>
            <button onClick={() => { navigate('/editpage') }}>Edit Blogs</button>
        </div>):(null)}
        </div>
        </>);
}
export default Account;