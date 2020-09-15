import React from 'react';
import Search from '../../Search';
import ExportAs from '../PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';

const index = ({ componentRef, print, setPrint, tableData }) => (
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
);

export default index;
