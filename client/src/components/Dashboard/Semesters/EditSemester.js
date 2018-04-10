import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import semestersActions from '../../../actions/semesters.actions';
import Heading from '../../Heading';
import Form from './Form';

/**
 * TODO:
 * check all prop-types
 */

class EditSemester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: undefined,
      number: undefined,
      start: '',
      end: '',
      firstWeekType: 1,
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    const { semester, id, dispatch } = this.props;

    if (semester && semester.id === Number(id)) {
      const { start, end } = semester;
      
      this.setState({
        ...semester,
        start: moment(start),
        end: moment(end),
      });
    } else {
      dispatch(semestersActions.getById(id));
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.semester !== this.props.semester) {
      const { start, end } = nextProps.semester;

      this.setState({
        ...nextProps.semester,
        start: moment(start),
        end: moment(end),
      });
    }
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

    if (id && number && start && end && firstWeekType) {
      const data = {
        id,
        number,
        start,
        end,
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
          number={number}
          start={start}
          end={end}
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
  id: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
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
  const { id } = props.match.params;
  const { lang } = locale;
  const { list, semester } = semesters;

  return {
    semesters,
    semester: semester || (list && list.length > 0
      ? list.filter(semester => semester.id === Number(id))[0]
      : semester),
    lang,
    id,
  };
};

export default injectIntl(connect(mapStateToProps)(EditSemester));
