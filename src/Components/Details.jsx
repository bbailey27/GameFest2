import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleInput from './Subcomponents/SingleInput';

class Details extends Component {
  static propTypes = {
    totalPlayers: PropTypes.number.isRequired,
    totalRounds: PropTypes.number.isRequired,
    handleNumPlayersChange: PropTypes.func.isRequired,
    handleNumRoundsChange: PropTypes.func.isRequired
  }

  render() {
    const {totalPlayers, totalRounds, handleNumPlayersChange, handleNumRoundsChange} = this.props;
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
      </div>
    );
  }

}
export default Details;
