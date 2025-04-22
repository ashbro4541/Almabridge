import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ContactForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [studentInfo, setStudentInfo] = useState({ firstName: "", lastName: "", email: "" });
    const [formData, setFormData] = useState({
        senderName: "",
        senderEmail: "",
        phone: "",
        transactionId: "",
        screenshot: null,
    });

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/Moreinfo/${id}`);
                if (response.data.success) {
                    const { firstName, lastName, email } = response.data.data;
                    setStudentInfo({ firstName, lastName, email });
                }
            } catch (error) {
                console.error("Error fetching student info:", error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, screenshot: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        payload.append("senderName", formData.senderName);
        payload.append("senderEmail", formData.senderEmail);
        payload.append("phone", formData.phone);
        payload.append("transactionId", formData.transactionId);
        payload.append("screenshot", formData.screenshot);
        payload.append("recipientFirstName", studentInfo.firstName);
        payload.append("recipientLastName", studentInfo.lastName);
        payload.append("recipientEmail", studentInfo.email);

        try {
            await axios.post("http://localhost:3000/submitpayment", payload);
            alert("Payment info submitted successfully!");
            navigate("/All");
        } catch (err) {
            alert("Error submitting payment info.");
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h3>Submit Payment Form</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label>Your Name</label>
                    <input type="text" className="form-control" name="senderName" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Your Email</label>
                    <input type="email" className="form-control" name="senderEmail" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" name="phone" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Transaction ID</label>
                    <input type="text" className="form-control" name="transactionId" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label>Screenshot</label>
                    <input type="file" className="form-control" name="screenshot" required onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit Payment</button>
            </form>
        </div>
    );
};

export default ContactForm;
