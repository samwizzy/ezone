import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import reducer from '../../reducers';
import saga from '../../saga';
import Company from '../../Components/CompanyLogo';
import * as Select from '../../../../../App/selectors';
import { makeStyles, Grid } from '@material-ui/core';
import EzoneUtils from '../../../../../../utils/EzoneUtils';
import MUIDataTable from 'mui-datatables';
import ControlledButtons from '../../Components/BackButton';

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
}));

const CashAccountRegister = ({
  date,
  user,
  cashAccountRegister,
  getCashAccountRegister,
}) => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });

  const classes = useStyles();
  const tableRef = useRef();
  const { organisation } = user;

  const orderedCashRegister = _.orderBy(
    cashAccountRegister,
    ['dateCreated'],
    ['desc'],
  );

  useEffect(() => {
    if (date.startDate && date.endDate) {
      getCashAccountRegister(date);
    }
  }, [date]);

  useEffect(() => {
    return async () => {};
  }, []);

  console.log(cashAccountRegister, 'cashAccountRegister');

  // const data = cashAccountRegister.map(account => [
  //   formatDate(account.date),
  //   account.reference,
  //   account.type ? account.type : '',
  //   account.payee ? account.payee : '',
  //   account.memo ? account.memo : '',
  //   account.paymentAmount ? account.paymentAmount : '',
  //   account.receiptAmount ? account.receiptAmount : '',
  //   account.balance ? account.balance : '',
  // ]);

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: false,
    print: false,
    pagination: true,
    viewColumns: false,
  };

  const columns = [
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => (value ? moment(value).format('ll') : ''),
      },
    },
    {
      name: 'reference',
      label: 'Reference',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'payee',
      label: 'Payee/Paid By',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'memo',
      label: 'Memo',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'paymentAmount',
      label: 'Payment Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'receiptAmount',
      label: 'Receipt Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={cashAccountRegister}
          printCsc={[
            columns,
            cashAccountRegister ? { ...cashAccountRegister } : '',
          ]}
          pdflogo={organisation.logo}
          daterange={`As at ${moment(date.endDate).format('MMM Do YYYY')}`}
          dateValue={date.endDate}
          head={[
            [
              'Date',
              'Reference',
              'Type',
              'Payee/Paid By',
              'Memo',
              'Payment Amt',
              'Receipt Amt',
              'Balance',
            ],
          ]}
          body={cashAccountRegister}
        />
      </Grid>
      <Grid item xs={12}>
        <Company
          logo={organisation.logo}
          name="Cash Account Register"
          date={date}
        />

        <MUIDataTable
          className={classes.datatable}
          data={orderedCashRegister}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  cashAccountRegister: Selectors.makeSelectCashAccountRegister(),
});

const mapDispatchToProps = dispatch => ({
  getCashAccountRegister: data =>
    dispatch(Actions.getCashAccountRegister(data)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CashAccountRegister);
