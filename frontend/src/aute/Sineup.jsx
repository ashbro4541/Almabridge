import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg('');

    const formDataToSend = new FormData();
    formDataToSend.append('email', formData.email);
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);

    try {
      const response = await axios.post('http://localhost:3000/register', formDataToSend);

      if (response.data.success) {
        setMsg('Profile successfully created');
        navigate('/Login'); // Redirect to login page after successful signup
      } else {
        setMsg('Error creating profile');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMsg('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh' }}>
      <section
        className="vh-100"
        style={{ background: 'linear-gradient(to right, #74ebd5, #ACB6E5)' }}
      >
        <div className="text-center">
          <h3 className="mb-4 fw-bold">Signup Page</h3>
        </div>
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-lg p-4" style={{ borderRadius: '1rem' }}>
                <div className="text-center">
                  <i className="fas fa-user-plus fa-3x mb-3" style={{ color: '#4b6cb7' }}></i>
                  <h3 className="mb-4 fw-bold">Create an Account</h3>
                </div>

                {msg && (
                  <div className="alert alert-info text-center py-2" role="alert">
                    {msg}
                  </div>
                )}

                <form onSubmit={handleSubmit} method="post">
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control form-control-lg shadow-sm"
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="userId">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.userId}
                      onChange={handleChange}
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.pass}
                      onChange={handleChange}
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Enter a strong password"
                      required
                    />
                  </div>

                  <div className="d-grid mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      style={{ backgroundColor: '#4b6cb7', border: 'none' }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>
                  </div>

                  <p className="text-center text-muted mb-0">
                    Already have an account?{' '}
                    <a href="/login" className="fw-bold text-body">
                      <u>Login here</u>
                    </a>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-md-6 d-none d-lg-block">
              <img
                src="/registratio.webp"
                alt="signup"
                className="img-fluid rounded-4"
                style={{ height: '70vh', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
