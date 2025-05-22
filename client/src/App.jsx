import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Detect from './pages/Detect';
import './App.css';

function App() {
  return (
    <div className='bg-blue-500 w-full h-full'>
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detect" element={<Detect />} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;