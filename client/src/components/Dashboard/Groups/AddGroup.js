import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import ActivityLoader from '../../ActivityLoader';
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

    console.log(groupName);

    if (groupName) {
      dispatch(groupsActions.add(groupName));
    }
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { groups: { fetching } } = this.props;

    if (fetching) {
      return <ActivityLoader />;
    }

    return (
      <div className="dashboard-groups">
        <form onSubmit={this.handleSubmit}>
          <input name="groupName" type="text" onChange={this.handleChange} />
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
