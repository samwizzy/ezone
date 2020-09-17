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
    'Account ID': '0500',
    'Account Description': 'Motor Vehicle',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '1,325,000.00',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0510',
    'Account Description': 'Office Equipments',
    'Last FYE Bal': '-',
    'Current Bal': '-',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0520',
    'Account Description': 'Furniture and Fittings',
    'Last FYE Bal': '66,1000,00',
    'Current Bal': '122,100.00',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '1000',
    'Account Description': '',
    'Last FYE Bal': '',
    'Current Bal': '',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '1010',
    'Account Description': 'Cash in Hand',
    'Last FYE Bal': '379,072.00',
    'Current Bal': '2,495.00',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '1020',
    'Account Description': 'Zenith Bank',
    'Last FYE Bal': '1,563,329.36',
    'Current Bal': '1,299,731.86',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '1030',
    'Account Description': 'Holding Account',
    'Last FYE Bal': '14,850.00',
    'Current Bal': '14,850.00',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '1030',
    'Account Description': 'Account Receivables',
    'Last FYE Bal': '137,890.00,00',
    'Current Bal': '29,220.00',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '1120',
    'Account Description': 'Other Debtors',
    'Last FYE Bal': '',
    'Current Bal': '',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
];
const TableHeadData = [
  'Account ID',
  'Account Description',
  'Last FYE Bal',
  'Current Bal',
  'Debit Adj',
  'Credit Adj',
  'End Bal',
  'Reference',
];

const GeneralLedger = () => {
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
          name="General Ledgers"
          date="16th december, 2010"
        />

        <Table ref={tableRef} data={tableData} TableHeadData={TableHeadData} />
      </div>
    </React.Fragment>
  );
};

export default GeneralLedger;
