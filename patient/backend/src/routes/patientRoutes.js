import express from "express";
import {
  getPatients,
  addPatient,
  getUnassignedPatients,
  assignPatientToRoom,
} from "../controllers/patientController.js";

const router = express.Router();

router.get("/", getPatients);
router.post("/", addPatient);
router.get("/unassigned", getUnassignedPatients);
router.post("/assign", assignPatientToRoom);

export default router;
