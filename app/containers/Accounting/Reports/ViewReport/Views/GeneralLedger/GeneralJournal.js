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
// import Logo from '../../Assets/firstMarine.png';
import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import * as Select from '../../../../../App/selectors';

const GeneralJournal = ({
  error,
  loading,
  generalJournal,
  dispatchGetAllGeneralJournalTypeAction,
  dispatchGetGeneralJournalTimeAction,
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
  const { journalEntries, debitTotal, creditTotal } = generalJournal;
  const { organisation } = user;

  const tableData =
    error === false && journalEntries
      ? journalEntries.map(journal => {
          return {
            Date: `${formatDate(journal.dateCreated)}`,
            'Account Code': `${journal.accountCode}`,
            Reference: `${journal.reference}`,
            'Trans Description': `${journal.description}`,
            'Debit Amt': `${journal.debit}`,
            'Credit Amt': `${journal.credit}`,
          };
        })
      : '';

  const TableHeadData = [
    'Date',
    'Account Code',
    'Reference',
    'Trans Description',
    'Debit Amt',
    'Credit Amt',
  ];
  const TableFooterData = [
    {
      ' Date': '',
      'Account ID': '',
      ' Reference': 'Total',
      'Trans Description': '',
      'Debit Amt': `${journalEntries ? debitTotal : ''}`,
      'Credit Amt': `${journalEntries ? creditTotal : ''}`,
    },
  ];
  const handleData = () => {
    dispatchGetAllGeneralJournalTypeAction();

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
      <div style={{ width: '100%', height: '100%' }} ref={componentRef}>
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
  generalJournal: Selectors.makeSelectGeneralJournal(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalSuccesAction: () =>
    dispatch(Actions.getGeneralJournalSuccesAction()),
  dispatchGetAllGeneralJournalTypeAction: () =>
    dispatch(Actions.getAllGeneralJournalTypeAction()),
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralJournalAction()),
  dispatchGetGeneralJournalTimeAction: () =>
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
)(GeneralJournal);
