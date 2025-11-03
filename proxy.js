import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base URL remota
const API_BASE = "https://testapi-eight-pi.vercel.app";

// Función genérica para proxy con manejo seguro
async function proxy(req, res, endpoint) {
  try {
    const url = `${API_BASE}${endpoint}`;
    console.log("📡 Proxy a:", url, "Método:", req.method);

    const options = {
      method: req.method,
      headers: { "Content-Type": "application/json" },
    };

    if (req.method !== "GET") {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(url, options);

    // Leemos el texto para validar si es JSON
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      // Si no es JSON, devolvemos un error con el contenido recibido
      return res.status(response.status).json({
        message: "La API remota no devolvió JSON",
        raw: text,
      });
    }

    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Error en proxy:", err);
    res.status(500).json({ message: err.message });
  }
}

// Endpoints a proxy
const endpoints = [
  "specialties",
  "doctors",
  "healthinsurances",
  "appointments",
  "reservations",
];

endpoints.forEach((ep) => {
  app.get(`/api/${ep}`, (req, res) => proxy(req, res, `/${ep}`));
  app.post(`/api/${ep}`, (req, res) => proxy(req, res, `/${ep}`));
  app.patch(`/api/${ep}`, (req, res) => proxy(req, res, `/${ep}`));
  app.delete(`/api/${ep}`, (req, res) => proxy(req, res, `/${ep}`));
});

app.listen(PORT, () => {
  console.log(`📡 Proxy API corriendo en http://localhost:${PORT}`);
});
