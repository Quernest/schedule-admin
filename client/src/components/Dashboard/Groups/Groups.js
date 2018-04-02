import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ActivityLoader from '../../../components/ActivityLoader';
import groupsActions from '../../../actions/groups.actions';
import List from './List';

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRefresh = this.onRefresh.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(groupsActions.getAll());
  }

  onRemove(id) {
    const { dispatch } = this.props;

    dispatch(groupsActions.remove(id));
  }

  onEdit(id) {
    const { dispatch } = this.props;

    console.log('[callback]: clicked on edit btn', id);

    // TODO: create logic
    // dispatch(groupsActions.edit(id));
  }

  onRefresh() {
    const { dispatch } = this.props;

    dispatch(groupsActions.getAll(false));
  }

  render() {
    const { dispatch, groups: { list, fetching }, intl } = this.props;
    const { formatMessage } = intl;

    return (
      <div className="dashboard-groups">
        <div className="dashboard-groups__heading">
          <h3>{formatMessage({ id: 'app.sidebar.menu.item.groups' })}</h3>
          <div className="dashboard-groups__heading-btns">
            <button className="refresh" onClick={this.onRefresh} />
            <Link className="btn" to="/dashboard/groups/add">
              {formatMessage({ id: 'app.dashboard.groups.button.addgroup' })}
            </Link>
          </div>
        </div>
        <List
          items={list}
          fetching={fetching}
          onEdit={this.onEdit}
          onRemove={this.onRemove}
        />
        <ActivityLoader fetching={fetching} />
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
