import React from 'react';
import './style.css';

const Company = React.forwardRef(({ Logo, name, date, ComLogo }, ref) => {
  const upperCase = str => {
    str = str.split('-');
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(' ');
  };
  return (
    <div ref={ref} className="view-main">
      <img
        src={Logo ? Logo : `data:image/png;base64,${ComLogo}`}
        alt=""
        className="imgProf"
      />
      <h5 id="companyName">{upperCase(name)}</h5>
      <h5 id="companyDate">{date}</h5>
    </div>
  );
});
export default Company;
