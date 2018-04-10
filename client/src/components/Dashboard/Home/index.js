import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../Heading';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-home">
        <Heading title="Title" subtitle="Subtitle ... " />
      </div>
    );
  }
}

export default injectIntl(Home);
