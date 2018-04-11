import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import Heading from '../../Heading';

class EditGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;

    return (
      <div className="dashboard-editgroup">
        <Heading title="Edit group" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { groups } = state;

  return {
    groups,
  };
};

EditGroup.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(connect(mapStateToProps)(EditGroup));
