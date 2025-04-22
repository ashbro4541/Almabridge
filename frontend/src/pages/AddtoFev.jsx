import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const AddtoFev = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:3000/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFromFavorites = async (stu_id) => {
    if (window.confirm('Remove this student from favorites?')) {
      try {
        await axios.delete(`http://localhost:3000/favorites/${stu_id}`);
        setFavorites(favorites.filter((item) => item.stu_id !== stu_id));
        alert('Removed successfully');
      } catch (error) {
        console.error("Error removing item:", error);
        alert('Failed to remove item. Please try again.');
      }
    }
  };

  if (loading) return <h3 className="text-center mt-5">Loading favorites...</h3>;
  if (error) return <h3 className="text-center mt-5 text-danger">{error}</h3>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">My Favorites</h2>
      <div className="row justify-content-center">
        {favorites.length === 0 ? (
          <p className="text-center">No favorite items added.</p>
        ) : (
          favorites.map((student) => (
            <div className="col-md-4 col-lg-3 mb-4" key={student.stu_id}>
              <div className="card shadow-lg rounded-3 p-3 bg-white border-0 text-center">
              <div className="justify-content-center align-items-center d-flex mb-3">
                <img
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                  src={
                    student.image
                      ? `http://localhost:3000/uploads/profileimg/${student.image}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={`${student.firstName} ${student.lastName}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                /></div>
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">
                    {student.firstName} {student.lastName}
                  </h5>
                  <p className="card-text text-muted">
                    <strong>Year:</strong> {student.year || 'N/A'}
                  </p>
                  {student.passOutYear && (
                    <p className="card-text">
                      <strong>Pass Out Year:</strong> {student.passOutYear}
                    </p>
                  )}
                  {student.companyName && (
                    <p className="card-text">
                      <strong>Company:</strong> {student.companyName}
                    </p>
                  )}

                  <button
                    onClick={() => removeFromFavorites(student.stu_id)}
                    className="btn btn-danger w-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddtoFev;
