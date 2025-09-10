import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  patientName: { type: String, required: true },
  type: { type: String, enum: ["critical", "warning", "info"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  acknowledged: { type: Boolean, default: false },  // ✅ make sure this exists
});

export default mongoose.model("Alert", alertSchema);
