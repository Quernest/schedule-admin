import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Heading from '../../Heading';
import ActivityLoader from '../../ActivityLoader';
import scheduleActions from '../../../actions/schedule.actions';
import ScheduleForm from './ScheduleForm';

/**
 * TODO:
 *
 * - translate heading and inner elements
 * - create schedule form
 */

class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
  }

  componentDidMount() {
    this.getSchedule();
  }

  onChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state);
  }

  getSchedule() {
    const { dispatch, groupId } = this.props;

    dispatch(scheduleActions.getById(groupId));
  }

  render() {
    const { intl, schedule, groups } = this.props;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.semesters.buttons.editgroup' }),
      link: {
        path: '/dashboard/groups',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    const noFetching = !schedule.fetching && !groups.fetching;

    return (
      <div className="dashboard-editgroup">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {noFetching && <ScheduleForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
        />}
        <ActivityLoader
          fetching={schedule.fetching || groups.fetching}
        />
      </div>
    );
  }
}

EditGroup.propTypes = {
  intl: intlShape.isRequired,
  groupId: PropTypes.string.isRequired,
  schedule: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  groups: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
};

EditGroup.defaultProps = {
  schedule: {},
  groups: {},
};

const mapStateToProps = (state, props) => {
  const { groups, schedule } = state;
  const { id } = props.match.params;

  console.log(schedule);

  return {
    groups,
    schedule,
    groupId: id,
  };
};

export default injectIntl(connect(mapStateToProps)(EditGroup));
