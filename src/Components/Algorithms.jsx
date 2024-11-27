import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Constraints from './Constraints';

class Algorithms extends Component {
  static propTypes = {
    algorithmChoice: PropTypes.string.isRequired,
    totalRounds: PropTypes.number.isRequired,
    options: PropTypes.object.isRequired,
    maxPlayedWithAllowed: PropTypes.number.isRequired,
    maxAveragePlayedWithAllowed: PropTypes.number.isRequired,
    minUniqueTablesAllowed: PropTypes.number.isRequired,
    maxRuns: PropTypes.number.isRequired,
    handleAlgorithmChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className='data-entry-section'>
        <h3>Algorithm Options</h3>
        {/* <RadioGroup onChange={ this.props.handleAlgorithmChange } value={this.props.algorithmChoice} className='radio-button'>
          <RadioButton value='runRandomXTimes' css={{width: '100%'}}>
            Best of X Random Runs
          </RadioButton>
          <RadioButton value='runUntilConstraints'>
            Run Until Custom Constraints Met
          </RadioButton>
        </RadioGroup> */}
        <Constraints
          algorithmChoice={this.props.algorithmChoice}
          totalRounds={this.props.totalRounds}
          options={this.props.options}
          numTimesToRun={this.props.numTimesToRun}
          maxPlayedWithAllowed={this.props.maxPlayedWithAllowed}
          maxAveragePlayedWithAllowed={this.props.maxAveragePlayedWithAllowed}
          minUniqueTablesAllowed={this.props.minUniqueTablesAllowed}
          maxRuns={this.props.maxRuns}
          handleNumberChange={this.props.handleNumberChange}
         />
      </div>
    );
  }

}
export default Algorithms;
