import React from 'react';
import PropTypes from 'prop-types';

StatefulButton.propTypes = {
  type: PropTypes.oneOf(['icon', 'text', 'composite']).isRequired,
  selected: PropTypes.bool.isRequired,
  text: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  // TODO pull a simple selected/unselected toggle handler out into a util for reuse
  // but I don't think I should just put that logic here since I'll want the parent to be aware of changes? Could add context instead
  // TODO decide what the selected status does in terms of styling - fill in the background?
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
