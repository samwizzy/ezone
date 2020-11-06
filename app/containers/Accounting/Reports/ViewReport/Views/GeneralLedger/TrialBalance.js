import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import ReportSaga from '../../saga';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import * as Select from '../../../../../App/selectors';
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
import ControlledButtons from '../../Components/BackButton';
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

const TrialBalance = ({
  reports,
  error,
  loading,
  trialBalance,
  dispatchGetAllTrialBalanceAction,
  dispatchGetGeneralTimeAction,
  dispatchCleanUpAction,
  time,
  user,
}) => {
  const { startDate, endDate } = time;

  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const [period, setPeriod] = useState({ firstDate: '', lastDate: '' });

  const classes = useStyles();

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const formatDate = dateTime => moment(dateTime).format('DD-MM-YYYY');

  const { trialBalances } = trialBalance;
  const { organisation } = user;

  const data =
    trialBalances &&
    trialBalances.map(balance => [
      `${balance.accountCode}`,
      `${balance.accountDescription}`,
      `${balance.debitAmount === 0.0 ? '' : balance.debitAmount}`,
      `${balance.creditAmount === 0.0 ? '' : balance.creditAmount}`,
    ]);
  const columns = ['Account Code', 'Account Name', 'Debit Amt', 'Credit Amt'];
  const TableFooterData = [
    '   ',
    ' TOTAL',
    `${trialBalance && trialBalance.totalDebit}`,
    `${trialBalance && trialBalance.totalcCredit}`,
  ];

  console.log('YEEEEEEEEEEEEESSSSSSSSSSSSSS', trialBalances);
  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    elevation: 0,
    download: false,
    print: false,
    pagination: false,
    viewColumns: false,
  };

  const handleData = () => {
    dispatchGetAllTrialBalanceAction();
    setDisplay(true);
  };
  const dateValue = ({ target }) => {
    dispatchGetGeneralTimeAction({
      startDate: '01/01/2000',
      endDate: target.value.split('-').join('/'),
    });
    handleData();
  };
  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;
  return (
    <div className={classes.root}>
      <ControlledButtons
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={data}
        printCsc={[columns, data ? { ...data } : '']}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate}
        dateValue={dateValue}
        head={[columns]}
        body={data}
        toDay="End Date"
        singleDate={true}
      />

      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={display && `As at ${moment(endDate).format('MMM Do YYYY')}`}
        />
        <MUIDataTable
          className={classes.datatable}
          data={data && data.concat([TableFooterData])}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
  error: Selectors.makeSelectError(),
  time: Selectors.makeSelectTime(),
  trialBalance: Selectors.makeSelectTrialBalance(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetTrialBalanceSuccesAction: () =>
    dispatch(Actions.getTrialBalanceSuccesAction()),
  dispatchGetAllTrialBalanceAction: () =>
    dispatch(Actions.getAllTrialBalanceAction()),
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralJournalAction()),
  dispatchGetGeneralTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
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
// customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => (
//   <TableFooter>
//     <TableRow>
//       <TableCell
//         style={{ backgroundColor: 'black', color: 'white' }}
//         colSpan={9}
//       >
//         {'Total                ;'}
//       </TableCell>

//       <TableCell
//         style={{ backgroundColor: 'black', color: 'white' }}
//         colSpan={1}
//       >
//         {`${trialBalance ? trialBalance.total : ''}`}
//       </TableCell>
//       <TableCell
//         style={{ backgroundColor: 'black', color: 'white' }}
//         colSpan={1}
//       >
//         {`${trialBalance ? trialBalance.total : ''}`}
//       </TableCell>
//     </TableRow>
//   </TableFooter>
// ),
// https://dev.ezoneapps.com/gateway/accountingserv/api/v1/report/get_trial_balance?endDate=2020/11/17&startDate=01/01/2000&orgId=ORG-1593451692921
// https://app.ezoneerp.com/gateway/accountingserv/api/v1/report/get_trial_balance?endDate=2020/11/05&startDate=01/01/2000&orgId=ORG-1593512567642
