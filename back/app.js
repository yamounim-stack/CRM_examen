
import express from "express";

const app = express();

app.use(express.json());
app.use(express.static("front"));

app.get("/api", (req, res) => {
    res.json({ message: "Le serveur CRM fonctionne !" });
});

export default app;
