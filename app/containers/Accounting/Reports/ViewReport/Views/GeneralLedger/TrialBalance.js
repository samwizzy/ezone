import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import ReportSaga from '../../saga';
import './style.css';
import Table from '../../Components/Table';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import * as Select from '../../../../../App/selectors';

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
  const [print, setPrint] = useState(false);

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    dispatchGetAllTrialBalanceAction();
    return async () => await dispatchCleanUpAction();
  }, []);

  const formatDate = dateTime => moment(dateTime).format('DD-MM-YYYY');

  const { trialBalances } = trialBalance;
  const { organisation } = user;

  const tableData =
    error === false && trialBalances
      ? trialBalances.map(balance => {
          return {
            'Account ID': `${balance.accountId}`,
            'Account Desc': `${balance.accountDescription}`,
            'Debit Amt': `${balance.debitAmount}`,
            'Credit Amt': `${balance.creditAmount}`,
          };
        })
      : '';

  const TableHeadData = [
    'Account ID',
    'Account Desc',
    'Debit Amt',
    'Credit Amt',
  ];
  //   const TableFooterData = [
  //     {
  //       'Account ID': '',
  //       'Account Desc': 'Total',
  //       'Debit Amt': `${ledger.debitAmount}`,
  //       'Credit Amt': `${ledger.creditAmount}`,
  //     },
  //   ];

  const screen = loading ? (
    <div style={{ textAlign: 'center' }}>
      <div style={{ margin: '2px auto' }}>
        <CircularProgress />
      </div>
    </div>
  ) : (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
        search={dispatchGetGeneralTimeAction}
      />
      <div ref={componentRef}>
        <Company
          // Logo={Logo}
          Logo={organisation.logo}
          name="Trial Balance"
          date={`${moment(startDate).format('MMM Do YYYY')} - ${moment(
            endDate,
          ).format('MMM Do YYYY')}`}
        />

        <Table
          ref={tableRef}
          data={tableData}
          TableHeadData={TableHeadData}
          // TableFooterData={TableFooterData}
        />
      </div>
    </React.Fragment>
  );
  return <React.Fragment>{screen}</React.Fragment>;
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
  dispatchGetGeneralTimeAction: () =>
    dispatch(Actions.getGeneralJournalTimeAction()),
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
