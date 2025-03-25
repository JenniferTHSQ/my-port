import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
//import CommentBoard from "./pages/commentboards";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
//import Users from "./pages/Users";
//import CreateUser from "./pages/CreateUser";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Fortune from "./pages/Fortune";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-3xl mx-auto pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/fortune" element={<Fortune />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
console.log("🚀 本次部署於", new Date().toLocaleString());