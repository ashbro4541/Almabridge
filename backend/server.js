const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(express.json());

const emailTemplate = require('./emailTemplate'); // make sure the path is correct
const fileUpload = require('express-fileupload');
const nodemailer = require("nodemailer");
// const sendPaymentEmail = require("./email.js");


const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// Make sure to use cookie-parser middleware
app.use(cookieParser());
const path = require('path');
app.use(fileUpload());

app.use(cors({
    origin: [""],
    methods: ["POST", "GET"], 
    credentials: true
}));

// Database connection
const exe = require("./conn.js");
app.use('/public', express.static(path.join(__dirname, 'public')));



// Add this middleware
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));


// Ensure upload directories exist
const fs = require('fs').promises;
const ensureUploadDirs = async () => {
    const profileImgDir = path.join(__dirname, 'public', 'uploads', 'profileimg');
    const qrImgDir = path.join(__dirname, 'public', 'uploads', 'qrimage');
    
    try {
        await fs.mkdir(profileImgDir, { recursive: true });
        await fs.mkdir(qrImgDir, { recursive: true });
    } catch (err) {
        console.error('Error creating upload directories:', err);
    }
};
ensureUploadDirs();

app.get('/', (req, res) => {
    return res.json('from back side!');
});


//   profiles fatch 
app.get('/studata', (req, res) => {
    const sql = "SELECT * FROM stu_data";
    exe(sql)  
    .then((result) => {
        return res.json(result);    
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    });
});
// &&&&&&&&&&&&&&&&&&&&&&&&&&&

app.get('/studatapassout', (req, res) => {
    const { year } = req.query;
    
    // Query for students marked as "passout" in Year column
    let sql = `SELECT * FROM stu_data WHERE Year = 'passout'`;
    
    if (year && !isNaN(year)) {
        sql += ` AND passOutYear = ${parseInt(year)}`;
    }
    
    exe(sql)
    .then((result) => {
        return res.json(result);
    })
    .catch((err) => {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/creatprofile", async (req, res) => {
    try {
        const {
            firstName, lastName, email, mobile, year, passOutYear,
            miniProject1, miniProject2, bigProject1, bigProject2,
            academicAchievement1, academicAchievement2,
            certifications1, certifications2,
            working, companyName
        } = req.body;

        // Handle file uploads
        const image = req.files?.image?.name || '';
        const qrimage = req.files?.qrimage?.name || '';

        const uploadImage = req.files?.image ? new Promise((resolve, reject) => {
            req.files.image.mv(path.join(__dirname, 'public', 'uploads', 'profileimg', image), (err) => {
                if (err) {
                    console.error("Error moving image file:", err);
                    reject("Error uploading image");
                } else {
                    resolve();
                }
            });
        }) : Promise.resolve();

        const uploadQRImage = req.files?.qrimage ? new Promise((resolve, reject) => {
            req.files.qrimage.mv(path.join(__dirname, 'public', 'uploads', 'qrimage', qrimage), (err) => {
                if (err) {
                    console.error("Error moving QR image file:", err);
                    reject("Error uploading QR image");
                } else {
                    resolve();
                }
            });
        }) : Promise.resolve();

        // Wait for both file uploads to finish before continuing
        await Promise.all([uploadImage, uploadQRImage]);

        // Correct SQL query
        const sql = `
            INSERT INTO stu_data (
                firstName, lastName, email, mobile, year, passOutYear,
                miniProjects1, miniProjects2, bigProjects1, bigProjects2,
                academicAchievements1, academicAchievements2,
                certifications1, certifications2, working, companyName, image, qrimage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            firstName, lastName, email, mobile, year, passOutYear,
            miniProject1, miniProject2, bigProject1, bigProject2,
            academicAchievement1, academicAchievement2,
            certifications1, certifications2,
            working === "Yes" ? "Yes" : "No",
            working === "Yes" ? companyName : null,
            image, qrimage
        ];

        exe(sql, values)  // Assuming exe handles query execution
            .then((result) => {
                console.log("Profile created successfully");
                return res.json({ success: true, message: "Profile created successfully" });
            })
            .catch((err) => {
                console.error("DB insert error:", err);
                return res.status(500).json({ success: false, error: "Database error" });
            });
    } catch (err) {
        console.error("Unexpected error:", err);
        return res.status(500).json({ success: false, error: "Server error" });
    }
});


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// 
// sineup page

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [username, email, password];

        const result = await exe(sql, values);

        console.log("Data inserted successfully:", result);

        return res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (err) {
        console.error("Database error:", err);

        // Handle duplicate email error (MySQL error code 1062)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: "Email already exists." });
        }

        return res.status(500).json({ success: false, message: "Database error: " + err.message });
    }
});

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// login 



app.post('/loginform', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const sql = `
            SELECT * FROM users 
            WHERE (username = ? OR email = ?) AND password = ?
        `;
        const result = await exe(sql, [username, email, password]);

        if (result.length > 0) {
            const name = result[0].username; // or result[0].name if that's the field
            const token = jwt.sign({ name }, 'your-secret-key', { expiresIn: '1d' });

            // Set cookie with token
            res.cookie('token', token, {
                httpOnly: true, // prevents JS access
                secure: false,  // set to true in production with HTTPS
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            return res.json({ success: true, message: "Login successful" });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



app.get('/checkauth', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    return res.json({ authenticated: true, user: decoded });
  } catch {
    return res.json({ authenticated: false });
  }
});



// &&&&&&&&&&&&&&&&&&&&&&&&



// Get student by ID
app.get('/Moreinfo/:id', async (req, res) => {
    try {
        const result = await exe('SELECT * FROM stu_data WHERE stu_id = ?', [req.params.id]);
        if (!result.length) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }
        res.json({ success: true, data: result[0] });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ success: false, error: 'Error fetching student data' });
    }
});


app.get('/ContactForm/:id', async (req, res) => {
    try {
        const result = await exe('SELECT * FROM stu_data WHERE stu_id = ?', [req.params.id]);
        if (!result.length) {
            return res.status(404).json({ success: false, error: 'Student not found' });
            console.log('Student not found');

        }
        const student = result[0];
        const { firstName, lastName, email } = student;
        const data = {
            firstName,
            lastName,
            email
        };
        return res.json({ success: true, data });  // Return data in consistent structure
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Error fetching student data' });
        console.log(err);
    }
});




app.post("/submitpayment", async (req, res) => {
  try {
    const {
      senderName,
      senderEmail,
      phone,
      transactionId,
      recipientFirstName,
      recipientLastName,
      recipientEmail
    } = req.body;

    const screenshotPath = req.file ? `http://localhost:3000/uploads/screenshots/${req.file.filename}` : "";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ashshinde4541@gmail.com",
        pass: "gnmk jmsz wbyq jpoj"
      }
    });

    const html = emailTemplate({
      senderName,
      senderEmail,
      phone,
      transactionId,
      recipientFirstName,
      recipientLastName
    });

    const mailOptions = {
      from: "ashshinde4541@gmail.com",
      to: recipientEmail,
      subject: "the person want to contact you from Almabridge",
      html
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Payment submission error:", err);
    res.status(500).json({ success: false, message: "Failed to submit payment" });
  }
});






