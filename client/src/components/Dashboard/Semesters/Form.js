import React from 'react';
import PropTypes from 'prop-types';

// TODO: create logic and markup

const Form = ({ onSubmit, submitted }) => (
  <form className="form" onSubmit={onSubmit}>
    <input className="form__input" />
    <button className="form__btn btn">btn</button>
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
};

export default Form;
