import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleInput from './Subcomponents/SingleInput';

class Details extends Component {
  static propTypes = {
    totalRounds: PropTypes.number.isRequired,
    handleNumberChange: PropTypes.func.isRequired
  }

  render() {
    const {totalRounds, handleNumberChange} = this.props;
    return (
      <div className='details data-entry-subsection'>
        <h3>Details</h3>
        <SingleInput
          inputType='number'
          title='Number of Rounds: '
          name='totalRounds'
          onChange={(e) => handleNumberChange(e, 'totalRounds')}
          content={totalRounds}
          />
      </div>
    );
  }

}
export default Details;
