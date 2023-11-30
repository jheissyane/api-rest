const User = require('../models/userModel');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const inicio = async (req, res) => {
  try {
    res.json({ mensagem: 'Bem vindo a API de usuários' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getUser, inicio };




