const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookiesController = require('../controllers/cookiesController');

router.post(
  '/createusers',
  userController.createUser,
  // cookiesController.setSSIDCookie, // either allow login on successful signup, or remove setSSIDCookie on sign up
  (req, res) => {
    console.log('hello');
    res.status(200).send('User Created');
  }
);

router.post(
  '/login',
  userController.verifyUser,
  cookiesController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({
      id: res.locals.id,
      verified: res.locals.verified,
    });
  }
);

module.exports = router;
