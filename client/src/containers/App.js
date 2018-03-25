import React from 'react';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Main from './Main';
import { translationMessages } from '../intl';

const App = ({ lang }) => (
  <IntlProvider locale={lang} messages={translationMessages[lang]}>
    <div id="app">
      <Header />
      <Main />
    </div>
  </IntlProvider>
);

App.propTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { locale } = state;
  const { lang } = locale;

  return {
    lang,
  };
};

export default hot(module)(withRouter(connect(mapStateToProps)(App)));
