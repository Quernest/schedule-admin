import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Heading from '../../Heading';
import ActivityLoader from '../../ActivityLoader';
import ScheduleForm from './ScheduleForm';

import scheduleActions from '../../../actions/schedule.actions';
import teachersActions from '../../../actions/teachers.actions';
import semestersActions from '../../../actions/semesters.actions';
import subjectsActions from '../../../actions/subjects.actions';
import groupsActions from '../../../actions/groups.actions';

/**
 * TODO:
 *
 * - translate heading and inner elements
 * - create schedule form
 */

class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      semester: 1,
      submitted: false,
      scheduleList: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.getGroupById = this.getGroupById.bind(this);
    this.getScheduleById = this.getScheduleById.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.getSemesters = this.getSemesters.bind(this);
    this.getSubjects = this.getSubjects.bind(this);
  }

  componentDidMount() {
    this.getGroupById();
    this.getScheduleById();
    this.getTeachers();
    this.getSemesters();
    this.getSubjects();
  }

  onChange(e, weekDay, weekType, lesson) {
    const { name, value } = e.target;
    const { scheduleList, semester } = this.state;

    if (weekDay && weekType && lesson && semester) {
      const newItem = {
        [name]: value,
        semester,
        weekDay,
        weekType,
        lesson,
      };

      console.log('new item', newItem);

      if (scheduleList && scheduleList.length) {
        const [prevItem] = scheduleList.filter((item) => {
          if (!item.isFreeTime &&
            item.weekDay === weekDay &&
            item.weekType === weekType &&
            item.lesson === lesson &&
            item.semester === Number(semester)
          ) {
            return item;
          }
        });

        console.log('previous item', prevItem);
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    // this array will be send to API
    const { scheduleList } = this.state;

    this.setState({
      submitted: true,
    });

    // if (scheduleList && scheduleList.length) {
    //   dispatch(scheduleActions.add(scheduleList));
    // }
  }

  getGroupById() {
    const { dispatch, groupId } = this.props;

    dispatch(groupsActions.getById(groupId));
  }

  getScheduleById() {
    const { dispatch, groupId } = this.props;

    dispatch(scheduleActions.getById(groupId));
  }

  getTeachers() {
    const { dispatch } = this.props;

    dispatch(teachersActions.getAll());
  }

  getSemesters() {
    const { dispatch } = this.props;

    dispatch(semestersActions.getAll());
  }

  getSubjects() {
    const { dispatch } = this.props;

    dispatch(subjectsActions.getAll());
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.schedule !== this.props.schedule) {
      const { schedule } = nextProps;
      const { list, fetching } = schedule;

      // set schedule list to state
      if (!fetching && list && list.length) {
        this.setState({
          scheduleList: list,
        });
      }
    }
  }

  render() {
    const {
      intl,
      schedule,
      groups,
      teachers,
      semesters,
      subjects,
    } = this.props;
    const { semester, submitted } = this.state;
    const { group } = groups;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.semesters.buttons.editgroup' }),
      link: {
        path: '/dashboard/groups',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    const noFetching = !schedule.fetching
      && !groups.fetching
      && !teachers.fetching
      && !subjects.fetching
      && !semesters.fetching;

    return (
      <div className="dashboard-editgroup">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {noFetching && <ScheduleForm
          submitted={submitted}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          group={group}
          teachers={teachers}
          semesters={semesters}
          semester={semester}
          subjects={subjects}
          schedule={schedule}
        />}
        <ActivityLoader fetching={!noFetching} />
      </div>
    );
  }
}

EditGroup.propTypes = {
  intl: intlShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  schedule: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  groups: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  semesters: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  teachers: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  subjects: PropTypes.shape({
    fetching: PropTypes.bool,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
};

EditGroup.defaultProps = {
  schedule: {},
  groups: {},
  semesters: {},
  teachers: {},
  subjects: {},
};

const mapStateToProps = (state, props) => {
  const {
    groups,
    schedule,
    teachers,
    semesters,
    subjects,
  } = state;
  const { id } = props.match.params;

  /**
   * TODO: 
   *
   * create
   * get from store (by id) function
   */

  // console.log('groups: ', groups);
  console.log('schedule: ', schedule);
  // console.log('teachers: ', teachers);
  // console.log('semesters: ', semesters);
  // console.log('subjects: ', subjects);

  return {
    groups,
    schedule,
    teachers,
    semesters,
    subjects,
    groupId: id,
  };
};

export default injectIntl(connect(mapStateToProps)(EditGroup));
