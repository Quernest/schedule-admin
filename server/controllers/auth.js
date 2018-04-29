const authModel = require('../models/auth');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/app');

module.exports.login = (req, res) => {
  const { body } = req;
  const { username, password } = body;

  authModel.login(req, username, password, (error, user) => {
    if (error) {
      res.status(400).send({ error });
    } else {
      jwt.sign({ user }, appConfig.config.keys.secret, (signError, token) => {
        if (signError) {
          res.status(400).send({ error: signError });
        } else {
          const { id } = user;

          res.send({
            token,
            username,
            id,
          });
        }
      });
    }
  });
};

// module.exports.registration = (req, res) => {
//   const { body } = req;
//   const { username, password } = body;

//   authModel.registration(req, username, password, (error, user) => {
//     if (error) {
//       res.statusMessage = error;
//       res.status(400).end();
//     } else {
//       jwt.sign(
//         {
//           user,
//         },
//         appConfig.config.keys.secret,
//         (error, token) => {
//           if (error) {
//             res.statusMessage = 'Authentication error';
//             res.status(400).end();
//           } else {
//             const { id } = user;

//             res.json({
//               token,
//               username,
//               id,
//             });
//           }
//         },
//       );
//     }
//   });
// };
