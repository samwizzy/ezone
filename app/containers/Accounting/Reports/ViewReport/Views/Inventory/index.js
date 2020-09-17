import React, { useRef, useState } from 'react';
import Search from '../../Search';
import ExportAs from '../../Components/PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';
import Table from '../../Components/Table';
// import Image from './Component/Image';
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';

const tableData = [
  {
    'Item ID': 'BBB-01',
    'Item Description': 'Bread',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BBM-01',
    'Item Description': 'Maltina (Bottle) x 12',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BBB-02',
    'Item Description': 'Amstel Malt (Bottle) x 12',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BBM-03',
    'Item Description': 'Dubic Malt (Bottle) x 12',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BFS-01',
    'Item Description': 'Dangote Sugar 250g x 40g',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BDS-02',
    'Item Description': 'Dangote Sugar 500g x 20g',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BDS-03',
    'Item Description': 'Dangote Sugar x 10',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
  {
    'Item ID': 'BMB-01',
    'Item Description': 'Blue Band 250g x 24',
    'Item Class': 'Stock item',
    'Beg Qty': '',
    'Units Sold': '',
    'Units Purc': '',
    'Adjust Qty': '',
    'Assembly Qty': '',
    'Qty on Hand': '',
  },
];
const TableHeadData = [
  'Item ID',
  'Item Description',
  'Item Class',
  'Beg Qty',
  'Units Sold',
  'Units Purc',
  'Adjust Qty',
  'Assembly Qty',
  'Qty on Hand',
];

const Inventory = () => {
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
          name="Cost of goods sold"
          date="16th december, 2010"
        />

        <Table ref={tableRef} data={tableData} TableHeadData={TableHeadData} />
      </div>
    </React.Fragment>
  );
};

export default Inventory;
