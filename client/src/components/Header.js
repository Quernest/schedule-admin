import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import localeActions from '../actions/locale.actions';
import { appLocales } from '../intl';

const Header = ({ dispatch, lang, loggedIn }) => (
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
            onClick={() => dispatch(localeActions.setLocale(locale))}
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
    {loggedIn && (
      <div className="header__logout">
        <img src={require('../../assets/img/logout.svg')} alt="logout" />
      </div>
    )}
  </header>
);

Header.propTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { locale, user } = state;
  const { loggedIn } = user;
  const { lang } = locale;

  return {
    loggedIn,
    lang,
  };
};

export default connect(mapStateToProps)(Header);
