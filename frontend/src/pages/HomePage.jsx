import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div style={{ backgroundColor: "#C6CCC8", minHeight: "100vh",maxWidth:"100%" }}>
      {/* Hero Section */}
      <div className="container text-center py-5" style={{ backgroundColor: "#C6CCC8" }}>
        <h1 className="display-4 fw-bold" style={{ fontFamily: '-moz-initial' }}>Welcome to Almabridge</h1>
        <p className="lead">Almabridge connects juniors, seniors, and alumni to share experiences.</p>
      </div>

      {/* Background Image Section */}
      <div className="container-fluid text-center px-0" style={{ backgroundColor: "#C6CCC8" }}>
        <div className="row mx-0">
          <div className="col-12 px-2">
            <img 
              src="/img3.jpg" 
              alt="Almabridge Community" 
              className="img-fluid w-100" 
              style={{ height: "80%", objectFit: "cover" }} 
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row g-4">
          {/* View Profile Section */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 p-3 shadow-sm">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
              </div>
              <div className="card-body text-center">
                <h3>View Profile</h3>
                <p>All the profiles that are created.</p>
                <Link to="/Allprofile" className="btn btn-primary w-100">Go to View Profile</Link>
              </div>
            </div>
          </div>

          {/* Create Profile Section */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 p-3 shadow-sm">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                </svg>
              </div>
              <div className="card-body text-center">
                <h3>Create Profile</h3>
                <p>Add your profile.</p>
                <Link to="/form" className="btn btn-primary w-100">Go to Create Profile</Link>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 p-3 shadow-sm">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-bookmark-heart" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
              </div>
              <div className="card-body text-center">
                <h3>Favorites</h3>
                <p>Save profiles for quick access.</p>
                <Link to="/favorites" className="btn btn-primary w-100">Go to Favorites</Link>
              </div>
            </div>
          </div>

          {/* Learn More Section */}
          <div className="col-md-6 col-lg-3">
            <div className="card h-100 p-3 shadow-sm">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
              </div>
              <div className="card-body text-center">
                <h3>Learn More</h3>
                <p>Explore opportunities and resources.</p>
                <Link to="/about" className="btn btn-primary w-100">Go to Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;