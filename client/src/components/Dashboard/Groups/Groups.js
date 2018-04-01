import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ActivityLoader from '../../../components/ActivityLoader';
import groupsActions from '../../../actions/groups.actions';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(groupsActions.getAll());
  }

  render() {
    const { dispatch, groups: { list, fetching }, intl } = this.props;
    const { formatMessage } = intl;

    if (fetching) {
      return <ActivityLoader />;
    }

    return (
      <div className="dashboard-groups">
        <div className="dashboard-groups__heading">
          <h3>{formatMessage({ id: 'app.sidebar.menu.item.groups' })}</h3>
          <div className="dashboard-groups__heading-btns">
            <div
              className="refresh"
              onClick={() => dispatch(groupsActions.getAll(false))}
              onKeyPress={() => {}}
              role="button"
              tabIndex="0"
            />
            <Link className="btn" to="/dashboard/groups/add">
              {formatMessage({ id: 'app.dashboard.groups.button.addgroup' })}
            </Link>
          </div>
        </div>
        {list &&
          list.length > 0 && (
            <ul className="dashboard-groups__list">
              {list.map((group) => {
                const { name, id } = group;
                return (
                  <li className="dashboard-groups__list-item" key={id}>
                    <span>{name}</span>
                    <div className="dashboard-groups__list-item-controls">
                      <div
                        className="dashboard-groups__list-item-edit"
                        // onClick={() => dispatch(groupsActions.remove(id))}
                        // onKeyPress={() => {}}
                        role="button"
                        tabIndex="0"
                      >
                        <img
                          src={require('../../../../assets/img/pencil.svg')}
                          alt="click to edit"
                        />
                      </div>
                      <div
                        className="dashboard-groups__list-item-remove"
                        onClick={() => dispatch(groupsActions.remove(id))}
                        onKeyPress={() => {}}
                        role="button"
                        tabIndex="0"
                      >
                        <img
                          src={require('../../../../assets/img/dustbin.svg')}
                          alt="click to remove"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
      </div>
    );
  }
}

Groups.propTypes = {
  dispatch: PropTypes.func.isRequired,
  groups: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
  intl: intlShape.isRequired,
};

Groups.defaultProps = {
  groups: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state) => {
  const { groups } = state;

  return {
    groups,
  };
};

export default injectIntl(connect(mapStateToProps)(Groups));
