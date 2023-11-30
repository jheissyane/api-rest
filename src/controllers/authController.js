const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signUp = async (req, res) => {
  try {
    const {nome, email, password, telefones} = req.body;

    const user = await User.findOne({email});
    if (user) {
      return res.status(401).json({mensagem: 'E-mail já existente'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      nome,
      email,
      password: hashedPassword,
      telefones,
    });

    await newUser.save();

    respObj = {
      id: newUser._id,
      data_criacao: newUser.data_criacao.toLocaleString('pt-BR'),
      data_atualizacao: newUser.data_atualizacao.toLocaleString('pt-BR'),
      ultimo_login: newUser.ultimo_login,
    };

    res.json({respObj});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

const signIn = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (!user) {
      return res
          .status(401)
          .json({mensagem: 'Usuário não cadastrado e/ou senha incorreta'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
          .status(401)
          .json({mensagem: 'Usuário não cadastrado e/ou senha incorreta'});
    }

    const token = jwt.sign({userId: user._id}, 'chave_secreta', {
      expiresIn: '30m',
    });

    user.data_atualizacao = Date.now();
    user.ultimo_login = Date.now();


    const responseObj = {
      id: user._id,
      data_criacao: user.data_criacao.toLocaleString('pt-BR'),
      data_atualizacao: user.data_atualizacao.toLocaleString('pt-BR'),
      ultimo_login: user.ultimo_login.toLocaleString('pt-BR'),
      token,
    };

    res.json({responseObj});
  } catch (error) {
    res.status(500).json({mensagem: error.message});
  }
};

module.exports = {signUp, signIn};
