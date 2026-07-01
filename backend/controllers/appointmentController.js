import Appointment from "../models/appointment.js";
import nodemailer from "nodemailer";

// Helper function to send email notification. Wrapped in try-catch to never block/crash backend.
const sendAppointmentEmail = async (appointmentData) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      service,
      age,
      date,
      time,
      concern,
    } = appointmentData;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiverEmail = process.env.RECEIVER_EMAIL || "dineshkumar20031206@gmail.com";

    // Skip sending if environment variables are not configured yet
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn("Email warning: SMTP environment variables are not configured. Skipping email delivery.");
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort) || 465,
      secure: parseInt(smtpPort) === 465, // true for port 465, false for 587
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f7fafc;
            margin: 0;
            padding: 0;
            color: #2d3748;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            border-bottom: 2px solid #682187;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .header h2 {
            margin: 0;
            color: #682187;
            font-size: 24px;
            font-weight: 700;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .details-list li {
            padding: 12px 15px;
            margin-bottom: 8px;
            background-color: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #682187;
            font-size: 15px;
            color: #1a202c;
          }
          .details-list li strong {
            color: #4a5568;
            width: 180px;
            display: inline-block;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #a0aec0;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Appointment Request</h2>
          </div>
          <div class="content">
            <p>You have received a new consultation booking request from your website. The client details are listed below:</p>
            <ul class="details-list">
              <li><strong>Patient Name:</strong> ${firstName} ${lastName}</li>
              <li><strong>Phone Number:</strong> ${phone}</li>
              <li><strong>Email Address:</strong> ${email}</li>
              <li><strong>Treatment Service:</strong> ${service}</li>
              <li><strong>Patient Age Group:</strong> ${age}</li>
              <li><strong>Preferred Date:</strong> ${date}</li>
              <li><strong>Preferred Time Slot:</strong> ${time}</li>
              <li><strong>Describe Concern:</strong> ${concern || "No concerns specified"}</li>
            </ul>
          </div>
          <div class="footer">
            <p>This is an automated notification from your Dentist Appointment system.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Dentist Appointment System" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: email, // Set Reply-To to patient's email to make replies easy
      subject: `🦷 New Appointment Request: ${firstName} ${lastName} - ${service}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email notification status: Sent successfully to ${receiverEmail}. Message ID: ${info.messageId}`);
  } catch (emailError) {
    console.error("Email notification status: Failed to send email and not working properly.", emailError);
  }
};

// @desc    Create a new appointment request
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      service,
      age,
      date,
      time,
      concern,
    } = req.body;

    // Simple validation helper
    if (!firstName || !lastName || !phone || !email || !service || !age || !date || !time) {
      console.warn("Appointment validation status: missing required fields and not working properly.");
      return res.status(400).json({
        success: false,
        message: "Appointment validation status: Failed to submit because required fields are missing and not working properly.",
      });
    }

    // Create appointment in DB via Sequelize
    const appointment = await Appointment.create({
      firstName,
      lastName,
      phone,
      email,
      service,
      age,
      date,
      time,
      concern,
    });

    console.log("Appointment creation status: Appointment saved to database and working properly.");

    // Fire email sending asynchronously - it handles its own errors and won't crash backend/API call
    sendAppointmentEmail({
      firstName,
      lastName,
      phone,
      email,
      service,
      age,
      date,
      time,
      concern,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment creation status: Appointment request submitted successfully and working properly!",
      data: appointment,
    });
  } catch (error) {

    console.error("Appointment creation status: database write failed and not working properly.", error);
    return res.status(500).json({
      success: false,
      message: "Appointment creation status: Database insert failed and not working properly.",
      error: error.message,
    });
  }
};

// @desc    Get all appointment requests
// @route   GET /api/appointments
// @access  Public (Can be protected with middleware/auth in production)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [["createdAt", "DESC"]],
    });

    console.log("Appointments read status: Successfully read records from database and working properly.");
    return res.status(200).json({
      success: true,
      message: "Appointments read status: Records fetched from the database successfully and working properly.",
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    console.error("Appointments read status: Failed to fetch records from database and not working properly.", error);
    return res.status(500).json({
      success: false,
      message: "Appointments read status: Database query failed and not working properly.",
      error: error.message,
    });
  }
};
