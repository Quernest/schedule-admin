import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ActivityLoader from '../../ActivityLoader';
import groupsActions from '../../../actions/groups.actions';

class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      submitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { groupName } = this.state;

    this.setState({
      submitted: true,
    });

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
    const { groups: { fetching }, intl } = this.props;
    const { submitted, groupName } = this.state;
    const { formatMessage } = intl;

    if (fetching) {
      return <ActivityLoader />;
    }

    return (
      <div className="dashboard-groups">
        <div className="dashboard-groups__heading">
          <h3>
            {formatMessage({ id: 'app.dashboard.groups.button.addgroup' })}
          </h3>
          <Link to="/dashboard/groups">
            {formatMessage({ id: 'app.button.back' })}
          </Link>
        </div>
        <form className="dashboard-groups__form" onSubmit={this.handleSubmit}>
          <input
            className={classNames('dashboard-groups__form-input', {
              invalid: submitted && !groupName,
            })}
            name="groupName"
            type="text"
            placeholder={formatMessage({
              id: 'app.dashboard.groups.form.addgroup.input.placeholder',
            })}
            onChange={this.handleChange}
          />
          {submitted &&
            !groupName && (
              <div className="dashboard-groups__form-feedback">
                {formatMessage({
                  id: 'app.errors.dashboard.groups.form.addgroup.feedback',
                })}
              </div>
            )}
          <button className="btn dashboard-groups__form-btn">
            {formatMessage({ id: 'app.button.add' })}
          </button>
        </form>
      </div>
    );
  }
}

AddGroup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  groups: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

AddGroup.defaultProps = {
  groups: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state) => {
  const { user, groups } = state;

  return {
    groups,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddGroup));
