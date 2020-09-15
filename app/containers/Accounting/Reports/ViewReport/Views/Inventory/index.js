import React, { useRef, useState } from 'react';
import Search from '../../Search';
import ExportAs from '../../Components/PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';
import Table from '../../Components/Table';
// import Image from './Component/Image';
import Logo from '../../Assets/firstMarine.png';

const tableData = [
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
  {
    'Account Name': 'Zenith',
    'Account ID': '0009034',
    'Account Type': 'Cash and cash equivalent',
    Status: 'Inactive',
  },
];
const TableHeadData = [
  'Account Name',
  'Account ID',
  'Account Type',
  'Inactive',
];

const CustomerLedger = () => {
  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);

  return (
    <React.Fragment>
      <div className="flex-b md">
        <div className="flex-b">
          <h6>Filter: </h6>
          <Search />
        </div>
        <div className="flex-r">
          <PdfIcon
            componentRef={componentRef}
            height="20px"
            width="20px"
            className="bell"
            print={print}
            setPrint={setPrint}
          />

          <PrintIcon
            height="20px"
            width="20px"
            printRef={componentRef}
            className="bell"
          />
          <ExportAs data={tableData} setPrint={setPrint} />
        </div>
      </div>
      <div ref={componentRef}>
        <div className="view-main">
          <img src={Logo} alt="" className="imgProf" />
          <h5>Charts of Accounts</h5>
          <h6>16th december, 2010</h6>
        </div>

        <Table ref={tableRef} data={tableData} TableHeadData={TableHeadData} />
      </div>
    </React.Fragment>
  );
};

export default CustomerLedger;
