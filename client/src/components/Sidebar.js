import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import sidebarActions from '../actions/sidebar.actions';
import userActions from '../actions/user.actions';

const menu = [
  {
    id: 'app.sidebar.menu.item.home',
    link: '/dashboard',
  },
  {
    id: 'app.sidebar.menu.item.groups',
    link: '/dashboard/groups',
  },
  {
    id: 'app.sidebar.menu.item.subjects',
    link: '/dashboard/subjects',
  },
  {
    id: 'app.sidebar.menu.item.teachers',
    link: '/dashboard/teachers',
  },
  {
    id: 'app.sidebar.menu.item.locations',
    link: '/dashboard/locations',
  },
  {
    id: 'app.sidebar.menu.item.semesters',
    link: '/dashboard/semesters',
  },
];

class Sidebar extends Component {
  static propTypes = {
    isOpened: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  state = {
    windowWidth: 0,
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', this.handleResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const windowWidth = window.innerWidth;

    this.toggle(windowWidth);

    this.setState({
      windowWidth,
    });
  }

  toggle = (windowWidth = 0) => {
    const { dispatch } = this.props;

    if (windowWidth > 768) {
      dispatch(sidebarActions.show());
    } else {
      dispatch(sidebarActions.hide());
    }
  }

  render() {
    const { windowWidth } = this.state;
    const { isOpened, intl, dispatch } = this.props;
    const { formatMessage } = intl;

    return (
      <aside className={classNames('sidebar', { in: isOpened })}>
        <nav>
          <ul className="sidebar-menu">
            {menu.map((item) => {
              const { id, link } = item;

              return (
                <li className="sidebar-menu__item" key={id}>
                  <NavLink
                    exact
                    onClick={() => this.toggle(windowWidth)}
                    activeClassName="active"
                    className="sidebar-menu__item-link"
                    to={link}
                  >
                    {formatMessage({ id })}
                  </NavLink>
                </li>
              );
            })}
            <li className="sidebar-menu__item sidebar-menu__item-logout">
              <span
                onClick={() => dispatch(userActions.logout())}
                onKeyPress={() => {}}
                role="button"
                tabIndex="0"
              >
                {formatMessage({ id: 'app.sidebar.menu.item.logout' })}
              </span>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  const { sidebar } = state;
  const { isOpened } = sidebar;

  return {
    isOpened,
  };
};

export default injectIntl(connect(mapStateToProps)(Sidebar));
