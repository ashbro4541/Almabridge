import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Moreinfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/Moreinfo/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch student data. Status: ${response.status}`);
                }
                const result = await response.json();
                if (!result.success) {
                    throw new Error(result.error || 'Failed to fetch student data');
                }
                setStudent(result.data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    <h4>Error Loading Data</h4>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning">
                    No student data found for ID: {id}
                </div>
            </div>
        );
    }

    const {
        image = "",
        firstName = "",
        lastName = "",
        year = "N/A",
        passOutYear = "N/A",
        email = "Not Available",
        mobile = "Not Available",
        qrimage = null,
        working = "No",
        companyName = "Not specified",
        miniProjects1 = "",
        miniProjects2 = "",
        bigProjects1 = "",
        bigProjects2 = "",
        academicAchievements1 = "",
        academicAchievements2 = "",
        certifications1 = "",
        certifications2 = ""
    } = student;

    const miniProjects = [miniProjects1, miniProjects2];
    const bigProjects = [bigProjects1, bigProjects2];
    const academicAchievements = [academicAchievements1, academicAchievements2];
    const certifications = [certifications1, certifications2];

    const renderListItems = (items, icon = "🔹", emptyMessage = "No data provided") => {
        if (!items?.length || items.every(i => !i)) return <li className="text-muted">{emptyMessage}</li>;
        return items.filter(Boolean).map((item, index) => (
            <li key={index}>{icon} {item}</li>
        ));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 bg-white border-0" style={{ backgroundColor: "#C6CCC8" }}>
                <div className="row">
                    {/* Profile Image & Basic Info */}
                    <div className="col-md-4 text-center">
                    <img
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1rem",
  }}
  src={
    student.image
      ? `http://localhost:3000/uploads/profileimg/${student.image}`
      : "https://via.placeholder.com/150"
  }
/>

                        <h4 className="text-primary fw-bold mt-3">{firstName} {lastName}</h4>
                        <p className="text-muted">📚 Year: {year}</p>
                        <p className="text-muted">📅 Pass Out Year: {passOutYear}</p>

                        {/* QR Image Section */}
                        {qrimage && (
                            <div className="mt-4">
                                <h5 className="fw-bold text-secondary">💳 Payment QR Code</h5>
                                <img
  style={{
    width: "120px",
    height: "120px",
    
    objectFit: "cover",
    marginBottom: "1rem",
  }}
  src={
    student.qrimage
      ? `http://localhost:3000/uploads/qrimage/${student.qrimage}`
      : "https://via.placeholder.com/150"
  }
/>

                                <p className="mt-2 text-muted">Scan this QR code to make a payment of ₹25.</p>
                            </div>
                        )}
                    </div>

                    {/* Student Details */}
                    <div className="col-md-8">
                        <div className="card p-3 mb-3">
                            <h5 className="fw-bold text-secondary">📌 Personal Information</h5>
                            <p><strong>Email:</strong> Not Available</p>
                            <p><strong>Mobile:</strong>Not Available</p>
                        </div>

                        {/* Projects */}
                        <div className="card p-3 mb-3">
                            <h5 className="fw-bold text-secondary">💻 Projects</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="text-dark">📑 Mini Projects</h6>
                                    <ul className="list-unstyled">
                                        {renderListItems(miniProjects)}
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="text-dark">🚀 Big Projects</h6>
                                    <ul className="list-unstyled">
                                        {renderListItems(bigProjects)}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="card p-3 mb-3">
                            <h5 className="fw-bold text-secondary">🏆 Academic Achievements</h5>
                            <ul className="list-unstyled">
                                {renderListItems(academicAchievements, "🎖")}
                            </ul>
                        </div>

                        {/* Certifications */}
                        <div className="card p-3 mb-3">
                            <h5 className="fw-bold text-secondary">📜 Certifications</h5>
                            <ul className="list-unstyled">
                                {renderListItems(certifications, "✅")}
                            </ul>
                        </div>

                        {/* Work Info */}
                        {working === "Yes" && (
                            <div className="card p-3 mb-3">
                                <h5 className="fw-bold text-secondary">🏢 Work Details</h5>
                                <p><strong>Company Name:</strong> {companyName}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <div className="text-center mt-4">
                    <NavLink to="/All" className="btn btn-dark me-3">⬅ Back to Profiles</NavLink>
                    <NavLink
                  to={`/ContactForm/${id}`}
                  style={{
                    padding: "0.6rem 0.8rem",
                    backgroundColor: "#333",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "5px",
                  }}
                >
                 payment
                </NavLink>
             </div>
            </div>
        </div>
    );
};

export default Moreinfo;
