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

const ComprehensiveIncome = ({ time, user, dispatchCleanUpAction }) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
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
  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;
  console.log('=============================================>', setDate);

  return (
    <React.Fragment>
      <TopMenu
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
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
        <div className="comprehensiveIncomeStatement">
          <table className="table_id" ref={tableRef}>
            <thead className="myTableHeader">
              <tr className="throw">
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Income Revenue </td>
                <td />
              </tr>
              <tr>
                <td colspan={'3'} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Cost of Goods Sold</td>
                <td />
              </tr>
              <tr>
                <td>Gross Profit</td>
                <td />
              </tr>

              <tr>
                <td>Other Operating Income</td>
                <td />
              </tr>
              <tr>
                <td>Other Operating expenses</td>
                <td />
              </tr>
              <tr>
                <td>Operating Profit/(Loss)</td>
                <td />
              </tr>
              <tr>
                <td>Finance cost</td>
                <td />
              </tr>
              <tr>
                <td>Profit/(Loss) before tax</td>
                <td />
              </tr>
              <tr>
                <td>Tax expense</td>
                <td />
              </tr>
              <tr>
                <td>Net Income for the Financial Year</td>
                <td />
              </tr>
              <tr>
                <td>Other Comprehensive Income</td>
                <td />
              </tr>
              <tr>
                <td>Total Comprehensive Income</td>
                <td />
              </tr>
              <tr>
                <td>EPS(Kobo)</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
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
)(ComprehensiveIncome);

// {display && (
//   <Table
//     ref={tableRef}
//     // data={tableData}
//     // TableHeadData={TableHeadData}
//     // TableFooterData={TableFooterData}
//   />
// )}
