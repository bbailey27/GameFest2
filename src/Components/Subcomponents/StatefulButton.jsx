import React from 'react';
import PropTypes from 'prop-types';

StatefulButton.propTypes = {
  type: PropTypes.oneOf(['icon', 'text', 'composite']).isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

function StatefulButton({
  type,
  selected,
  text,
  Icon,
  name,
  onChange
}) {

  const className = selected ? 'stateful-button stateful-button--selected' : 'stateful-button  stateful-button--unselected'

  return (
    <div className={className} onClick={onChange}>
      {(type === 'icon' || type === 'composite') && 
        <Icon />
      }
      {(type === 'text' || type === 'composite') && 
        <label>{text}</label>
      }
    </div>
  )
}

export default StatefulButton;
