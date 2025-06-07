import { React, useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./context/AuthContext";
import { useAuthentication } from "./hooks/useAuthentication";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Post from "./pages/Post";

function App() {
  const[user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const isLoading = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])
  
  if(isLoading) { return <p>Carregando...</p> };

  return (
    <AuthProvider value={ user }>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/posts/:id" element={<Post/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/register" element={!user ? <Register/> : <Navigate to="/"/>}/>
            <Route path="/posts/edit/:id" element={user ? <EditPost/> : <Navigate to="/login"/>}/>
            <Route path="/posts/create" element={user ? <CreatePost/> : <Navigate to="/login"/>}/>
            <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
