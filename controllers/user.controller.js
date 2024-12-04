// user.controller.js
const User = require('../models/user.model');

exports.register = (req, res) => {
  const { id, password } = req.body;
  const user = new User({ id, password });
  user.save((err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('User created successfully');
    }
  });
};

exports.login = (req, res) => {
  const { id, password } = req.body;
  User.findOne({ id }, (err, user) => {
    if (err || !user) {
      res.status(401).send('Invalid credentials');
    } else if (user.password !== password) {
      res.status(401).send('Invalid credentials');
    } else {
      res.send('Login successful');
    }
  });
};
 
