import { useLocation } from "react-router-dom";
import { useState } from "react";
import NavBar from "./components/navbar";
import './Viewer.css'
import API_BASE_URL from "../config";
function Viewer() {
    
    const location = useLocation();
    const input = location.state || {};
    console.log(input);
    
    const [summaryState, setSummaryState] = useState(0);
    const [content, setContent] = useState(input.Content);
    async function handleSummarise() {
       const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3-8b-8192",
            messages: [
                { role: "system", content: "You are an AI that summarizes text concisely." },
                { role: "user", content: `Summarize this: ${input.Content}` }
            ],
            max_tokens: 50
        })
    });

    const data = await response.json();
   setContent( data.choices[0].message.content);
     }
    return (<>
        <NavBar></NavBar>
        <div className="Container">
            <div className="header">
                <div className="heading">
                    <h1>{input.Title}</h1>
                    </div>
            </div>
            <div className="butttons" style={{marginLeft:'2rem'}}>
                <button style={{margin:'0.25rem'}} onClick={handleSummarise}>Summarise</button>
                <button style={{margin:'0.25rem'}} onClick={() => {setContent(input.Content) } }>Set To Original</button>
                </div> 
            <div className="content">
                <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
            </div>
        </>);
}

export default Viewer;
