import React, { useRef, useState } from 'react';
import './style.css';
import Table from '../../Components/Table';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

const tableData = [
  {
    Date: '5-april-2019',
    'Asset ID': 'P001',
    Description: 'Generator',
    'Cost Bfwd': '1,000,000',
    Addition: '',
    Disposal: '',
    'Cost Cfwd': '1,000,000',
    'Depriciation Bfwd': '1,000,000',
    Addition: '',
    Disposal: '',
    'Depriciation Cfwd': '100,000',
    'Net Book Value': '900,000',
  },
  {
    Date: '6-jan-2019',
    'Asset ID': 'E004',
    Description: 'Motor Vehicle',
    'Cost Bfwd': '1,500,000',
    Addition: '',
    Disposal: '1,500,000',
    'Cost Cfwd': '',
    'Depriciation Bfwd': '300,000',
    Addition: '',
    Disposal: '300,000',
    'Depriciation Cfwd': '',
    'Net Book Value': '',
  },
  {
    Date: '12-March-2019',
    'Asset ID': 'E004',
    Description: 'Equipment',
    'Cost Bfwd': '1,500,000',
    Addition: '350,000',
    Disposal: '',
    'Cost Cfwd': '350,000',
    'Depriciation Bfwd': '',
    Addition: '50,000',
    Disposal: '',
    'Depriciation Cfwd': '50,000',
    'Net Book Value': '300,000',
  },
];
const TableFooterData = [
  {
    Date: '',
    'Asset ID': '',
    Description: 'Total',
    'Cost Bfwd': '',
    Addition: '',
    Disposal: '2,500,000',
    'Cost Cfwd': '1,350,00.00',
    'Depriciation Bfwd': '400.000.00',
    Addition: '50,000.00',
    Disposal: '300,000.00',
    'Depriciation Cfwd': '150,000.00',
    'Net Book Value': '1,200,000.00',
  },
];
const TableHeadData = [
  'Date',
  'Asset ID',
  'Description',
  'Cost Bfwd',
  'Addition',
  'Disposal',
  'Cost Cfwd',
  'Depriciation Bfwd',
  'Addition',
  'Disposal',
  'Depriciation Cfwd',
  'Net Book Value',
];

const AssetSchedule = () => {
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
          name="Fixed Asset Registers"
          date="16th december, 2010"
        />

        <Table
          ref={tableRef}
          data={tableData}
          TableFooterData={TableFooterData}
          TableHeadData={TableHeadData}
        />
      </div>
    </React.Fragment>
  );
};

export default AssetSchedule;
