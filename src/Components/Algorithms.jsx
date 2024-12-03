import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { RadioGroup, RadioButton } from 'react-radio-buttons';
import Constraints from './Constraints';
import StatefulButton from './Subcomponents/StatefulButton';

class Algorithms extends Component {
  static propTypes = {
    algorithmChoice: PropTypes.string.isRequired,
    totalRounds: PropTypes.number.isRequired,
    options: PropTypes.object.isRequired,
    maxPlayedWithAllowed: PropTypes.number.isRequired,
    maxAveragePlayedWithAllowed: PropTypes.string.isRequired,
    minUniqueTablesAllowed: PropTypes.number.isRequired,
    minAverageUniqueTablesAllowed: PropTypes.string.isRequired,
    maxRuns: PropTypes.number.isRequired,
    handleAlgorithmChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
    handleDecimalChange: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className='data-entry-section'>
        <h3>Algorithm Options</h3>
        <div className='options-group'>
          <StatefulButton
            className='algorithm-button'
            onChange={(e) => this.props.handleAlgorithmChange('runRandomNTimes')}
            selected={this.props.algorithmChoice === 'runRandomNTimes'}
            text="Best of N random runs"
            name={'runRandomNTimes'}
            type={'text'}
            />
          <StatefulButton
            className='algorithm-button'
            onChange={(e) => this.props.handleAlgorithmChange('runUntilConstraints')}
            selected={this.props.algorithmChoice === 'runUntilConstraints'}
            text="Run until constraints met"
            name={'runUntilConstraints'}
            type={'text'}
            />
        </div>
        <Constraints
          algorithmChoice={this.props.algorithmChoice}
          totalRounds={this.props.totalRounds}
          options={this.props.options}
          numTimesToRun={this.props.numTimesToRun}
          maxPlayedWithAllowed={this.props.maxPlayedWithAllowed}
          maxAveragePlayedWithAllowed={this.props.maxAveragePlayedWithAllowed}
          minUniqueTablesAllowed={this.props.minUniqueTablesAllowed}
          minAverageUniqueTablesAllowed={this.props.minAverageUniqueTablesAllowed}
          maxRuns={this.props.maxRuns}
          handleNumberChange={this.props.handleNumberChange}
          handleDecimalChange={this.props.handleDecimalChange}
         />
      </div>
    );
  }

}
export default Algorithms;
