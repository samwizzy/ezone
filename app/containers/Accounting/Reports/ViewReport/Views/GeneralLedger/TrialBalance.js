import React, { memo, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
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

const TrialBalance = ({
  loading,
  allTrialBalance,
  getAllTrialBalance,
  date,
  user,
}) => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });
  const classes = useStyles();
  const tableRef = useRef();

  useEffect(() => {
    if (date.startDate && date.endDate) {
      getAllTrialBalance(date);
    }
  }, [date]);

  useEffect(() => {
    return async () => {};
  }, []);

  const { trialBalances } = allTrialBalance;
  const { organisation } = user;

  const data =
    trialBalances &&
    trialBalances.map(balance => [
      `${balance.accountCode}`,
      `${balance.accountName}`,
      `${balance.debitAmount === 0.0 ? '' : balance.debitAmount}`,
      `${balance.creditAmount === 0.0 ? '' : balance.creditAmount}`,
    ]);
  const columns = [
    'Account Code',
    'Account Name',
    {
      name: 'Debit Amt',
      label: 'Debit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    {
      name: 'Credit Amt',
      label: 'Credit Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
  ];

  const TableFooterData = [
    '   ',
    ' TOTAL',
    `${allTrialBalance && allTrialBalance.totalDebit}`,
    `${allTrialBalance && allTrialBalance.totalcCredit}`,
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
    viewColumns: false,
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={data}
          printCsc={[columns, data ? { ...data } : '']}
          pdflogo={organisation.logo}
          daterange={`${date.startDate} — ${date.endDate}`}
          date={date}
          tableRef={tableRef}
          head={[columns]}
          body={data}
          singleDate={true}
        />
      </Grid>

      <Grid item xs={12}>
        <Company logo={organisation.logo} name="Trial Balance" date={date} />

        <MUIDataTable
          className={classes.datatable}
          data={data && data.concat([TableFooterData])}
          columns={columns}
          options={options}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
  error: Selectors.makeSelectError(),
  date: Selectors.makeSelectDate(),
  allTrialBalance: Selectors.makeSelectAllTrialBalance(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getAllTrialBalance: date => dispatch(Actions.getAllTrialBalance(date)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TrialBalance);
