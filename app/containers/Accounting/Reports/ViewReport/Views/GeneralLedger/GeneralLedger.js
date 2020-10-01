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
import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import * as Select from '../../../../../App/selectors';

const GeneralLedger = ({
  reports,
  error,
  loading,
  generalLedger,
  dispatchGetAllGeneralLedgerTypeAction,
  dispatchGetGeneralLedgerTimeAction,
  dispatchCleanUpAction,
  time,
  user,
}) => {
  const { startDate, endDate } = time;

  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => async () => await dispatchCleanUpAction(), [generalLedger]);

  const formatDate = dateTime => moment(dateTime).format('DD-MM-YYYY');
  const { organisation } = user;

  const tableData =
    error === false && generalLedger
      ? generalLedger.map(ledger => ({
        'Account ID': `${ledger.accountId}`,
          'Account Desc': `${ledger.accountDescription}`,
          Date: `${formatDate(ledger.date)}`,
        Reference: `${ledger.reference}`,
          'Transaction Desc': `${ledger.transactionDescription}`,
        'Debit Amt': `${ledger.debitAmount}`,
          'Credit Amt': `${ledger.creditAmount}`,
          Balance: `${ledger.balance}`,
        }))
      : '';

  const TableHeadData = [
    'Account Code',
    'Account Desc',
    'Date',
    'Reference',
    'Transaction Desc',
    'Debit Amt',
    'Credit Amt',
    'Balance',
  ];

  const setDate = startDate
    ? `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
        'MMM Do YYYY',
      )}`
    : '';

  const handleData = () => {
    dispatchGetAllGeneralLedgerTypeAction();
    setDisplay(true);
  };

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
        search={dispatchGetGeneralLedgerTimeAction}
        handleFetch={handleData}
      />
      <div ref={componentRef}>
        <Company
          ComLogo={organisation.logo}
          name="General Ledger"
          date={setDate}
        />

        {display && (
          <Table
            ref={tableRef}
            data={tableData}
            TableHeadData={TableHeadData}
            // TableFooterData={TableFooterData}
          />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
  error: Selectors.makeSelectError(),
  time: Selectors.makeSelectTime(),
  generalLedger: Selectors.makeSelectGeneralLedger(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralLedgerSuccesAction: () =>
    dispatch(Actions.getGeneralLedgerSuccesAction()),
  dispatchGetAllGeneralLedgerTypeAction: () =>
    dispatch(Actions.getAllGeneralLedgerAction()),
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralLedgerAction()),
  dispatchGetGeneralLedgerTimeAction: () =>
    dispatch(Actions.getGeneralLedgerTimeAction()),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GeneralLedger);
