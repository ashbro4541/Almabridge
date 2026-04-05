// Simple App for testing
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => <div><h1>Login Page</h1><p>Simple login for testing</p></div>;
const Home = () => <div><h1>Home Page</h1><p>Welcome to Almabridge!</p></div>;

const App = () => {
  return (
    <Router>
      <div>
        <h1>Almabridge Portal</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
