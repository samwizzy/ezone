import React, { useRef, useState } from 'react';
import Search from '../../Search';
import ExportAs from '../../Components/PrintSelect';
import PrintIcon from '../../Assets/Print';
import PdfIcon from '../../Assets/Pdf';
import './style.css';
import Table from '../../Components/Table';
// import Image from './Component/Image';
import Logo from '../../Assets/firstMarine.png';

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
