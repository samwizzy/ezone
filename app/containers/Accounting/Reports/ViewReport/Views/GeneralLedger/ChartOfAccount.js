import React, { memo, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
import { darken } from '@material-ui/core/styles/colorManipulator';
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

const ChartOfAccount = ({
  date,
  user,
  chartOfAccounts,
  getChartOfAccounts,
}) => {
  useInjectReducer({ key: 'reports', reducer });
  useInjectSaga({ key: 'reports', saga });
  const classes = useStyles();
  const { organisation } = user;
  const tableRef = useRef();

  useEffect(() => {
    if (date.endDate) {
      getChartOfAccounts(date);
    }
  }, [date]);

  useEffect(() => {
    return async () => {};
  }, []);

  const columns = [
    'Account Code',
    'Account Name',
    'Account Type',
    {
      name: 'Closing Balance',
      label: 'Closing Balance',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => EzoneUtils.formatCurrency(value),
      },
    },
    'Status',
  ];

  const data = chartOfAccounts.map(account => [
    account.accountCode,
    account.accountName,
    account.accountType && account.accountType.accountType,
    account.closingBalance,
    account.status ? 'Active' : 'Inactive',
  ]);

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    filter: false,
    download: false,
    print: false,
    pagination: true,
    viewColumns: false,
    elevation: 0,
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={data}
          printCsc={[columns, data ? { ...data } : '']}
          pdflogo={organisation.logo}
          daterange={`As at ${moment(date.endDate).format('MMM Do YYYY')}`}
          singleDate={true}
          dateValue={date.endDate}
          head={[columns]}
          body={data}
        />
      </Grid>
      <Grid item xs={12}>
        <Company
          logo={organisation.logo}
          name="Chart of Accounts"
          date={date}
        />

        <MUIDataTable
          className={classes.datatable}
          title="Chart of Account Report"
          data={data}
          columns={columns}
          options={options}
          ref={tableRef}
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
  chartOfAccounts: Selectors.makeSelectChartOfAccounts(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getChartOfAccounts: date => dispatch(Actions.getChartOfAccounts(date)),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChartOfAccount);
