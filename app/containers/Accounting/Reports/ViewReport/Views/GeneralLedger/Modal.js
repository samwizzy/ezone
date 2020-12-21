import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  IconButton,
  Modal,
  Typography,
  TableFooter,
  TableCell,
  TableRow,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import EzoneUtils from '../../../../../../utils/EzoneUtils';

const useStyles = makeStyles(theme => ({
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
        padding: theme.spacing(1),
      },
    },
    '& tfoot': {
      '& td': {
        padding: theme.spacing(1),
      },
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const ModalTable = ({ open, handleClose, rowInfo, generalLedgers, date }) => {
  const classes = useStyles();
  const [data, setData] = useState([]);

  if (!rowInfo) {
    return null;
  }

  useEffect(() => {
    const glData = generalLedgers[rowInfo[1]];
    console.log(glData, 'glData');
    setData(glData);

    return () => {};
  }, [rowInfo]);

  const sumBalance = (startIndex, endIndex) => {
    return data
      .slice(startIndex, endIndex)
      .reduce((a, b) => a + b.debitAmount - b.creditAmount, 0);
  };

  const columns = [
    {
      name: 'date',
      label: 'Transaction date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => (value ? moment(value).format('ll') : ''),
      },
    },
    {
      name: 'reference',
      label: 'Reference No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'transactionDescription',
      label: 'Trans. Desc',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'debitAmount',
      label: 'Debit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'creditAmount',
      label: 'Credit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'accountId',
      label: 'Computed Balance',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, rowData) => {
          const gl = data && data[rowData.rowIndex];
          return gl
            ? EzoneUtils.formatCurrency(gl.debitAmount - gl.creditAmount)
            : '';
        },
      },
    },
    {
      name: 'balance',
      label: 'Balance',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: false,
    filter: false,
    print: false,
    pagination: false,
    rowsPerPage: 20,
    count: 15,
    page: 0,
    viewColumns: false,
    customToolbar: () => (
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    ),
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      const startIndex = page * rowsPerPage;
      const endIndex = (page + 1) * rowsPerPage;
      return (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} align="right">
              <Typography variant="subtitle1">
                Total balance: {sumBalance(startIndex, endIndex)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      );
    },
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <MUIDataTable
          className={classes.datatable}
          title={
            <div>
              <Typography variant="h6">
                <strong>Account Name:</strong> {rowInfo[1]}{' '}
              </Typography>
              <Typography variant="h6">
                <strong>Period:</strong> {date.startDate}{' '}
              </Typography>
            </div>
          }
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </Modal>
  );
};

export default ModalTable;
