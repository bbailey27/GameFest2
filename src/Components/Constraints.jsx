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
    options: PropTypes.array.isRequired,
    numTimesToRun: PropTypes.number.isRequired,
    maxPlayedWithAllowed: PropTypes.number.isRequired,
    maxAveragePlayedWithAllowed: PropTypes.number.isRequired,
    minUniqueTablesAllowed: PropTypes.number.isRequired,
    maxRuns: PropTypes.number.isRequired,
    handleNumberChange: PropTypes.func.isRequired
  }

  renderRunUntilConstraints() {
    const {options} = this.props;
    const changePeopleOption = options.includes('changePeople');
    const changeTablesOption = options.includes('changeTables');
    return (
      <div>
        {changePeopleOption && this.renderMaxPlayedWithAllowedInput()}
        {changePeopleOption && this.renderMaxAveragePlayedWithAllowedInput()}
        {changeTablesOption && this.renderMinUniqueTablesAllowedInput()}
        {changeTablesOption && this.renderMaxRunsInput()}
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
        controlFunc={(e) => handleNumberChange(e, 'maxPlayedWithAllowed')}
        content={maxPlayedWithAllowed}
        max={totalRounds}
        min={1}
        />
    );
  }

  renderMaxAveragePlayedWithAllowedInput() {
    const {totalRounds, maxAveragePlayedWithAllowed, handleNumberChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Max allowed average number of plays with same person: '
        name='maxAveragePlayedWithAllowed'
        controlFunc={(e) => handleNumberChange(e, 'maxAveragePlayedWithAllowed')}
        content={maxAveragePlayedWithAllowed}
        max={totalRounds}
        min={1}
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
        controlFunc={(e) => handleNumberChange(e, 'minUniqueTablesAllowed')}
        content={minUniqueTablesAllowed}
        max={totalRounds}
        min={1}
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
        controlFunc={(e) => handleNumberChange(e, 'maxRuns')}
        content={maxRuns}
        max={10000}
        min={1}
        />
    );
  }

  renderRunXTimesInput() {
    const {numTimesToRun, handleNumberChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Number of times to run: '
        name='numTimesToRun'
        controlFunc={(e) => handleNumberChange(e, 'numTimesToRun')}
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
        {this.props.algorithmChoice === 'runRandomXTimes' && this.renderRunXTimesInput()}
      </div>
    );
  }

}
export default Constraints;
