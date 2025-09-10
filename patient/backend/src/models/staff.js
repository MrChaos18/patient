import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: String,
  role: { type: String, enum: ["Doctor", "Nurse"] },
  specialization: String
});

export default mongoose.model("Staff", staffSchema);
