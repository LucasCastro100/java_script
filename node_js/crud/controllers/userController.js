
const User = require('../models/userModel');

const userController = {
  createUser: (req, res) => {
    const { name, email, password } = req.body;

    User.create(name, email, password, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao criar usuário' });
      }
      res.status(201).json({ message: 'Usuário criado com sucesso!', userId: results.insertId });
    });
  }
};

module.exports = userController;
