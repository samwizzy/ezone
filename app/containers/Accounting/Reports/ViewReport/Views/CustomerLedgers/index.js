import React, { useRef, useState } from 'react';
import Search from '../../Search';
import ExportAs from '../../Components/PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';
import Table from '../../Components/Table';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

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
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
      />
      <div ref={componentRef}>
        <Company
          Logo={Logo}
          name="Customer Ledgers"
          date="16th december, 2010"
        />

        <Table ref={tableRef} data={tableData} TableHeadData={TableHeadData} />
      </div>
    </React.Fragment>
  );
};

export default CustomerLedger;
