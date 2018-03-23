const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const sourceDir = 'public';
const isDevelopment = process.env.NODE_ENV.trim() === 'development';

if (isDevelopment) {
  console.log('[INFO]: development enviroment');

  const webpack = require('webpack');
  const config = require('../webpack.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(require('morgan')('dev'));
} else {
  console.log('[INFO]: production enviroment');
  app.use(express.static(sourceDir));
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`[INFO]: Server started on port: ${port}!`);
});

module.exports = app;
