import React from 'react';
import { hot } from 'react-hot-loader';

import Login from './Login';

const App = () => (
  <div id="app">
    <Login />
  </div>
);

export default hot(module)(App);
