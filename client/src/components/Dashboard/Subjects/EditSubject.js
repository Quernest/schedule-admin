import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  injectIntl,
  intlShape,
} from 'react-intl';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Form from './Form';
import Heading from '../../Heading';
import ActivityLoader from '../../ActivityLoader';
import subjectsActions from '../../../actions/subjects.actions';

class EditSubject extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    dispatch: PropTypes.func.isRequired,
    subjectId: PropTypes.string.isRequired,
    subjects: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
      subject: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.number,
      }),
    }),
  }

  static defaultProps = {
    subjects: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, subjectId } = this.props;

    dispatch(subjectsActions.getById(subjectId));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.subjects !== this.props.subjects) {
      const { subject } = this.props.subjects;

      this.setSubjectToState(subject);
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { subject } = this.state;

    this.setState({
      submitted: true,
    });

    const { id, name, type } = subject;

    if (id && name && type) {
      dispatch(subjectsActions.edit(subject));
    }
  }

  onChange(e) {
    const { value, name } = e.target;
    const { subject } = this.state;

    this.setState({
      subject: update(subject, {
        $merge: {
          [name]: value,
        },
      }),
    });
  }

  setSubjectToState = (subject) => {
    this.setState({
      subject,
    });
  };

  render() {
    const {
      intl,
      subjects,
    } = this.props;
    const { formatMessage } = intl;
    const { fetching } = subjects;
    const { submitted, subject } = this.state;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.subjects.buttons.editsubject' }),
      link: {
        path: '/dashboard/subjects',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-editsubject">
        <Heading
          title={headingParams.title}
          link={headingParams.link}
          hasLink
        />
        {!fetching && <Form
          submitted={submitted}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          subject={subject}
        />}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { subjects } = state;
  const { id } = props.match.params;

  return {
    subjects,
    subjectId: id,
  };
};

export default injectIntl(connect(mapStateToProps)(EditSubject));

