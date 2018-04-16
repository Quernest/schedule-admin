import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Heading from '../../Heading';
import ActivityLoader from '../../ActivityLoader';
import Form from '../Schedule/Form';

import scheduleActions from '../../../actions/schedule.actions';
import teachersActions from '../../../actions/teachers.actions';
import semestersActions from '../../../actions/semesters.actions';
import subjectsActions from '../../../actions/subjects.actions';
import groupsActions from '../../../actions/groups.actions';

class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: auto select current semester
      semester: 3,
      groupName: '',
      submitted: false,
      scheduleList: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeScheduleItem = this.onChangeScheduleItem.bind(this);
    this.onChangeGroupName = this.onChangeGroupName.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);

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

  onChangeGroupName(e) {
    const { value } = e.target;

    this.setState({
      groupName: value,
    });
  }

  onChangeSemester(e) {
    const { value } = e.target;

    this.setState({
      semester: value,
    });
  }

  onChangeScheduleItem(e, weekDay, weekType, lesson, event) {
    const { name, value } = e.target;
    const { groupId } = this.props;
    const { scheduleList = [], semester } = this.state;

    const updatedItem = {
      groupId: Number(groupId),
      semester: Number(semester),
      weekDay,
      weekType,
      lesson,
      [name]: value,
      isFreeTime: 0,
    };

    const isEmptyEvent = !event || typeof event.item === 'undefined' || typeof event.index === 'undefined';

    // edit
    if (weekDay && weekType && lesson && !isEmptyEvent) {
      const { item, index } = event;

      this.setState({
        scheduleList: update(scheduleList, {
          [index]: {
            $set: {
              ...item,
              ...updatedItem,
            },
          },
        }),
      });
    }

    // create new
    if (isEmptyEvent) {
      this.setState({
        scheduleList: update(scheduleList, {
          $push: [{
            id: new Date().getTime(),
            ...updatedItem,
          }],
        }),
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

    if (scheduleList && scheduleList.length) {
      dispatch(scheduleActions.add(scheduleList));
      // console.log(scheduleList);
    }
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

      if (!fetching) {
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
      lang,
    } = this.props;
    const { semester, submitted, scheduleList } = this.state;
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
              scheduleList={scheduleList}
            />
          </ReactCSSTransitionGroup>
        )}
        <ActivityLoader fetching={!noFetching} />
      </div>
    );
  }
}

EditGroup.propTypes = {
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
    locale,
  } = state;
  const { id } = props.match.params;
  const { lang } = locale;

  /**
   * TODO: 
   *
   * create
   * get from store (by id) function
   */

  // console.log('groups: ', groups);
  // console.log('schedule: ', schedule);
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
    lang,
  };
};

export default injectIntl(connect(mapStateToProps)(EditGroup));
