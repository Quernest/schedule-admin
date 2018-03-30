import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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
    const { dispatch, groups: { list, fetching } } = this.props;

    if (fetching) {
      return <ActivityLoader />;
    }

    return (
      <div className="dashboard-groups">
        <div className="dashboard-groups__heading">
          <h3>Groups</h3>
          <Link className="btn" to="/dashboard/groups/add">
            Add a group
          </Link>
        </div>
        {list &&
          list.length > 0 && (
            <ul className="dashboard-groups__list">
              {list.map((group) => {
                const { name, id } = group;
                return (
                  <li className="dashboard-groups__list-item" key={id}>
                    <span>{name}</span>
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
