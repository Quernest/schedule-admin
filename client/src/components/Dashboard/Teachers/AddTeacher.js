import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import Form from './Form';
import ActivityLoader from '../../ActivityLoader';
import teachersActions from '../../../actions/teachers.actions';
import Heading from '../../Heading';

class AddTeacher extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    teachers: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
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
        name: '',
      },
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { teacher } = this.state;

    this.setState({
      submitted: true,
    });

    const { name } = teacher;

    if (name) {
      dispatch(teachersActions.add(teacher));
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

  render() {
    const { teachers, intl } = this.props;
    const { fetching } = teachers;
    const { submitted, teacher } = this.state;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.teachers.buttons.addteacher' }),
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
        {!fetching && <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          teacher={teacher}
          submitted={submitted}
        />}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, teachers } = state;

  return {
    teachers,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddTeacher));
