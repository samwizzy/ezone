import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles, Grid } from '@material-ui/core';
import * as Selectors from '../../selectors';
import MUIDataTable from 'mui-datatables';
import ControlledButtons from '../../Components/BackButton';
import Company from '../../Components/CompanyLogo';
import * as Select from '../../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    width: '100% !important',
    '& thead': {
      '& th': {
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
      },
    },
    '& td': {
      cursor: 'pointer',
      padding: theme.spacing(1),
    },
  },
}));

const AgedReports = ({ date, user, getAgedPayables }) => {
  const classes = useStyles();
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();

  const { organisation } = user;

  const columns = [
    {
      name: 'vendorCode',
      label: 'Vendor Code',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'vendorName',
      label: 'Vendor Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'costCentreId',
      label: 'Cost centre ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'telephone',
      label: 'Telephone',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'transactionNumber',
      label: 'Trans No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'days',
      label: '0 - 30',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'days',
      label: '31 - 60',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'days',
      label: '61 - 90',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'days',
      label: 'Over 90 days',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'amountDue',
      label: 'Amount Due',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'aged',
      label: 'Aging as per FMES',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    download: false,
    filter: false,
    print: false,
    pagination: false,
    viewColumns: false,
    elevation: 0,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={[]}
          printCsc={[columns, [] ? { ...[] } : '']}
          date={date}
          pdflogo={organisation.logo}
          daterange={`${date.startDate} — ${date.endDate}`}
          tableRef={tableRef}
          head={[columns]}
          body={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <div ref={componentRef}>
          <Company logo={organisation.logo} name="Aged Payables" date={date} />

          <MUIDataTable
            className={classes.datatable}
            title="Aged Payables"
            data={[]}
            columns={columns}
            options={options}
          />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getAgedPayables: () => dispatch(() => {}),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AgedReports);
