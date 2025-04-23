import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                {/* Brand Logo and Name */}
                <NavLink className="navbar-brand d-flex align-items-center" to="/home">
                    <img 
                        src="/navlogo.jpg" // Update with your actual logo path
                        alt="IMF Logo" 
                        className="me-2"
                        style={{ height: "60px" }} // Adjust size as needed
                    />
                    <span className="fw-bold text-light">Almabridge</span>
                </NavLink>

                {/* Toggle Button for Mobile */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Allprofile">
                               All Profiles
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Passout">
                               pass out 
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Form">
                               Create Profile
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/AddtoFev">
                            Favourites
                            </NavLink>
                        </li>
                       
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
