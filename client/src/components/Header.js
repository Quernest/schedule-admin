import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import localeActions from '../actions/locale.actions';
import { appLocales } from '../intl';

const Header = ({ dispatch, lang }) => (
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
  </header>
);

Header.propTypes = {
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { locale } = state;
  const { lang } = locale;

  return {
    lang,
  };
};

export default connect(mapStateToProps)(Header);
