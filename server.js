import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_BASE = "https://testapi-eight-pi.vercel.app";

app.use(cors());
app.use(express.json());

app.get("/api/specialties", async (req, res) => {
  try {
    const response = await fetch(`${API_BASE}/specialties`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`Proxy corriendo en http://localhost:${PORT}`),
);
