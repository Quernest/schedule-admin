import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

const NoRecordsMessage = ({ records, intl }) => {
  const { formatMessage } = intl;

  if (records && records.length === 0) {
    return (
      <div className="records">
        <h3 className="records__message">
          {formatMessage({ id: 'app.words.norecords' })}
        </h3>
      </div>
    );
  }

  return null;
};

NoRecordsMessage.defaultProps = {
  records: [],
};

NoRecordsMessage.propTypes = {
  intl: intlShape.isRequired,
  records: PropTypes.arrayOf(PropTypes.any),
};

export default injectIntl(NoRecordsMessage);
