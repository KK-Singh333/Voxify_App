import NavBar from "./components/navbar";
import BlogPage from "./components/BlogPage";
import { useState } from "react";
import './home.css'
export default function Home() {
    return (<div className="outer">
        <NavBar></NavBar>
        <BlogPage></BlogPage>
    </div>)
 }