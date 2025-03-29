require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USERS = {
  admin: "1234", // Usuario y contraseña de ejemplo
};

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡El servidor está funcionando correctamente!');
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!USERS[username] || USERS[username] !== password) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`OAuth Server corriendo en http://localhost:${PORT}`));