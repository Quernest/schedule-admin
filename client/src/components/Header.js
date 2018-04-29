import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import localeActions from '../actions/locale.actions';
import sidebarActions from '../actions/sidebar.actions';
import { appLocales } from '../intl';

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    lang: PropTypes.string.isRequired,
    isOpened: PropTypes.bool.isRequired,
    loggedIn: PropTypes.bool,
  }

  static defaultProps = {
    loggedIn: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      windowWidth: 0,
    };

    this.handleResize = this.handleResize.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
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

  toggleSidebar() {
    const { dispatch, isOpened } = this.props;

    if (isOpened) {
      dispatch(sidebarActions.hide());
    } else {
      dispatch(sidebarActions.show());
    }
  }

  render() {
    const { windowWidth } = this.state;

    const isSmallScreen = windowWidth <= 768;

    const {
      dispatch,
      lang,
      loggedIn,
      isOpened,
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
            <button
              className={classNames('hamburger', { active: isOpened })}
              type="button"
              onClick={this.toggleSidebar}
            >
              <span className="hamburger-lines" />
            </button>
          )}
      </header>
    );
  }
}

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
