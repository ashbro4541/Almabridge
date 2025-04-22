// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Navebar';
import HomePage from './pages/HomePage';
import Form from './components/Form';
import Allprofile from './pages/Allprofile';
import Moreinfo from './pages/Moreinfo';
import AddtoFev from './pages/AddtoFev';
import Aboutus from './pages/Aboutus';
import Passout from './pages/passout';
import ContactForm from './components/ContactForm';

import Login from './aute/Login';
import Signup from './aute/Sineup';

import { AuthProvider } from './aute/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/form" element={<PrivateRoute><Form /></PrivateRoute>} />
          <Route path="/Allprofile" element={<PrivateRoute><Allprofile /></PrivateRoute>} />
          <Route path="/ContactForm/:id" element={<PrivateRoute><ContactForm /></PrivateRoute>} />
          <Route path="/Moreinfo/:id" element={<PrivateRoute><Moreinfo /></PrivateRoute>} />
          <Route path="/AddtoFev" element={<PrivateRoute><AddtoFev /></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><Aboutus /></PrivateRoute>} />
          <Route path="/Passout" element={<PrivateRoute><Passout /></PrivateRoute>} />

          {/* Redirect all unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
