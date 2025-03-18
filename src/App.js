import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">歡迎來到我的個人網站</h1>
      <p className="mt-4">這是一個簡單的 React 網站，包含我的個人介紹。</p>
      <Link to="/about" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
        關於我
      </Link>
    </div>
  );
}

function About() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">About me</h1>
      <p className="mt-4">你好！我是 Cheryl，這是我的個人網站。</p>
      <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg">
        回到首頁
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

