const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up Nodemailer transporter using a hardcoded IPv4 address
// This is the ultimate fix for Render's IPv6 ENETUNREACH bug
const transporter = nodemailer.createTransport({
    host: '192.178.211.108', // Hardcoded IPv4 for smtp.gmail.com
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        servername: 'smtp.gmail.com' // Required for the TLS certificate
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide all fields' });
    }

    try {
        const mailOptions = {
            from: email, // Note: depending on your email provider, this might appear from your own email
            to: process.env.EMAIL_USER,
            replyTo: email, // The user's email goes here so you can reply to them
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
