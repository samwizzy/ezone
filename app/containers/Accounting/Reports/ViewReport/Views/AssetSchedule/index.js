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
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '5861485',
    Disposal: '21688',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '22865',
    Disposal: '45526845',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '5-jan-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '',
    Disposal: '',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '',
    Disposal: '',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '5-jan-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '',
    Disposal: '',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '',
    Disposal: '',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '5-jan-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '',
    Disposal: '',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '',
    Disposal: '',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '5-jan-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '',
    Disposal: '',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '',
    Disposal: '',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '5-jan-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '895662',
    Disposal: '24586',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '4526',
    Disposal: '2325658',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '8-Feb-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '555155',
    Disposal: '26565',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '7545875',
    Disposal: '8622654',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
  {
    Date: '8-Feb-2019',
    'Asset ID': 'P001',
    Description: 'Cash and cash equivalent',
    'Cost Bfwd': '1,000,000',
    Addition: '555155',
    Disposal: '26565',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '856522',
    Addition: '7545875',
    Disposal: '8622654',
    'Depriciation Cfwd': '7451223',
    'Net Book Value': '900,554554',
  },
];
const TableFooterData = [
  {
    Date: '',
    'Asset ID': '',
    Description: 'Total',
    'Cost Bfwd': '1,000,000',
    Addition: '415513562',
    Disposal: '4,854846',
    'Cost Cfwd': '1222552',
    'Depriciation Bfwd': '4784589579',
    Addition: '1270265',
    Disposal: '32156423',
    'Depriciation Cfwd': '30215456',
    'Net Book Value': '900,554554',
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
