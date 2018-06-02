import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import ActivityLoader from '../../ActivityLoader';
import Form from './Form';
import groupsActions from '../../../actions/groups.actions';
import Heading from '../../Heading';

class AddGroup extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    groups: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
  }

  static defaultProps = {
    groups: {
      list: [],
      fetching: false,
    },
  }

  state = {
    group: {
      name: '',
    },
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { group } = this.state;

    this.setState({
      submitted: true,
    });

    const { name } = group;

    if (name) {
      dispatch(groupsActions.add(group));
    }
  }

  onChange = (e) => {
    const { value, name } = e.target;
    const { group } = this.state;

    this.setState({
      group: update(group, {
        $merge: {
          [name]: value,
        },
      }),
    });
  }

  render() {
    const { groups, intl } = this.props;
    const { submitted, group } = this.state;
    const { formatMessage } = intl;
    const { fetching } = groups;

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
        {!fetching && (
          <Form
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            group={group}
            submitted={submitted}
          />
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, groups } = state;

  return {
    groups,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddGroup));
