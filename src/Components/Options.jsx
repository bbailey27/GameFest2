import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class Options extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onOptionsChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='options'>
        <h3>Options</h3>
        <CheckboxGroup
          className='checkbox-group'
          checkboxDepth={2}
          name="options"
          value={this.props.options}
          onChange={this.props.onOptionsChange}>

          <label><Checkbox value="kidsTable"/> Kids' Table</label>
          <label><Checkbox value="changeTables"/> Always Change Tables</label>
          <label><Checkbox value="changePeople"/> Play With Different People</label>
        </CheckboxGroup>
      </div>
    );
  }

}
export default Options;
