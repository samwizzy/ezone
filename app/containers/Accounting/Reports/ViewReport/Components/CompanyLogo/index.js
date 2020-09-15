import React from 'react';
import './style.css';
// import Image from './Component/Image';

const Company = ({ Logo, name, date }) => (
  <div className="view-main">
    <img src={Logo} alt="" className="imgProf" />
    <h5>{name}</h5>
    <h6>{date}</h6>
  </div>
);
export default Company;
