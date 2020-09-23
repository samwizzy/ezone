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
import formatDate from '../../Helpers';
import * as Select from '../../../../../App/selectors';

const ChatsOfAccount = ({
  error,
  loading,
  chatsOfAccount,
  dispatchGetChatsOfAccountSuccesAction,
  dispatchCleanUpAction,
  dispatchGetAllChatsOfAccountTypeAction,
  time,
  reports,
  user,
}) => {
  const { startDate, endDate } = time;

  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    console.log('ddddyyyyyyyyyyyyyyyyyyyyyyyyyyyyooooooooooo', chatsOfAccount);

    dispatchGetAllChatsOfAccountTypeAction();
    return async () => await dispatchCleanUpAction();
  }, []);
  // const { journalEntries, debitTotal, creditTotal } = chatsOfAccount;
  const { organisation } = user;

  console.log('ddddyyyreports', reports);
  // const tableData =
  //   error === false && journalEntries
  //     ? journalEntries.map(journal => {
  //         return {
  //           'Account Name': `${formatDate(journal.dateCreated)}`,
  //           'Account ID': `${journal.accountId}`,
  //           'Account Type': `${journal.reference}`,
  //           Status: `${journal.description}`,
  //         };
  //       })
  //     : '';

  // const TableHeadData = [
  //   'Account Name',
  //   'Account ID',
  //   'Account Type',
  //   'Status',
  // ];

  // const screen = loading ? (
  //   <div style={{ textAlign: 'center' }}>
  //     <div style={{ margin: '2px auto' }}>
  //       <CircularProgress />
  //     </div>
  //   </div>
  // ) : (
  //   <React.Fragment>
  //     <TopMenu
  //       componentRef={componentRef}
  //       print={print}
  //       setPrint={setPrint}
  //       tableData={tableData}
  //       search={dispatchGetGeneralJournalTimeAction}
  //     />
  //     <div ref={componentRef}>
  //       <Company
  //         Logo={Logo}
  // Logo={organisation.logo}

  //         name="General Journal"
  //         date={`${formatDate(startDate)} - ${formatDate(endDate)}`}
  //       />

  //       <Table
  //         ref={tableRef}
  //         data={tableData}
  //         TableHeadData={TableHeadData}
  //         TableFooterData={TableFooterData}
  //       />
  //     </div>
  //   </React.Fragment>
  // );
  return (
    <React.Fragment>
      <h1>xdfcgbhjkmljnhbgfcxdfcgvbnmknjhgvfcgbhjnmk</h1>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  loading: Selectors.makeSelectLoading(),
  error: Selectors.makeSelectError(),
  time: Selectors.makeSelectTime(),
  chatsOfAccount: Selectors.makeSelectChatsOfAccount(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetChatsOfAccountSuccesAction: () =>
    dispatch(Actions.getChatsOfAccountSuccesAction()),
  dispatchGetAllChatsOfAccountTypeAction: () =>
    dispatch(Actions.getAllChatsOfAccountTypeAction()),
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
)(ChatsOfAccount);
