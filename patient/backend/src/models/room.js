import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", default: null }
});

export default mongoose.model("Room", roomSchema);
