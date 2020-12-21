import React from 'react';
import { IconButton } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '../../Assets/Print';

const Print = props => {
  const { tableRef, width, height, className } = props;

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <IconButton onClick={handlePrint} className={className}>
      <PrintIcon height={height} width={width} />
    </IconButton>
  );
};

export default Print;
