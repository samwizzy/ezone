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
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const formatDate = dateTime => moment(dateTime).format('DD-MM-YYYY');
  const { organisation } = user;
  // console.log('generalLedger.mapvvvvvvvvvvvvvvvvvvv', generalLedger);
  const ArraysOfArray = Object.keys(generalLedger).map(
    key => generalLedger[key],
  );

  let arr = [];
  let tableData = [];
  ArraysOfArray.forEach(element => {
    element.forEach(ledger => {
      tableData.push({
        'Account ID': `${ledger.accountId}`,
        'Account Desc': `${ledger.accountDescription}`,
        Date: `${formatDate(ledger.date)}`,
        Reference: `${ledger.reference}`,
        'Transaction Desc': `${ledger.transactionDescription}`,
        'Debit Amt': `${ledger.debitAmount}`,
        'Credit Amt': `${ledger.creditAmount}`,
        Balance: `${ledger.balance}`,
      });
    });
  });

  const TableHeadData = [
    'Account Code',
    'Account Name',
    'Date',
    'Reference',
    'Transaction Desc',
    'Debit Amt',
    'Credit Amt',
    'Balance',
  ];
  const handleData = () => {
    dispatchGetAllGeneralLedgerTypeAction();
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
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralJournalAction()),
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
/** imports 
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
 */

/**Refs declaration
 const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
 */

/**Set date
  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];
  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;

 */

/**TopMenu
  componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate}
 */

/** Company
  *  ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={setDate}
  */
