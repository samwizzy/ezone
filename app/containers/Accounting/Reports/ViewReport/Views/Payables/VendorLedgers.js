import React, { useRef, useState } from 'react';
import './style.css';
import Table from '../../Components/Table';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

const Vendorledger = () => {
  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);
  const handleData = () => {
    // setDisplay(true);
  };

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        // tableData={tableData}
        handleFetch={handleData}
      />
      <div ref={componentRef}>
        <Company Logo={Logo} name="Vendor Ledger" date="" />
      </div>
    </React.Fragment>
  );
};

export default Vendorledger;
