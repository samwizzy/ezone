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
// import formatDate from '../../Helpers';
import moment from 'moment';

import * as Select from '../../../../../App/selectors';

const BudgetVsReport = ({ time, user, dispatchCleanUpAction }) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const { organisation } = user;
  const { startDate, endDate } = time;
  // dispatchGetGeneralLedgerTimeAction
  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const handleData = () => {
    // dispatchGetAllGeneralLedgerTypeAction();
    // console.log('=============================================>');
    setDisplay(true);
  };
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

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        // tableData={tableData}
        // search={dispatchGetGeneralLedgerTimeAction}
        handleFetch={handleData}
      />
      <div ref={componentRef}>
        <Company
          ComLogo={organisation.logo}
          name="Budget Vs Report"
          date={
            display &&
            `${moment(startDate).format('MMM Do YYYY')} - ${moment(
              endDate,
            ).format('MMM Do YYYY')}`
          }
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectTime(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  dispatchCleanUpAction: () => dispatch(Actions.cleanUpGeneralJournalAction()),
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BudgetVsReport);
// {display && (
//   <Table
//     ref={tableRef}
//     // data={tableData}
//     // TableHeadData={TableHeadData}
//     // TableFooterData={TableFooterData}
//   />
// )}
