import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import semestersActions from '../../../actions/semesters.actions';
import Heading from '../../Heading';
import Form from './Form';

class EditSemester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      id: undefined,
      number: undefined,
      start: '',
      end: '',
      firstWeekType: 0, // default value
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    const {
      id,
      number,
      start,
      end,
      firstWeekType,
    } = this.state;

    this.setState({
      submitted: true,
    });

    if (id && number && start && end && (firstWeekType == 0 || firstWeekType == 1)) {
      const data = {
        id,
        number: Number(number),
        start: moment(start),
        end: moment(end),
        firstWeekType,
      };

      dispatch(semestersActions.edit(data));
    }
  }

  onDateChange(date, name) {
    this.setState({
      [name]: date,
    });
  }

  onChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    const { dispatch, semester, semesters, match } = this.props;
    const { id } = match.params;

    if (!semester || semester.id !== id) {
      // get the semester from api
      dispatch(semestersActions.getById(id));
      console.log('get from api');
    } else {
      this.setState({
        ...semesters.semester,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      const { semesters } = nextProps;
      const { semester } = semesters;

      this.setState({
        ...semester,
      });
    }
  }

  render() {
    const { intl, semesters, lang } = this.props;
    const { formatMessage } = intl;
    const { fetching } = semesters;
    const {
      submitted,
      number,
      start,
      end,
      firstWeekType,
    } = this.state;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.semesters.buttons.editsemester' }),
      link: {
        path: '/dashboard/semesters',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-editsemester">
        <Heading title={headingParams.title} hasLink link={headingParams.link} />
        <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          onDateChange={this.onDateChange}
          submitted={submitted}
          fetching={fetching}
          number={number}
          start={moment(start)}
          end={moment(end)}
          firstWeekType={firstWeekType}
          lang={lang}
        />
      </div>
    );
  }
}

EditSemester.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  semesters: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

EditSemester.defaultProps = {
  semesters: {
    list: [],
    fetching: false,
  },
};

const mapStateToProps = (state, props) => {
  const { semesters, locale } = state;
  const { lang } = locale;
  const { id } = props.match.params;
  const { list } = semesters;

  // get semester from semesters list (by id)
  const [semester] = list ? list.filter(semester => semester.id === Number(id)) : [];

  return {
    semesters,
    semester,
    lang,
  };
};

export default injectIntl(connect(mapStateToProps)(EditSemester));
