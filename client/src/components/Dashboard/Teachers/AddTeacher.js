import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Form from './Form';
import teachersActions from '../../../actions/teachers.actions';
import Heading from '../../Heading';

class AddTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherName: '',
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { teacherName } = this.state;

    this.setState({
      submitted: true,
    });

    if (teacherName) {
      dispatch(teachersActions.add(teacherName));
    }
  }

  onChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { teachers: { fetching }, intl } = this.props;
    const { submitted, teacherName } = this.state;
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
        <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          teacherName={teacherName}
          submitted={submitted}
          fetching={fetching}
        />
      </div>
    );
  }
}

AddTeacher.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  teachers: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

AddTeacher.defaultProps = {
  teachers: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state) => {
  const { user, teachers } = state;

  return {
    teachers,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddTeacher));
