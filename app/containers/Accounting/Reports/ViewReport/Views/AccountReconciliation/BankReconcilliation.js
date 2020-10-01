import React, { useRef, useState } from 'react';
import './style.css';
import Table from '../../Components/Table';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

// const tableData = [
//   { a: 'Beginning GL Balance', b: '', c: '', d: '209,434.54' },
//   { a: 'Beginning GL Balance', b: '', c: '', d: '209,434.54' },
//   { a: 'Add: Cash Receipts', b: '', c: '', d: '207,434.54' },
//   { a: 'Less: Cash Disbursements', b: '', c: '', d: '' },
//   { a: 'Add(Less) Other', b: '', c: '', d: '(100,000.00)' },
//   { a: 'Ending Balance', b: '', c: '', d: '109,434.54' },
//   { a: '', b: '', c: '', d: '' },
//   { a: 'Ending Bank Balance', b: '', c: '', d: '' },
//   { a: 'Add back deposits in transit', b: '', c: '', d: '' },
//   { a: '', b: 'May 15, 2020', c: '200,000.00', d: '' },
//   { a: '', b: 'May 15, 2020', c: '200,000.00', d: '' },
//   { a: 'Total deposits in transits', b: '', c: '', d: '515,000.00' },
//   { a: '(Less outstanding checks)', b: '', c: '', d: '' },
//   { a: '', b: 'May 27, 2020', c: '(79,585.46)', d: '' },
//   { a: '', b: 'May 28, 2020', c: '(11,980.6)', d: '' },
//   { a: 'Total outstanding checks', b: '', c: '', d: '(91,565.46)' },
//   { a: 'Total other', b: '', c: '', d: '314,000.00' },
//   { a: 'Unreconciled difference', b: '', c: '', d: '0.00' },
//   { a: 'Ending GL Balance', b: '', c: '', d: '109,434.54' },
// ];
// const TableHeadData = ['Account Reconciliation', '', '', ''];

const BankReconciliation = () => {
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
        <Company Logo={Logo} name="Bank Reconciliation" date="" />
      </div>
    </React.Fragment>
  );
};

export default BankReconciliation;
// <Table
//   ref={tableRef}
//   data={tableData}
//   // TableFooterData={TableFooterData}
//   TableHeadData={TableHeadData}
// />
