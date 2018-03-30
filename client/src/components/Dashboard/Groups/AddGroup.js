import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import groupsActions from '../../../actions/groups.actions';

class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { groupName } = this.state;

    if (groupName) {
      dispatch(groupsActions.addGroup(groupName));
    }
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="dashboard-groups">
        <form onSubmit={this.handleSubmit}>
          <input name="groupName" type="text" />
          <button className="btn">Добавить</button>
        </form>
      </div>
    );
  }
}

AddGroup.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { user, groups } = state;

  return {
    groups,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddGroup));
