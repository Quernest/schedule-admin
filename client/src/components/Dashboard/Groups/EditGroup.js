import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import update from 'react-addons-update';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Heading from '../../Heading';
import ActivityLoader from '../../ActivityLoader';
import Form from '../Schedule/Form';
import scheduleActions from '../../../actions/schedule.actions';
import teachersActions from '../../../actions/teachers.actions';
import semestersActions from '../../../actions/semesters.actions';
import subjectsActions from '../../../actions/subjects.actions';
import locationsActions from '../../../actions/locations.actions';
import groupsActions from '../../../actions/groups.actions';

class EditGroup extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    lang: PropTypes.string.isRequired,
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
    locations: PropTypes.shape({
      fetching: PropTypes.bool,
      list: PropTypes.arrayOf(PropTypes.object),
    }),
    subjects: PropTypes.shape({
      fetching: PropTypes.bool,
      list: PropTypes.arrayOf(PropTypes.object),
    }),
  }

  static defaultProps = {
    schedule: {},
    groups: {},
    semesters: {},
    teachers: {},
    subjects: {},
    locations: {},
  }

  state = {
    submitted: false,
    semester: {},
    group: {},
    scheduleList: [],
  }

  componentDidMount() {
    this.getGroupById();
    this.getScheduleById();
    this.getTeachers();
    this.getSemesters();
    this.getSubjects();
    this.getLocations();
  }

  componentDidUpdate(prevProps) {
    if (this.props.schedule !== prevProps.schedule) {
      const { schedule } = this.props;

      if (!schedule.fetching) {
        this.updateSchedule(schedule);
      }
    }

    if (this.props.groups !== prevProps.groups) {
      const { groups } = this.props;

      if (!groups.fetching) {
        this.updateGroups(groups);
      }
    }

    if (this.props.semesters !== prevProps.semesters) {
      const { semesters } = this.props;

      if (!semesters.fetching) {
        this.detectCurrentSemester(semesters);
      }
    }
  }

  onChangeGroupName = (e) => {
    const { value } = e.target;
    const { group } = this.state;

    this.setState({
      group: update(group, {
        $merge: {
          name: value,
        },
      }),
    });
  }

  onChangeSemester = (e) => {
    const { value } = e.target;
    const { semester } = this.state;

    this.setState({
      semester: update(semester, {
        $merge: {
          id: Number(value),
        },
      }),
    });
  }

  onChangeScheduleItem = (e, weekDay, weekType, lesson, event) => {
    const { name, value } = e.target;
    const { groupId } = this.props;
    const { scheduleList, semester } = this.state;

    const updatedEvent = {
      groupId: Number(groupId),
      semesterId: semester.id,
      weekDay,
      weekType,
      lesson,
      [name]: value,
      isFreeTime: 0, // 0 is not free time, 1 is a free time
      isShortDay: Number(weekDay === 5),
    };

    if (name === 'isFreeTime') {
      updatedEvent.isFreeTime = value ? 0 : 1;
    }

    const isEmptyEvent = !event || typeof event.item === 'undefined' || typeof event.index === 'undefined';

    // edit event
    if (weekDay && weekType && lesson && !isEmptyEvent) {
      const { item, index } = event;

      const mergedEvent = {
        ...item,
        ...updatedEvent,
      };

      this.setState({
        scheduleList: update(scheduleList, {
          [index]: {
            $set: mergedEvent,
          },
        }),
      });
    }

    // create new event
    if (isEmptyEvent) {
      const newEvent = {
        ...updatedEvent,
      };

      this.setState({
        scheduleList: update(scheduleList, {
          $push: [newEvent],
        }),
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { scheduleList, group } = this.state;

    // // array with items to remove
    // const incompleteListItems = [];

    // // original array without "incompleted list items"
    // let modifiedScheduleList = scheduleList || [];

    // if (scheduleList && scheduleList.length > 0) {
    //   scheduleList.map((item) => {
    //     if (item) {
    //       const {
    //         isFreeTime,
    //         teacherId,
    //         subjectId,
    //         locationId,
    //       } = item;

    //       const hasRequiredFileds = teacherId && subjectId && locationId;

    //       if (!isFreeTime && !hasRequiredFileds) {
    //         incompleteListItems.push(item);

    //         modifiedScheduleList = scheduleList
    //           .filter(value => !incompleteListItems.includes(value));
    //       }
    //     }

    //     return item;
    //   });
    // }

    this.setState({
      submitted: true,
      scheduleList,
    });

    if (group) {
      const { name } = group;

      // if user did not leave blank field
      if (name) {
        dispatch(groupsActions.edit(group, scheduleList));
      }
    }
  }

  getGroupById = () => {
    const { dispatch, groupId } = this.props;

    dispatch(groupsActions.getById(groupId));
  }

  getScheduleById = () => {
    const { dispatch, groupId } = this.props;

    dispatch(scheduleActions.getById(groupId));
  }

  getTeachers = () => {
    const { dispatch } = this.props;

    dispatch(teachersActions.getAll());
  }

  getSemesters = () => {
    const { dispatch } = this.props;

    dispatch(semestersActions.getAll());
  }

  getSubjects = () => {
    const { dispatch } = this.props;

    dispatch(subjectsActions.getAll());
  }

  getLocations = () => {
    const { dispatch } = this.props;

    dispatch(locationsActions.getAll());
  }

  detectCurrentSemester = (semesters) => {
    if (semesters.list && semesters.list.length > 0) {
      const { list } = semesters;

      const currentDate = moment();

      list.map((semester) => {
        const { start, end } = semester;

        const isCurrentSemester = currentDate.isBetween(
          moment(start, 'YYYY-MM-DD'),
          moment(end, 'YYYY-MM-DD'),
          null,
          '[]',
        );

        if (isCurrentSemester) {
          this.setState({
            semester,
          });
        }

        return undefined;
      });
    }
  }

  updateSchedule = (schedule) => {
    const { list } = schedule;

    this.setState({
      scheduleList: list,
    });
  }

  updateGroups = (groups) => {
    const { group } = groups;

    this.setState({
      group,
    });
  }

  render() {
    const {
      intl,
      schedule,
      groups,
      teachers,
      semesters,
      subjects,
      locations,
      lang,
    } = this.props;
    const {
      semester,
      submitted,
      scheduleList,
      group,
    } = this.state;
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
      && !semesters.fetching
      && !locations.fetching;

    return (
      <div className="dashboard-editgroup">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {noFetching && (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <Form
              lang={lang}
              submitted={submitted}
              onSubmit={this.onSubmit}
              onChangeScheduleItem={this.onChangeScheduleItem}
              onChangeGroupName={this.onChangeGroupName}
              onChangeSemester={this.onChangeSemester}
              group={group}
              teachers={teachers}
              semesters={semesters}
              semester={semester}
              subjects={subjects}
              schedule={schedule}
              locations={locations}
              scheduleList={scheduleList}
              days={5}
              weeks={2}
            />
          </ReactCSSTransitionGroup>
        )}
        <ActivityLoader fetching={!noFetching} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const {
    groups,
    schedule,
    teachers,
    semesters,
    subjects,
    locations,
    locale,
  } = state;
  const { id } = props.match.params;
  const { lang } = locale;

  return {
    groups,
    schedule,
    teachers,
    semesters,
    subjects,
    locations,
    groupId: id,
    lang,
  };
};

export default injectIntl(connect(mapStateToProps)(EditGroup));
