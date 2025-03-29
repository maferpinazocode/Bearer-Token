require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Middleware para validar token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "No autorizado, token requerido" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
    res.send("Backend Server funcionando. Usa /data con un token.");
  });

app.get("/data", authenticateToken, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Server en http://localhost:${PORT}`));
