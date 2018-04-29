import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Form from './Form';
import ActivityLoader from '../../ActivityLoader';
import teachersActions from '../../../actions/teachers.actions';
import Heading from '../../Heading';

class EditTeacher extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    teachers: PropTypes.shape({
      teacher: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    teacherId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    teachers: {
      list: [],
      fetching: false,
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      teacher: {
        id: undefined,
        name: '',
      },
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, teacherId } = this.props;

    dispatch(teachersActions.getById(teacherId));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.teachers !== this.props.teachers) {
      const { teacher } = this.props.teachers;

      this.setTeacherToState(teacher);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { teacher } = this.state;

    this.setState({
      submitted: true,
    });

    const { id, name } = teacher;

    if (id && name) {
      dispatch(teachersActions.edit(teacher));
    }
  }

  onChange(e) {
    const { value, name } = e.target;
    const { teacher } = this.state;

    this.setState({
      teacher: update(teacher, {
        $merge: {
          [name]: value,
        },
      }),
    });
  }

  setTeacherToState = (teacher) => {
    this.setState({
      teacher,
    });
  };

  render() {
    const { teachers, intl } = this.props;
    const { fetching } = teachers;
    const { submitted, teacher } = this.state;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.teachers.buttons.editteacher' }),
      link: {
        path: '/dashboard/teachers',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-teachers">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {!fetching && (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <Form
              onSubmit={this.onSubmit}
              onChange={this.onChange}
              teacher={teacher}
              submitted={submitted}
            />
          </ReactCSSTransitionGroup>
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user, teachers } = state;
  const { id } = props.match.params;

  return {
    teacherId: id,
    teachers,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(EditTeacher));
