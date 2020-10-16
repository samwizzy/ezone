import React from 'react';
import './style.css';
import DropDown from '../../Assets/DropDownArrow';

const InputDate = ({ day, dateValue }) => {
  const [date, setDate] = React.useState();

  const handleClick = e => {
    setDate(e.target.value);
    dateValue(e);
  };
  // console.log('Dateeeeeeeeeeeee', date);
  return (
    <div className="serComp">
      <input
        className="selectDate"
        name={`${day}`}
        type="date"
        onChange={handleClick}
        placeholder={date ? '' : `${day}`}
        // value={date}
      />
    </div>
  );
};

export default InputDate;
