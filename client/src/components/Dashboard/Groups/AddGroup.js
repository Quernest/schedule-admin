import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Form from './Form';
import groupsActions from '../../../actions/groups.actions';
import Heading from '../../Heading';

class AddGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupName: '',
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
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

  onChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { groups: { fetching }, intl } = this.props;
    const { submitted, groupName } = this.state;
    const { formatMessage } = intl;
    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.groups.button.addgroup' }),
      link: {
        path: '/dashboard/groups',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-groups">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          groupName={groupName}
          submitted={submitted}
          fetching={fetching}
        />
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
