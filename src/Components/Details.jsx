import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleInput from './Subcomponents/SingleInput';

class Details extends Component {
  static propTypes = {
    isKidsTable: PropTypes.bool.isRequired,
    totalKids: PropTypes.number.isRequired,
    totalPlayers: PropTypes.number.isRequired,
    totalRounds: PropTypes.number.isRequired,
    handleNumKidsChange: PropTypes.func.isRequired,
    handleNumPlayersChange: PropTypes.func.isRequired,
    handleNumRoundsChange: PropTypes.func.isRequired
  }

  renderKidsCount() {
    const {totalKids, handleNumKidsChange} = this.props;
    return (
      <SingleInput
        inputType='number'
        title='Number of Kids: '
        name='totalKids'
        controlFunc={handleNumKidsChange}//TODO zero out num kids on isKidsTable change or ignore if isKidsTable is false
        content={totalKids}
        />
    );
  }
//TODO decide whether kids count towards total and handle them
  render() {
    const {totalPlayers, totalRounds, handleNumPlayersChange, handleNumRoundsChange, isKidsTable} = this.props;
    return (
      <div className='details data-entry-subsection'>
        <h3>Details</h3>
        <SingleInput
          inputType='number'
          title='Number of Players: '
          name='totalPlayers'
          controlFunc={handleNumPlayersChange}
          content={totalPlayers}
          />
        <SingleInput
          inputType='number'
          title='Number of Rounds: '
          name='totalRounds'
          controlFunc={handleNumRoundsChange}
          content={totalRounds}
          />
        {isKidsTable && this.renderKidsCount()}
      </div>
    );
  }

}
export default Details;
