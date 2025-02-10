import { BrowserRouter, Routes, Route } from "react-router-dom";
import Initial from './pages/initial.tsx';
import SignUp from './pages/signup.tsx';
import Login from './pages/login.tsx';
import Home from "./pages/home.tsx";
import Viewer from "./pages/Viewer.tsx";
import WriteBlog from "./pages/write_blog.tsx";
import Account from "./pages/account.tsx";
import EditPage from "./pages/edit.tsx";
import Contact from "./pages/contact.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/writeblog" element={<WriteBlog/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/editpage" element={<EditPage />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  );
}
