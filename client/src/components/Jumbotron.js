import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

const Jumbotron = ({ intl }) => {
  const { formatMessage } = intl;

  return (
    <div className="jumbotron">
      <h1 className="jumbotron-heading">Schedule</h1>
      <p className="jumbotron-text">
        {formatMessage({ id: 'app.jumbotron.text' })}
      </p>
    </div>
  );
};

Jumbotron.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Jumbotron);
