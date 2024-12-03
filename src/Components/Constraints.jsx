import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleInput from './Subcomponents/SingleInput';

class Constraints extends Component {
  // keep maxPlayedWithCount under _
  // keep averageMaxPlayedWithCount under _
  // minUniqueTablesVisited over _
  static propTypes = {
    algorithmChoice: PropTypes.string.isRequired,
    totalRounds: PropTypes.number.isRequired,
    options: PropTypes.object.isRequired,
    numTimesToRun: PropTypes.number.isRequired,
    maxPlayedWithAllowed: PropTypes.number.isRequired,
    maxAveragePlayedWithAllowed: PropTypes.string.isRequired,
    minUniqueTablesAllowed: PropTypes.number.isRequired,
    minAverageUniqueTablesAllowed: PropTypes.string.isRequired,
    maxRuns: PropTypes.number.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
    handleDecimalChange: PropTypes.func.isRequired,
  }

  renderRunUntilConstraints() {
    const {changePeople, changeTables} = this.props.options;

    return (
      <div>
        {changePeople && this.renderMaxPlayedWithAllowedInput()}
        {changePeople && this.renderMaxAveragePlayedWithAllowedInput()}
        {changeTables && this.renderMinUniqueTablesAllowedInput()}
        {changeTables && this.renderMinAverageUniqueTablesAllowedInput()}
        {changeTables && this.renderMaxRunsInput()}
      </div>
    );
  }

  renderMaxPlayedWithAllowedInput() {
    const {totalRounds, maxPlayedWithAllowed, handleNumberChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Max number of plays with same person allowed: '
        name='maxPlayedWithAllowed'
        onChange={(e) => handleNumberChange(e, 'maxPlayedWithAllowed')}
        content={maxPlayedWithAllowed}
        max={totalRounds}
        min={1}
        step={1}
        />
    );
  }

  renderMaxAveragePlayedWithAllowedInput() {
    const {totalRounds, maxAveragePlayedWithAllowed, handleDecimalChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Max allowed average number of plays with same person: '
        name='maxAveragePlayedWithAllowed'
        onChange={(e) => handleDecimalChange(e, 'maxAveragePlayedWithAllowed')}
        content={maxAveragePlayedWithAllowed}
        max={totalRounds}
        min={1}
        step={0.01}
        />
    );
  }

  renderMinUniqueTablesAllowedInput() {
    const {totalRounds, minUniqueTablesAllowed, handleNumberChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Minimum allowed number of unique tables visited: '
        name='minUniqueTablesAllowed'
        onChange={(e) => handleNumberChange(e, 'minUniqueTablesAllowed')}
        content={minUniqueTablesAllowed}
        max={totalRounds}
        min={1}
        step={1}
        />
    );
  }

  renderMinAverageUniqueTablesAllowedInput() {
    const {totalRounds, minAverageUniqueTablesAllowed, handleDecimalChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Minimum allowed average number of unique tables visited: '
        name='minAverageUniqueTablesAllowed'
        onChange={(e) => handleDecimalChange(e, 'minAverageUniqueTablesAllowed')}
        content={minAverageUniqueTablesAllowed}
        max={totalRounds}
        min={1}
        step={0.01}
        />
    );
  }

  renderMaxRunsInput() {
    const {maxRuns, handleNumberChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Max times to run: '
        name='maxRuns'
        onChange={(e) => handleNumberChange(e, 'maxRuns')}
        content={maxRuns}
        max={10000}
        min={1}
        />
    );
  }

  renderRunNTimesInput() {
    const {numTimesToRun, handleNumberChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Number of times to run: '
        name='numTimesToRun'
        onChange={(e) => handleNumberChange(e, 'numTimesToRun')}
        content={numTimesToRun}
        max={10000}
        min={1}
        />
    );
  }

  render() {
    return (
      <div className='constraints'>
        {this.props.algorithmChoice === 'runUntilConstraints' && this.renderRunUntilConstraints()}
        {this.props.algorithmChoice === 'runRandomNTimes' && this.renderRunNTimesInput()}
      </div>
    );
  }

}
export default Constraints;
