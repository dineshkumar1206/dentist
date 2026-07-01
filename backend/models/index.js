import sequelize from "../config/database.js";
import Appointment from "./appointment.js";

const db = {
  sequelize,
  Appointment,
};

// Sync database function
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // sync models with database (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("All models synced with database successfully.");
  } catch (error) {
    console.error("Unable to connect or sync database:", error);
  }
};

export default db;
export { Appointment };
