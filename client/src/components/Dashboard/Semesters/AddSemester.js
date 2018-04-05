import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import Heading from '../../Heading';
import Form from './Form';

class AddSemester extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: true,
    });

    // dispatch
    console.log('submitted');
  }

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const { submitted } = this.state;
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
          submitted={submitted}
        />
      </div>
    );
  }
}

AddSemester.propTypes = {
  dispatch: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  semesters: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    fetching: PropTypes.bool,
  }),
};

AddSemester.defaultProps = {
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

export default injectIntl(connect(mapStateToProps)(AddSemester));
