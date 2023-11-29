const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
const PORT = 3000;

mongoose.connect(
  "mongodb+srv://jheissyanekelly:Xt2hskd2fxgHRh3e@cluster0.kxaalez.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
