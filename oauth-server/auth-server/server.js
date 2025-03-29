require("dotenv").config({ path: __dirname + "/.env" });
console.log("SECRET_KEY cargado:", process.env.SECRET_KEY); // Debug
console.log("Current working directory:", process.cwd());

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USERS = {
  admin: "1234",
};

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡El servidor está funcionando correctamente!");
});

// Endpoint de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!USERS[username] || USERS[username] !== password) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  if (!process.env.SECRET_KEY) {
    return res.status(500).json({ error: "JWT_SECRET no está definido en .env" });
  }

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`OAuth Server corriendo en http://localhost:${PORT}`));