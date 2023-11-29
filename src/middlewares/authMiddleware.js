const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ mensagem: "Não há token" });
  }

  try {
    const decoded = jwt.verify(token, "chave_secreta");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensagem: "Sessão inválida" });
    }
    res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = { authenticate };
