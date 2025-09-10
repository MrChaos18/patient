import express from "express";
import Alert from "../models/alert.js";

const router = express.Router();

// Get all alerts
router.get("/", async (req, res) => {
  const alerts = await Alert.find().sort({ timestamp: -1 });
  res.json(alerts);
});

// Create a new alert (for testing or from Python/ESP32)
router.post("/", async (req, res) => {
  const alert = new Alert(req.body);
  await alert.save();
  res.status(201).json(alert);
});

// Acknowledge alert
router.patch("/:id/acknowledge", async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { acknowledged: true },
    { new: true }
  );
  res.json(alert);
});

export default router;
