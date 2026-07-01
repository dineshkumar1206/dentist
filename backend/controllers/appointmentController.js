import Appointment from "../models/appointment.js";

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
