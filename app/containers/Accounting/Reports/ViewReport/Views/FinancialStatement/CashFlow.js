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

const CashFlow = ({ time, user, dispatchCleanUpAction }) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const [tabledata, setTabledata] = useState([]);

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
  useEffect(() => {
    function table_to_array() {
      const myData = document.getElementById('cash-flow').rows;
      const my_liste = [];
      for (var i = 0; i < myData.length; i++) {
        const el = myData[i].children;
        const my_el = [];
        for (var j = 0; j < el.length; j++) {
          my_el.push(el[j].innerText);
        }
        my_liste.push(my_el);
      }
      setTabledata(state => my_liste);
    }
    window.addEventListener('DOMContentLoaded', table_to_array());
    return () => {
      window.removeEventListener('DOMContentLoaded', table_to_array());
    };
  });
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
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate}
        tableData={tabledata}
      />
      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={setDate}
        />
      </div>
      <div className="cashflow">
        <table id="cash-flow" ref={tableRef}>
          <thead className="myTableHeader">
            <tr className="throw">
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="head1" colSpan={2}>
                CASH FLOWS FROM OPERATING ACTIVITIES
              </td>
            </tr>

            <tr>
              <td>Profit/(loss) before Tax </td>
              <td />{' '}
            </tr>
            <tr>
              <td>Depreciation </td>
              <td />{' '}
            </tr>
            <tr>
              <td>Net Cash flows before changes in working capital </td>
              <td />{' '}
            </tr>
            <tr>
              <td>(Increase)/Decrease in Inventories </td>
              <td />{' '}
            </tr>
            <tr>
              <td>(Increase)/Decrease in Trade and Other Receivables</td>
              <td />{' '}
            </tr>
            <tr>
              <td>(Increase)/Decrease in Trade and Other Payables</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Net Cash outflows/Inflows from Operating Activities</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Tax expense</td>
              <td />{' '}
            </tr>
            <tr>
              <td colSpan={3} style={{ height: '30px' }} />
            </tr>
            <tr>
              <td className="head1" colSpan={2}>
                CASH FLOWS FROM INVESTING ACTIVITIES
              </td>
            </tr>
            <tr>
              <td>Acquisition of property, Plant and Equipment </td>
              <td />{' '}
            </tr>
            <tr>
              <td>Disposal of Property, Plant and Equipment </td>
              <td />{' '}
            </tr>
            <tr>
              <td>Capital Work in Progress</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Net Cash Outflow from Investing Activities </td>
              <td />{' '}
            </tr>
            <tr>
              <td colSpan={3} style={{ height: '30px' }} />
            </tr>
            <tr>
              <td className="head1" colSpan={2}>
                CASH FLOWS FINANCIAL ACTIVITIES
              </td>
            </tr>
            <tr>
              <td>Long Term Loan</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Short Term Loan</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Deposit for Shares</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Shares Capital</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Net Cash flows from Financial Activities</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Net increase in Cash and Cash Equivalent</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Cash and Cash Equivalents as at 1st January</td>
              <td />{' '}
            </tr>
            <tr>
              <td>Cash and Cash Equivalents as at 31st December</td>
              <td />{' '}
            </tr>
          </tbody>
        </table>
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
)(CashFlow);
// {display && (
//   <Table
//     ref={tableRef}
//     // data={tableData}
//     // TableHeadData={TableHeadData}
//     // TableFooterData={TableFooterData}
//   />
// )}
