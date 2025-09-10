import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  condition: String,
  doctor: String,
  nurse: String,
  roomNumber: { type: Number, default: null }, // 👈 single source of truth
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
