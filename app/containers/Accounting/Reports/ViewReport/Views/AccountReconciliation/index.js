import React, { useRef, useState } from 'react';
import Search from '../../Search';
import './style.css';
import Table from '../../Components/Table';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

const tableData = [
  {
    'Trans No': '0605',
    ' Date': '5/13/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-840.00',
  },
  {
    'Trans No': '0607',
    ' Date': '7/23/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-22,400.00',
  },
  {
    'Trans No': '0704',
    ' Date': '4/20/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-15,880.00',
  },
  {
    'Trans No': '0705',
    ' Date': '5/14/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-520.00',
  },
  {
    'Trans No': '0706',
    ' Date': '6/21/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-2,800.00',
  },
  {
    'Trans No': '0605',
    ' Date': '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-21,510.00',
  },
  {
    'Trans No': '0605',
    ' Date': '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '6,000',
  },
  {
    'Trans No': '0605',
    ' Date': '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-44,400.00',
  },
  {
    'Trans No': '0605',
    ' Date': '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-11,980,00',
  },
  {
    'Trans No': 'P0112',
    ' Date': '12/7/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-17,450.00',
  },
  {
    'Trans No': 'P0312',
    ' Date': '12/23/19',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-20,850.00',
  },
];
const TableFooterData = [
  {
    'Trans No': '',
    ' Date': '',
    'Trans Desc': 'Total',
    'Trans Amt': '164,630',
  },
];
const TableHeadData = ['Trans No', 'Date', 'Trans Desc', 'Trans Amt'];

const AccountReconciliation = () => {
  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);

  return (
    <div>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
      />
      <div ref={componentRef}>
        <Company
          Logo={Logo}
          name="Accounts Reconcilliation"
          date="16th december, 2010"
        />

        <Table
          ref={tableRef}
          data={tableData}
          TableFooterData={TableFooterData}
          TableHeadData={TableHeadData}
        />
      </div>
    </div>
  );
};

export default AccountReconciliation;
