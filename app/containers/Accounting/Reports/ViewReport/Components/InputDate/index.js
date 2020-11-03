import React from 'react';
import './style.css';

const InputDate = ({ day, dateValue }) => {
  const [date, setDate] = React.useState();

  const handleClick = e => {
    setDate(e.target.value);
    dateValue(e);
  };
  return (
    <div className="serComp">
      <input
        className="selectDate"
        name={`${day}`}
        type="date"
        onChange={handleClick}
        placeholder={date ? '' : `${day}`}
      />
    </div>
  );
};

export default InputDate;
