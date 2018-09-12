import React from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';

const Day = ({
  children,
  index,
  lang,
}) => {
  const isoWeekDay = index + 1;

  return (
    <div className="form__group" key={index}>
      <Accordion>
        <AccordionItem>
          <AccordionItemTitle>
            <h3 className="form__h3">{moment().locale(lang).day(isoWeekDay).format('dddd')}</h3>
          </AccordionItemTitle>
          <AccordionItemBody>
            {children}
          </AccordionItemBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

Day.defaultProps = {
  children: null,
  index: 0,
};

Day.propTypes = {
  children: PropTypes.node,
  lang: PropTypes.string.isRequired,
  index: PropTypes.number,
};

export default injectIntl(Day);
