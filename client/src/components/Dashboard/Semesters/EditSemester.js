import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import update from 'react-addons-update';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import semestersActions from '../../../actions/semesters.actions';
import Heading from '../../Heading';
import Form from './Form';
import ActivityLoader from '../../ActivityLoader';

class EditSemester extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    semesters: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.object),
      fetching: PropTypes.bool,
    }),
    semester: PropTypes.shape({
      id: PropTypes.number,
      number: PropTypes.number,
      start: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      end: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      firstWeekType: PropTypes.number,
    }),
  }

  static defaultProps = {
    semesters: {
      list: [],
      fetching: false,
    },
    semester: {
      firstWeekType: 1,
    },
  }

  constructor(props) {
    super(props);

    this.state = {
      semester: {},
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.updateSemester = this.updateSemester.bind(this);
  }

  componentDidMount() {
    const { id, dispatch } = this.props;

    dispatch(semestersActions.getById(id));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.semester !== this.props.semester) {
      const { semester } = this.props;

      this.updateSemester(semester);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { semester } = this.state;
    const {
      id,
      number,
      start,
      end,
      firstWeekType,
    } = semester;

    this.setState({
      submitted: true,
    });

    if (id && number && start && end && firstWeekType) {
      const data = {
        id,
        number: Number(number),
        start: moment(start).format('YYYY-MM-DD'),
        end: moment(end).format('YYYY-MM-DD'),
        firstWeekType,
      };

      dispatch(semestersActions.edit(data));
    }
  }

  onDateChange(date, name) {
    const { semester } = this.state;

    this.setState({
      semester: update(semester, {
        $merge: {
          [name]: date,
        },
      }),
    });
  }

  onChange(e) {
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

  updateSemester(semester) {
    const { start, end } = semester;

    const momentDates = {
      start: moment(start),
      end: moment(end),
    };

    this.setState({
      semester: update(semester, {
        $merge: momentDates,
      }),
    });
  }

  render() {
    const { intl, semesters, lang } = this.props;
    const { formatMessage } = intl;
    const { fetching } = semesters;
    const { submitted, semester } = this.state;

    const headingParams = {
      title: formatMessage({ id: 'app.dashboard.semesters.buttons.editsemester' }),
      link: {
        path: '/dashboard/semesters',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    const isRenderForm = !fetching && semester;

    return (
      <div className="dashboard-editsemester">
        <Heading
          title={headingParams.title}
          hasLink
          link={headingParams.link}
        />
        {isRenderForm && (
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
              onDateChange={this.onDateChange}
              submitted={submitted}
              fetching={fetching}
              semester={semester}
              lang={lang}
            />
          </ReactCSSTransitionGroup>
        )}
        <ActivityLoader fetching={fetching} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { semesters, locale } = state;
  const { id } = props.match.params;
  const { lang } = locale;
  const { semester } = semesters;

  return {
    semesters,
    semester,
    lang,
    id,
  };
};

export default injectIntl(connect(mapStateToProps)(EditSemester));
