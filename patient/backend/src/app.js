    import express from "express";
    import connectDB from "./config/db.js";
    import patientRoutes from "./routes/patientRoutes.js";
    // ❌ remove roomRoutes for now
    // import roomRoutes from "./routes/roomRoutes.js";

    const app = express();
    app.use(express.json());

    // Connect DB
    connectDB();

    // Routes
    app.use("/api/patients", patientRoutes);
    // app.use("/api/rooms", roomRoutes);  // ❌ disable for now

    export default app;
