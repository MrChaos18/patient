import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import alertRoutes from "./src/routes/alertRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Only patients route (no Room model now)
app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/alerts", alertRoutes);
