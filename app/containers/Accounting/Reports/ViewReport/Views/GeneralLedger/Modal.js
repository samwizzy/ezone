import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import {
  TableFooter,
  TablePagination,
  TableRow,
  TableCell,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import classNames from 'classnames';
import moment from 'moment';
import ControlledButtons from '../../Components/BackButton';
import EzoneUtils from '../../../../../../utils/EzoneUtils';

import './style.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: ' 0px 24px 24px 24px',
  },
  flex: {
    position: 'relative',
    padding: theme.spacing(8, 2),
  },
  tableFoot: {
    backgroundColor: darken(theme.palette.primary.main, 0.1),
  },
  datatable: {
    width: '100% !important',
    '& thead': {
      '& th': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: '8px !important',
      },
    },
    '& tbody': {
      '& td': {
        padding: '8px !important',
      },
    },
    '& tfoot': {
      '& td': {
        padding: '8px !important',
      },
    },
  },
}));

const Modal = ({ showmodal, setShowmodal, rowInfo, general, DatePeriod }) => {
  const modalRef = useRef();
  const spanRef = useRef();
  const classes = useStyles();
  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: true,
    print: false,
    pagination: false,
    rowsPerPage: 20,
    count: 15,
    page: 0,
    viewColumns: false,
    onRowClick: rowData => handleRow(rowData),
  };

  const AccName = rowInfo[1];

  const data = general[AccName];

  const columns = [
    'Transaction Date',
    'Reference No',
    'Trans Desc',
    'Debit Amt',
    'Credit Amt',
    {
      name: 'Balacne',
      label: 'Balance',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];
  const formatDate = dateTime => moment(dateTime).format('DD-MM-YYYY');

  const newArray = data.map(detail => [
    `${formatDate(detail.date)}`,
    `${detail.reference}`,
    `${detail.transactionDescription}`,
    `${detail.debitAmount === 0 ? '' : detail.debitAmount}`,
    `${detail.creditAmount === 0 ? '' : detail.creditAmount}`,
    `${
      detail.financialType === 'CREDIT'
        ? detail.creditAmount - detail.debitAmount
        : detail.debitAmount - detail.creditAmount
    }`,
  ]);

  useEffect(() => {
    if (showmodal === true) {
      modalRef.current.style.display = 'block';
    }
    const closeModal = event => {
      if (event.target == modalRef.current) {
        setShowmodal(false);
        modalRef.current.style.display = 'none';
      }
    };
    window.addEventListener('onclick', closeModal);
    return () => window.removeEventListener('onclick', closeModal);
  });
  const handleSpanClick = () => {
    setShowmodal(false);
    modalRef.current.style.display = 'none';
  };
  const TableFooterData = [
    '',
    'Ending Balance',
    '',
    '',
    '',
    `${data.reduce((a, b) => a + b.debitAmount, 0) -
      data.reduce((a, b) => a + b.creditAmount, 0)}`,
  ];
  return (
    <div ref={modalRef} id="myModal" className="modal">
      <div className="modal-content">
        <span ref={spanRef} onClick={handleSpanClick} className="close">
          &times;
        </span>
        <div style={{ color: '#777' }}>
          <h4>Account Name: {AccName} </h4>
          <h4>Period: {DatePeriod} </h4>
        </div>
        <MUIDataTable
          className={classes.datatable}
          data={newArray && newArray.concat([TableFooterData])}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

export default Modal;
