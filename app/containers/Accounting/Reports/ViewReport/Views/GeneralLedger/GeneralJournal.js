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
import CircularProgress from '@material-ui/core/CircularProgress';
import formatDate from '../../Helpers';
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

  console.log('uuuuuuuuuuuuuuuuuuuuuoooooUser', user);

  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    dispatchGetAllGeneralJournalTypeAction();
    return async () => await dispatchCleanUpAction();
  }, [time]);
  const { journalEntries, debitTotal, creditTotal } = generalJournal;
  const { organisation } = user;

  const tableData =
    error === false && journalEntries
      ? journalEntries.map(journal => {
          return {
            Date: `${formatDate(journal.dateCreated)}`,
            'Account ID': `${journal.accountId}`,
            Reference: `${journal.reference}`,
            'Trans Description': `${journal.description}`,
            'Debit Amt': `${journal.debit}`,
            'Credit Amt': `${journal.credit}`,
          };
        })
      : '';

  const TableHeadData = [
    'Date',
    'Account ID',
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
        search={dispatchGetGeneralJournalTimeAction}
      />
      <div ref={componentRef}>
        <Company
          Logo={organisation.logo}
          name="General Journal"
          date={`${formatDate(startDate)} - ${formatDate(endDate)}`}
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
  return <React.Fragment>{screen}</React.Fragment>;
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
