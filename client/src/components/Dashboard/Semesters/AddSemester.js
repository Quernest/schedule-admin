import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import update from 'react-addons-update';
import semestersActions from '../../../actions/semesters.actions';
import Heading from '../../Heading';
import Form from './Form';

class AddSemester extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    lang: PropTypes.string.isRequired,
    semesters: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
  }

  static defaultProps = {
    semesters: {
      list: [],
      fetching: false,
    },
  }

  state = {
    submitted: false,
    semester: {
      firstWeekType: 1,
    },
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { semester } = this.state;
    const {
      name,
      start,
      end,
      firstWeekType,
    } = semester;

    this.setState({
      submitted: true,
    });

    if (name && start && end && firstWeekType) {
      const data = {
        name,
        start: moment(start).format('YYYY-MM-DD'),
        end: moment(end).format('YYYY-MM-DD'),
        firstWeekType,
      };

      dispatch(semestersActions.add(data));
    }
  }

  onDateChange = (date, name) => {
    const { semester } = this.state;

    this.setState({
      semester: update(semester, {
        $merge: {
          [name]: date,
        },
      }),
    });
  }

  onChange = (e) => {
    const { value, name } = e.target;
    const { semester } = this.state;

    this.setState({
      semester: update(semester, {
        $merge: {
          [name]: value,
        },
      }),
    });
  }

  render() {
    const { intl, semesters, lang } = this.props;
    const { formatMessage } = intl;
    const { fetching } = semesters;
    const { submitted, semester } = this.state;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.semesters.buttons.addsemester' }),
      link: {
        path: '/dashboard/semesters',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-addsemester">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onDateChange={this.onDateChange}
          submitted={submitted}
          fetching={fetching}
          semester={semester}
          lang={lang}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { semesters, locale } = state;
  const { lang } = locale;

  return {
    semesters,
    lang,
  };
};

export default injectIntl(connect(mapStateToProps)(AddSemester));
