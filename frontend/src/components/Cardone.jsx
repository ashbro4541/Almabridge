import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';

const Cardone = () => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success", "error", "info"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:3000/studata");
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToFavorites = async (studata) => {
    try {
      if (favorites.some(fav => fav.stu_id === studata.stu_id)) {
        setMessage(`${studata.firstName} is already in favorites!`);
        setMessageType("info");
        return;
      }

      await axios.post("http://127.0.0.1:3000/favorites", studata);
      setFavorites([...favorites, studata]);
      setMessage(`${studata.firstName} added to favorites!`);
      setMessageType("success");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage(err.response.data.message || `${studata.firstName} is already in favorites!`);
        setMessageType("info");
      } else {
        console.error("Error adding to favorites:", err);
        setMessage(`Failed to add ${studata.firstName} to favorites. Please try again.`);
        setMessageType("error");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div className="loader" />
        <p>Loading student profiles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem", color: "red" }}>
        <h4>Error Loading Profiles</h4>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Student Profiles</h2>

      {message && (
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            marginBottom: "1rem",
            color:
              messageType === "error"
                ? "red"
                : messageType === "success"
                ? "green"
                : "blue",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {data.length > 0 ? (
          data.map((studata) => (
            <div
              key={studata.stu_id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "1rem",
                width: "250px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
             <img
               style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
  src={
    studata.image
      ? `http://localhost:3000/uploads/profileimg/${studata.image}`
      : "https://via.placeholder.com/150"
  }
/>

              <h4>
                {studata.firstName} {studata.lastName}
              </h4>
              <p>
                <strong>Year:</strong> {studata.year || "N/A"}
              </p>
              {studata.passOutYear && (
                <p>
                  <strong>Pass Out Year:</strong> {studata.passOutYear}
                </p>
              )}
              {studata.companyName && (
                <p>
                  <strong>Company:</strong> {studata.companyName}
                </p>
              )}

              <div
                style={{
                  marginTop: "auto",
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => addToFavorites(studata)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "red",
                    fontSize: "1.5rem",
                  }}
                >
                  ❤️
                </button>

                <NavLink
                  to={`/Moreinfo/${studata.stu_id}`}
                  style={{
                    padding: "0.6rem 0.8rem",
                    backgroundColor: "#333",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "5px",
                  }}
                >
                  View Profile
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No student profiles found. Be the first to create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Cardone;
