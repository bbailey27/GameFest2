import { useState } from 'react';
import PropTypes from 'prop-types';
import SingleInput from './Subcomponents/SingleInput';
import StatefulButton from './Subcomponents/StatefulButton';

const Rounds = ({
  totalRounds,
  handleNumberChange,
}) => {
  const [isCustomRoundOption, setIsCustomRoundOption] = useState(false);
  const roundOptions = [1,2,3,4]; // how many rounds to generate
  const defaultCustomRoundCount = roundOptions[roundOptions.length-1] + 1;

  function handleRoundSelect(e, custom = false, value) {
    const inputValue = e.target.value;
    const newValue = inputValue || value || defaultCustomRoundCount;

    setIsCustomRoundOption(custom);
    handleNumberChange(e, 'totalRounds', parseInt(newValue));
  }

  return (
    <div className='details data-entry-subsection'>
      <h3>How Many Rounds?</h3>
      <div className='round-options-buttons'>
        {roundOptions.map((roundOption) => (
          <StatefulButton 
            type={'text'}
            text={roundOption.toString()}
            key={`${roundOption}-round-button`}
            name={`${roundOption}-round-button`}
            selected={totalRounds === roundOption}
            onChange={(e) => handleRoundSelect(e, false, roundOption)}
          />
        ))}
        <StatefulButton 
          type={'text'}
          text={'Custom'}
          name={'Custom-round-button'}
          selected={isCustomRoundOption}
          onChange={(e) => handleRoundSelect(e, !isCustomRoundOption)}
        />
      </div>
      { isCustomRoundOption &&
        <SingleInput
          inputType='number'
          title='Custom: '
          name='totalRounds'
          onChange={(e) => handleRoundSelect(e, isCustomRoundOption)}
          content={totalRounds}
          />
      }
    </div>
  );

}

Rounds.propTypes = {
  totalRounds: PropTypes.number.isRequired,
  handleNumberChange: PropTypes.func.isRequired
}

export default Rounds;