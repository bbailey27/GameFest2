import React from 'react';
import PropTypes from 'prop-types';

StatefulButton.propTypes = {
  type: PropTypes.oneOf(['icon', 'text', 'composite']).isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  // TODO pull a simple selected/unselected toggle handler out into a util for reuse
  // but I don't think I should just put that logic here since I'll want the parent to be aware of changes? Could add context instead
};

function StatefulButton({
  type,
  selected,
  text,
  icon,
  name,
  onChange
}) {

  const className = selected ? 'stateful-button-selected' : 'stateful-button-unselected'

  return (
    <div className={className} onClick={onChange}>
      {(type === 'icon' || type === 'composite') && 
        <img src={icon} alt={name} />
      }
      {(type === 'text' || type === 'composite') && 
        <p>{text}</p>
      }
    </div>
  )
}

export default StatefulButton;
