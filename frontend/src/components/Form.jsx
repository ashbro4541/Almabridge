import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        year: "",
        passOutYear: "",
        miniProject1: "",
        miniProject2: "",
        bigProject1: "",
        bigProject2: "",
        academicAchievement1: "",
        academicAchievement2: "",
        certifications1: "",
        certifications2: "",
        working: "No",
        companyName: "",
        image: null,
        qrimage: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        setFormData({ ...formData, [field]: file ?? null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMsg("");

        const formDataToSend = new FormData();

        // Append all text fields
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== 'image' && key !== 'qrimage') {
                formDataToSend.append(key, value);
            }
        });

        // Append files only if valid instances of File
        if (formData.image instanceof File) {
            formDataToSend.append("image", formData.image);
        }

        if (formData.qrimage instanceof File) {
            formDataToSend.append("qrimage", formData.qrimage);
        }

        try {
            const response = await axios.post("http://localhost:3000/creatprofile", formDataToSend);

            if (response.data.success) {
                setMsg("Profile successfully created");
                navigate('/allprofile');
            } else {
                setMsg("Error creating profile");
            }
        } catch (error) {
            console.error("Submit error:", error);
            

            setMsg("Submission failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container" style={{ paddingTop: 60, maxWidth: 800 }}>
            <h1 className="text-center mb-4">🎓 Create Student Profile</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data" method="post" className="p-4 bg-white border rounded shadow-sm">

                {/* Personal Info */}
                <h5 className="mb-3 border-bottom pb-2">👤 Personal Info</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">First Name</label>
                        <input type="text" name="firstName" className="form-control" onChange={handleChange} value={formData.firstName} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastName" className="form-control" onChange={handleChange} value={formData.lastName} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleChange} value={formData.email} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mobile</label>
                        <input type="text" name="mobile" className="form-control" onChange={handleChange} value={formData.mobile} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Year</label>
                        <input type="text" name="year" className="form-control"  placeholder="ex.FE,BE,passout" onChange={handleChange} value={formData.year} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Pass Out Year</label>
                        <input type="text" name="passOutYear" className="form-control" placeholder="ex.2024" onChange={handleChange} value={formData.passOutYear} />
                    </div>
                </div>

                {/* Projects */}
                <h5 className="mt-4 mb-3 border-bottom pb-2">🛠 Projects</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Mini Project 1</label>
                        <input type="text" name="miniProject1" className="form-control" onChange={handleChange} value={formData.miniProject1} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mini Project 2</label>
                        <input type="text" name="miniProject2" className="form-control" onChange={handleChange} value={formData.miniProject2} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Big Project 1</label>
                        <input type="text" name="bigProject1" className="form-control" onChange={handleChange} value={formData.bigProject1} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Big Project 2</label>
                        <input type="text" name="bigProject2" className="form-control" onChange={handleChange} value={formData.bigProject2} />
                    </div>
                </div>

                {/* Achievements */}
                <h5 className="mt-4 mb-3 border-bottom pb-2">🏆 Achievements</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Academic Achievement 1</label>
                        <input type="text" name="academicAchievement1" className="form-control" placeholder="ex.nptl,cgpa." onChange={handleChange} value={formData.academicAchievement1} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Academic Achievement 2</label>
                        <input type="text" name="academicAchievement2" className="form-control" onChange={handleChange} value={formData.academicAchievement2} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Certification 1</label>
                        <input type="text" name="certifications1" className="form-control" onChange={handleChange}  placeholder="ex.tcsion ,etc." value={formData.certifications1} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Certification 2</label>
                        <input type="text" name="certifications2" className="form-control" onChange={handleChange} value={formData.certifications2} />
                    </div>
                </div>

                {/* Employment Info */}
                <h5 className="mt-4 mb-3 border-bottom pb-2">💼 Employment</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Currently Working?</label>
                        <select name="working" className="form-select" value={formData.working} onChange={handleChange}>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    {formData.working === "Yes" && (
                        <div className="col-md-6">
                            <label className="form-label">Company Name</label>
                            <input type="text" name="companyName" className="form-control" value={formData.companyName} onChange={handleChange} />
                        </div>
                    )}
                </div>

                {/* Uploads */}
                <h5 className="mt-4 mb-3 border-bottom pb-2">📁 Uploads</h5>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Profile Image</label>
                        <input type="file" name="image" className="form-control" onChange={(e) => handleImageChange(e, "image")} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">QR Code Image</label>
                        <input type="file" name="qrimage" className="form-control" onChange={(e) => handleImageChange(e, "qrimage")} />
                    </div>
                    <div className="col-md-12">
                        <label className="form-label">nots/Image</label>
                        <input type="file" className="form-control" />
                    </div>
                </div>

                {/* Submit */}
                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary px-5" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Upload Profile'}
                    </button>
                    {msg && <div className="mt-3 alert alert-info">{msg}</div>}
                </div>
            </form>
        </div>
    );
};

export default Form;
