/* eslint-disable linebreak-style */
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Conexão ao MongoDB estabelecida com sucesso!");
});

db.on("error", (err) => {
  console.error(`Erro na conexão ao MongoDB: ${err}`);
});

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server rodando na porta: ${PORT}`);
});
