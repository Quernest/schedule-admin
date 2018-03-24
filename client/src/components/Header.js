import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { appLocales } from '../intl';

const Header = ({ onChangeLang, lang }) => (
  <header className="header">
    <div className="header__logo">
      <a href="/">
        <img src={require('../../assets/img/logo.svg')} alt="logo" />
      </a>
    </div>
    <div className="header__languages">
      <ul className="header__languages-list">
        {appLocales.map(locale => (
          <li
            role="menuitem"
            className={classNames('header__languages-list-item', {
              active: locale === lang,
            })}
            key={locale}
            onClick={() => onChangeLang(locale)}
            onKeyPress={() => {}}
          >
            <img
              src={require(`../../assets/img/flags/${locale}.svg`)}
              alt={`${locale} translation`}
            />
          </li>
        ))}
      </ul>
    </div>
  </header>
);

Header.propTypes = {
  onChangeLang: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default Header;
