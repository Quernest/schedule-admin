import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import subjectsActions from '../../../actions/subjects.actions';
import Heading from '../../Heading';

class Subjects extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(subjectsActions.getAll());
  }

  onRemove(id) {
    const { dispatch } = this.props;

    // dispatch(subjectsActions.remove(id));
  }

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;

    const headingParams = {
      title: formatMessage({ id: 'app.sidebar.menu.item.subjects' }),
      link: {
        path: '/dashboard/subjects',
        label: formatMessage({ id: 'app.button.back' }),
      },
    };

    return (
      <div className="dashboard-subjects">
        <Heading
          title={headingParams.title}
          // hasLink
          // link={headingParams.link}
        />
      </div>
    );
  }
}

Subjects.propTypes = {
  intl: intlShape.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { subjects } = state;

  return {
    subjects,
  };
};

export default injectIntl(connect(mapStateToProps)(Subjects));
