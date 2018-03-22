const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const portNumber = 3000;
const sourceDir = 'public';

require('dotenv').config();

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  console.log('development mode');
  // Initialize Webpack && Hot
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackCompiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(webpackCompiler, {
      noInfo: true
    })
  );
  app.use(webpackHotMiddleware(webpackCompiler));
  app.use(require('morgan')('dev'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
} else {
  console.log('production mode');

  app.use(express.static(sourceDir));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', require('./routes'));

app.listen(process.env.PORT || portNumber, () => {
  console.log(`[INFO] Server successfully started!`);
});

module.exports = app;
