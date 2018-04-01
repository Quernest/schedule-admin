import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import localeActions from '../actions/locale.actions';
import sidebarActions from '../actions/sidebar.actions';
import { appLocales } from '../intl';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const windowWidth = window.innerWidth;

    this.setState({
      windowWidth,
    });
  }

  render() {
    const { windowWidth } = this.state;
    const isSmallScreen = windowWidth < 768;

    const {
 dispatch, lang, loggedIn, isOpened 
} = this.props;

    return (
      <header className="header">
        <div className="header__logo">
          <Link to="/">
            <img src={require('../../assets/img/logo.svg')} alt="logo" />
          </Link>
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
        {loggedIn &&
          isSmallScreen && (
            <div
              className="header__menu"
              onClick={() =>
                (isOpened
                  ? dispatch(sidebarActions.hide())
                  : dispatch(sidebarActions.show()))
              }
              onKeyPress={() => {}}
              tabIndex="0"
              role="button"
            >
              <img
                className="header__menu-icon"
                src={require('../../assets/img/menu.svg')}
                alt="menu icon"
              />
            </div>
          )}
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool,
};

Header.defaultProps = {
  loggedIn: false,
};

const mapStateToProps = (state) => {
  const { locale, user, sidebar } = state;
  const { loggedIn } = user;
  const { lang } = locale;
  const { isOpened } = sidebar;

  return {
    isOpened,
    loggedIn,
    lang,
  };
};

export default connect(mapStateToProps)(Header);
