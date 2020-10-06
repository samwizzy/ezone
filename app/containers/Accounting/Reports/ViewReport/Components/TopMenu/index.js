import React from 'react';
import Search from '../Search';
import SingleDate from '../SingleDateSearch';
import ExportAs from '../PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';

const index = ({
  componentRef,
  print,
  setPrint,
  handleFetch,
  tableData,
  searchField,
  singleDate = '',
  tableRef,
  daterange,
  pdflogo,
  companyRef,
}) => (
  <div className="flex-b md">
    <div className="flex-b">
      <h6>Filter: </h6>
      {singleDate && <SingleDate handleFetch={handleFetch} />}
      {!singleDate && <Search handleFetch={handleFetch} />}
      {!singleDate && searchField && <Search searchField={searchField} />}
    </div>
    <div className="flex-r">
      <PdfIcon
        componentRef={componentRef}
        height="20px"
        width="20px"
        className="bell"
        print={print}
        setPrint={setPrint}
        tableRef={tableRef}
        pdflogo={pdflogo}
        daterange={daterange}
        companyRef={companyRef}
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
);

export default index;
