import React from 'react';
import PropTypes from 'prop-types';
// Pure functional component defined as a const
const SingleInput = (props) => (
      <div className="form-group">
        <label className="form-label">{props.title}</label>
        <input
          className={`form-input ${props.classNames}`}
          name={props.name}
          type={props.inputType}
          min={props.min}
          max={props.max}
          value={props.content}
          onChange={props.controlFunc}
          placeholder={props.placeholder} />
      </div>
    );

SingleInput.propTypes = {
  inputType: PropTypes.oneOf(['text', 'number']).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.string,
};

export default SingleInput;
