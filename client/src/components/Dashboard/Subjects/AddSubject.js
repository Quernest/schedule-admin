import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Form from './Form';
import subjectsActions from '../../../actions/subjects.actions';
import Heading from '../../Heading';

class AddSubject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subjectName: '',
      subjectType: 1,
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { subjectName, subjectType } = this.state;

    this.setState({
      submitted: true,
    });

    if (subjectName && subjectType) {
      const data = {
        name: subjectName,
        type: subjectType,
      };

      dispatch(subjectsActions.add(data));
    }
  }

  onChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { subjects: { fetching }, intl } = this.props;
    const { submitted, subjectName, subjectType } = this.state;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.subjects.button.addsubject' }),
      link: {
        path: '/dashboard/subjects',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-subjects">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        <Form
          submitted={submitted}
          fetching={fetching}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          subjectName={subjectName}
          subjectType={subjectType}
        />
      </div>
    );
  }
}

AddSubject.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  subjects: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

AddSubject.defaultProps = {
  subjects: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state) => {
  const { user, subjects } = state;

  return {
    subjects,
    user,
  };
};

export default injectIntl(connect(mapStateToProps)(AddSubject));
