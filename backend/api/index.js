//import app from "../src/app.js";

//export default app;


import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Vercel backend is working"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Health check working"
    });
});

export default app;


