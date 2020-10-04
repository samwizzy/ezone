import React from 'react';
import './style.css';

const Company = ({ Logo, name, date, ComLogo }) => {
  return (
    <div className="view-main">
      <img
        src={Logo ? Logo : `data:image/png;base64,${ComLogo}`}
        alt=""
        className="imgProf"
      />
      <h5>{name}</h5>
      <h6>{date}</h6>
    </div>
  );
};
export default Company;
