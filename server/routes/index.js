const router = require('express').Router();
const path = require('path');

router.use('/api', require('./api'));

router.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
