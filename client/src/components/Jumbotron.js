import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

const Jumbotron = () => (
  <div className="jumbotron">
    <h1 className="jumbotron-heading">Schedule</h1>
    <FormattedMessage id="app.jumbotron.text">
      {text => <p className="jumbotron-text">{text}</p>}
    </FormattedMessage>
  </div>
);

export default injectIntl(Jumbotron);
