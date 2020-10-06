import React from 'react';
import './style.css';

const Company = React.forwardRef(({ Logo, name, date, ComLogo }, ref) => {
  return (
    <div ref={ref} className="view-main">
      <img
        src={Logo ? Logo : `data:image/png;base64,${ComLogo}`}
        alt=""
        className="imgProf"
      />
      <h5 id="companyName">{name}</h5>
      <h6 id="companyDate">{date}</h6>
    </div>
  );
});
export default Company;
