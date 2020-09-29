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
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
  {
    'Trans No': '0605',
    Date: '5/13719',
    'Trans Desc': 'Sundry Supplier',
    'Trans Amt': '-5862.00',
  },
];
const TableFooterData = [
  {
    'Trans No': '',
    Date: '',
    'Trans Desc': 'Total',
    'Trans Amt': '85456556',
  },
];
const TableHeadData = ['Trans No', 'Date', 'Trans Desc', 'Trans Amt'];

const ReportsPayable = () => {
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
          name="Reports Payable"
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

export default ReportsPayable;