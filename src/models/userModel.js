/* eslint-disable object-curly-spacing */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  telefones: [{
    numero: { type: String, required: true },
    ddd: { type: String, required: true },
  }],
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: { type: Date, default: Date.now, },
  ultimo_login: { type: Date, default: null },
});

module.exports = mongoose.model('User', userSchema);
