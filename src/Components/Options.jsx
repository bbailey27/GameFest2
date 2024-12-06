import PropTypes from 'prop-types';
import StatefulButton from './Subcomponents/StatefulButton';
import { ReactComponent as ChangePeopleIcon } from '../Images/ChangePeopleIcon.svg';
import { ReactComponent as ChangeTablesIcon } from '../Images/ChangeTablesIcon.svg';



Options.propTypes = {
    options: PropTypes.shape({
        changePeople: PropTypes.bool,
        changeTables: PropTypes.bool,
    }).isRequired,
    handleOptionsChange: PropTypes.func.isRequired
  }

function Options({
    options,
    handleOptionsChange
}) {

    return (
      <div className='options data-entry-subsection'>
        <h3>Preferences</h3>
        <div className='options-group'>
            <StatefulButton
                type='composite'
                text='See more people'
                Icon={ChangePeopleIcon}
                selected={options.changePeople}
                onChange={() => handleOptionsChange('changePeople', !options.changePeople)}
            />
            <StatefulButton
                type='composite'
                text='Change tables'
                Icon={ChangeTablesIcon}
                selected={options.changeTables}
                onChange={() => handleOptionsChange('changeTables', !options.changeTables)}
            />
        </div>
      </div>
    );
}

export default Options;
