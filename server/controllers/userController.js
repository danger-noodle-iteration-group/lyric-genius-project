const User = require('../models/userModel');

const userController = {};

userController.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  // client side should validate this too
  if (name && password && email) {
    console.log('name, password, email', name, password, email);
    const newUser = new User({ name, email, password });
    newUser
      .save({ name, email, password })
      .then((result) => next())
      .catch((err) => {
        return next({
          log: 'an error occurred in userController.createUser',
          status: 400,
          message: { err: err.message },
        });
      });
    return next();
  } else {
    return next({
      log: 'an error occurred in userController.createUser:  ERROR: Invalid sign up credentials',
      status: 400,
      message: {
        err: 'userController.createUser: ERROR: Invalid sign up credentials',
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('email, password', email, password);
  User.findOne({ email })
    .then((result) => {
      if (!result) {
        return next({
          log: 'an error occurred in userController.verifyUser: error finding user',
          status: 400,
          message: {
            err: 'ERROR: no result',
          },
        });
      }
      result.comparePassword(password, function (err, isMatch) {
        if (err) {
          return next({
            log: 'an error occurred in userController.verifyUser: error comparing passwords',
            status: 400,
            message: {
              err: err,
            },
          });
        }
        if (isMatch) {
          res.locals.verified = true;
          res.locals.id = result.id;
          return next();
        } else {
          res.locals.verified = true;
          return next();
        }
      });
    })
    .catch((err) => {
      return next({
        log: 'an error occurred in userController.verifyUser',
        status: 400,
        message: {
          err: 'userController.verifyUser: ERROR: Invalid login credentials',
        },
      });
    });
};
module.exports = userController;
