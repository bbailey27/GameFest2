import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (
      <div className="form-group">
        <label className="form-label">{props.title}</label>
        <input
          className={props.classNames ? `form-input ${props.classNames}`: 'form-input'}
          name={props.name}
          type={props.inputType}
          min={props.min}
          max={props.max}
          step={props.step}
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
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default SingleInput;
