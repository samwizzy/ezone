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
import Table from '../../Components/Table';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import * as Select from '../../../../../App/selectors';
import './style.css';

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

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const formatDate = dateTime => moment(dateTime).format('DD-MM-YYYY');

  const { trialBalances } = trialBalance;
  const { organisation } = user;

  console.log('=======>', trialBalance);
  const tableData =
    error === false && trialBalances
      ? trialBalances.map(balance => {
          return {
            'Account Code': `${balance.accountCode}`,
            'Account Name': `${balance.accountDescription}`,
            'Debit Amt': `${balance.debitAmount}`,
            'Credit Amt': `${balance.creditAmount}`,
          };
        })
      : '';
  const TableHeadData = [
    'Account Code',
    'Account Desc',
    'Debit Amt',
    'Credit Amt',
  ];
  const TableFooterData = [
    {
      'Account Code': '',
      'Account Desc': 'Total',
      'Debit Amt': '',
      'Credit Amt': `${trialBalance && trialBalance.total}`,
    },
  ];

  const handleData = () => {
    dispatchGetAllTrialBalanceAction();
    setDisplay(true);
  };

  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate}
      />
      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={setDate}
        />
          <Table
            ref={tableRef}
            data={tableData}
            TableHeadData={TableHeadData}
            TableFooterData={TableFooterData}
          />
      </div>
    </React.Fragment>
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
