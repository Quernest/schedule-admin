const router = require('express').Router();

router.use('/groups', require('./groups'));
router.use('/group', require('./group'));
router.use('/login', require('./login'));
router.use('/registration', require('./registration'));
router.use('/posts', require('./posts'));

router.use(function(err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;
