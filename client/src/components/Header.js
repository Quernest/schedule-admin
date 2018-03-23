import React from 'react';
import PropTypes from 'prop-types';
import { appLocales } from '../intl';

const Header = ({ onChangeLang }) => (
  <header className="header">
    <div className="header-logo">
      <a href="/">
        <img src={require('../../assets/img/logo.svg')} alt="logo" />
      </a>
    </div>
    <div className="header__languages">
      <ul className="header__languages-list">
        {appLocales.map(lang => (
          <li
            role="menuitem"
            className="header__languages-list-item"
            key={lang}
            onClick={() => onChangeLang(lang)}
            onKeyPress={() => {}}
          >
            <img src={require(`../../assets/img/flags/${lang}.svg`)} alt={`${lang} translation`} />
          </li>
        ))}
      </ul>
    </div>
  </header>
);

Header.propTypes = {
  onChangeLang: PropTypes.func.isRequired,
};

export default Header;
