const express = require('express');
const UserService = require('../services/users');
const userRouter = express.Router();

userRouter.post('/', (req, res, next) => {
  const { email } = req.body;
  console.log('email: ', email)
  UserService.addUser(email)
    .then(user => {
      res.json({'user': user});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

userRouter.get('/', (req, res, next) => {
  const { email } = req.query;
  console.log('email: ', email)
  UserService.getUserByEmail(email)
    .then(user => {
      res.json({'user': user});
    })
    .catch(err => {
      res.status(404).json({'err': err});
    });
});

userRouter.put('/', (req, res, next) => {
  const { email } = req.query;
  const { funds } = req.body;
  UserService.updateUserFunds(email, funds)
  .then(user => {
    res.json({'user': user});
  })
  .catch(err => {
    res.status(404).json({'err': err});
  });
});

module.exports = userRouter;