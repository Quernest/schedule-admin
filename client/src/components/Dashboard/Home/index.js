import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../Heading';

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="dashboard-home">
        <Heading title="@beta 1.0" />
      </div>
    );
  }
}

export default injectIntl(Home);
