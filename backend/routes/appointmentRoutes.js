import express from "express";
import {
  createAppointment,
  getAllAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Define routes
router.route("/").post(createAppointment).get(getAllAppointments);

export default router;
