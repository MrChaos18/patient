import Patient from "../models/patient.js";


// ✅ Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add new patient
export const addPatient = async (req, res) => {
  try {
    console.log("📩 Incoming body:", req.body);
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    console.error("❌ Add Patient Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get patients without room
export const getUnassignedPatients = async (req, res) => {
  try {
    const patients = await Patient.find({ roomNumber: null });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Assign patient to a room
export const assignPatientToRoom = async (req, res) => {
  try {
    const { patientId, roomNumber } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      patientId,
      { roomNumber },
      { new: true }
    );

    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
