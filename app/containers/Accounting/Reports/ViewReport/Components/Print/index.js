import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
import PrintIcon from '../../Assets/Print';

const Print = () => {
  // const componentRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  // // <ComponentToPrint ref={componentRef} />
  // onClick = { handlePrint };

  return (
    <div>
      <PrintIcon height="20px" width="20px" className="bell" />
    </div>
  );
};

export default Print;
