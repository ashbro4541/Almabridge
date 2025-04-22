import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Inside Login.jsx
import { useAuth } from '../aute/AuthContext';



// After successful login


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
const { login } = useAuth(); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      const response = await axios.post('http://localhost:3000/loginform', formData);

      if (response.data.success) {
        localStorage.setItem('isLoggedIn', 'true'); // Set login status
        setMsg('Login successful!');
      
         
          navigate('/Allprofile');
        
      } else {
        setMsg(response.data.message || 'Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMsg('An error occurred while logging in.');
    }
  };

  return (
    <div className="text-center">
      <h3 className="mb-4 fw-bold">Login Page</h3>
      <section className="vh-100 mt-5">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter email or username"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label">Email</label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label">Password</label>
                </div>
                {msg && <p className="text-danger">{msg}</p>}
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account? <a href="/signup" className="link-danger">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
