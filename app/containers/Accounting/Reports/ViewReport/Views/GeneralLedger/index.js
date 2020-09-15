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
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
    'Debit Adj': '',
    'Credit Adj': '',
    'End Bal': '',
    Reference: '',
  },
  {
    'Account ID': '0009034',
    'Account Description': 'Cash and cash equivalent',
    'Last FYE Bal': '1,325,00',
    'Current Bal': '125585565',
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
          name="Fixed Asset Schedule"
          date="16th december, 2010"
        />

        <Table ref={tableRef} data={tableData} TableHeadData={TableHeadData} />
      </div>
    </React.Fragment>
  );
};

export default GeneralLedger;