// //  payment form 
// app.post("/submitcontactform", async (req, res) => {
//     try {
//       const { senderName, senderEmail, recipientName, recipientEmail, transactionId } = req.body;
//       const screenshotFile = req.files?.screenshot;
//       let screenshotFilename = "";
  
//       // Handle screenshot file upload
//       if (screenshotFile) {
//         screenshotFilename = Date.now() + "_" + screenshotFile.name;
//         const screenshotPath = path.join(__dirname, "public", "uploads", screenshotFilename);
  
//         // Move the file to the desired location
//         await screenshotFile.mv(screenshotPath, (err) => {
//           if (err) {
//             console.error("Error saving screenshot:", err);
//             return res.status(500).json({ success: false, error: "Failed to upload screenshot" });
//           }
//         });
//       }
  
//       // SQL query to insert payment data into database
//       const sql = `
//           INSERT INTO payment_data (senderName, senderEmail, recipientName, recipientEmail, phone, transactionId, screenshot)
//           VALUES (?, ?, ?, ?, ?, ?, ?)
//       `;
//       const values = [senderName, senderEmail, recipientName, recipientEmail, req.body.phone, transactionId, screenshotFilename];
  
//       // Execute SQL query
//       await exe(sql, values);
  
//       // Optionally, send a payment confirmation email (you may want to customize this email)
//     //   await sendPaymentEmail({ senderName, senderEmail, recipientName, recipientEmail, transactionId });
  
//       // Respond with success message
//       res.json({ success: true, message: "Payment submitted and email sent successfully." });
  
//     } catch (err) {
//       console.error("Server error:", err);
//       res.status(500).json({ success: false, error: "Server error" });
//     }
//   });
  



// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Add to favorites
app.post('/favorites', (req, res) => {
    const { stu_id, firstName, lastName, year, passOutYear, companyName, image } = req.body;
    
    // First check if already in favorites
    const checkSql = "SELECT * FROM favorites WHERE stu_id = ?";
    exe(checkSql, [stu_id])
    .then((existing) => {
        if (existing.length > 0) {
            return res.status(409).json({ error: "Student already in favorites" });
        }
        
        // Insert new favorite
        const insertSql = `
            INSERT INTO favorites 
            (stu_id, firstName, lastName, year, passOutYear, companyName, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        return exe(insertSql, [stu_id, firstName, lastName, year, passOutYear, companyName, image]);
    })
    .then(() => {
        res.status(201).json({ success: true, message: "Added to favorites" });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Failed to add to favorites" });
    });
});


// Get all favorites
app.get('/favorites', (req, res) => {
    const sql = "SELECT * FROM favorites";
    exe(sql)
    .then((result) => {
        return res.json(result);
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    });
});

// DELETE favorite by stu_id
app.delete('/favorites/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM favorites WHERE stu_id = ?";
    exe(sql, [id])
      .then(() => res.json({ success: true, message: "Removed from favorites" }))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to remove from favorites" });
      });
  });
  



const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";
app.listen(PORT, HOST, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}`);
});
