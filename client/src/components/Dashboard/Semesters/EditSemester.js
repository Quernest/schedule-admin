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
      number: undefined,
      start: '',
      end: '',
      firstWeekType: 0, // default value
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    const {
      number,
      start,
      end,
      firstWeekType,
    } = this.state;

    this.setState({
      submitted: true,
    });

    if (number && start && end && (firstWeekType == 0 || firstWeekType == 1)) {
      const data = {
        number: Number(number),
        start: moment(start),
        end: moment(end),
        firstWeekType,
      };

      // dispatch(semestersActions.add(data));
    }
  }

  onChange(e) {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { intl, semesters } = this.props;
    const { formatMessage } = intl;
    const { fetching } = semesters;
    const { submitted } = this.state;

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
        {/* <Form
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          submitted={submitted}
          fetching={fetching}
        /> */}
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

const mapStateToProps = (state) => {
  const { semesters } = state;

  return {
    semesters,
  };
};

export default injectIntl(connect(mapStateToProps)(EditSemester));
