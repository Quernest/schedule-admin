import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import Login from './Login';
import { translationMessages } from '../intl';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lang: 'en',
    };

    this.onChangeLang = this.onChangeLang.bind(this);
    this.getCurrentLang = this.getCurrentLang.bind(this);
  }

  componentDidMount() {
    this.getCurrentLang();
  }

  onChangeLang(lang) {
    if (lang && typeof lang === 'string') {
      localStorage.setItem('lang', lang);
    }

    this.setState({
      lang,
    });
  }

  getCurrentLang() {
    const lang = localStorage.getItem('lang');

    if (lang) {
      this.setState({
        lang,
      });
    }
  }

  render() {
    const { lang } = this.state;

    return (
      <IntlProvider locale={lang} messages={translationMessages[lang]}>
        <div id="app">
          <Login onChangeLang={this.onChangeLang} />
        </div>
      </IntlProvider>
    );
  }
}

export default hot(module)(App);
