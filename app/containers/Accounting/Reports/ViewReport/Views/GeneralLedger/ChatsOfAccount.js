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

const ChatsOfAccount = ({
  time,
  user,
  dispatchCleanUpAction,
  chatsOfAccount,
  dispatchGetAllChatsOfAccountTypeAction,
}) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);

  const { organisation } = user;
  const { startDate, endDate } = time;
  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const handleData = () => {
    dispatchGetAllChatsOfAccountTypeAction();
    setDisplay(true);
  };

  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const TableHeadData = [
    'Account Code',
    'Account Name',
    'Account Type',
    'Debit / Credit',
    'Status',
  ];
  const tableData = chatsOfAccount.map(account => ({
    'Account Code': account.accountCode,
    'Account Name': account.accountName,
    'Account Type': account.accountType && account.accountType.accountType,
    'Debit / Credit': '',
    Status: account.status,
  }));

  console.log('ggggggggggggggggggggggg', chatsOfAccount);

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tableData}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        singleDate={true}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={display && `As at ${moment(endDate).format('MMM Do YYYY')}`}
      />
      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={display && `As at ${moment(endDate).format('MMM Do YYYY')}`}
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
