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
import ControlledButtons from '../../Components/BackButton';
import * as Select from '../../../../../App/selectors';
import './style.css';

const ComprehensiveIncome = ({
  time,
  user,
  incomeStatement,
  incomeStatementRange,
  dispatchGetAllIncomeStatementAction,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  dispatchGetIncomeStatementRangeAction,
}) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();
  const [print, setPrint] = useState(false);
  const [display, setDisplay] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [show, setShow] = useState('');

  const { organisation } = user;
  const { startDate, endDate } = time;
  const [period, setPeriod] = useState({ firstDate: '', lastDate: '' });

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

  const handleData = () => {
    dispatchGetAllIncomeStatementAction();
    dispatchGetIncomeStatementRangeAction({ selectedRange: setDate });
    setDisplay(true);
  };
  window.addEventListener(
    'DOMContentLoaded',

    function table_to_array() {
      const myData = document.getElementById('comprehensive-IncomeStatement')
        .rows;
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
    },
  );
  window.removeEventListener(
    'DOMContentLoaded',

    function table_to_array() {
      const myData = document.getElementById('comprehensive-IncomeStatement')
        .rows;
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
    },
  );

  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    startDate !== ''
      ? `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
          'MMM Do YYYY',
        )}`
      : '';

  const dateValue = ({ target }) => {
    if (target.name === 'Start Date') {
      setPeriod({ ...period, firstDate: target.value.split('-').join('/') });
    }
    if (target.name === 'End Date') {
      setPeriod({ ...period, lastDate: target.value.split('-').join('/') });
    }
  };

  useEffect(() => {
    if (period.lastDate && period.firstDate) {
      dispatchGetGeneralJournalTimeAction({
        startDate: period.firstDate,
        endDate: period.lastDate,
      });
      handleData();
    }
    return async () => await dispatchCleanUpAction();
  }, [period]);

  useEffect(() => {
    const { selectedRange } = incomeStatementRange;
    setShow(selectedRange);
  }, [display, time]);
  const csvPrint = tabledata.slice(1).reduce((accumulator, ele) => {
    let obj = {
      DESCRIPTION: ele[0],
      AMOUNT: ele[1],
    };
    accumulator.push(obj);
    return accumulator;
  }, []);

  const { date, totalRevenueBalance, values } = incomeStatement;

  return (
    <React.Fragment>
      <ControlledButtons
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={csvPrint}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate || show}
        dateValue={dateValue}
        fromDay="Start Date"
        toDay="End Date"
      />
      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={setDate || show}
        />
        <div className="comprehensiveIncomeStatement">
          <table id="comprehensive-IncomeStatement" ref={tableRef}>
            <thead className="myTableHeader">
              <tr className="throw">
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Revenue </td>
                <td>{values && totalRevenueBalance}</td>
              </tr>

              <tr>
                <td>Direct Cost</td>
                <td />
              </tr>
              <tr>
                <td>Gross Profit</td>
                <td>{values && values.grossProfit}</td>
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
                <td>{values && values.operatingProfitAndLoss}</td>
              </tr>
              <tr>
                <td>Finance cost</td>
                <td />
              </tr>
              <tr>
                <td>Profit/(Loss) before tax</td>
                <td>{values && values.profitAndLossBeforeTax}</td>
              </tr>
              <tr>
                <td>Tax expense</td>
                <td />
              </tr>
              <tr>
                <td>Net Income for the Financial Year</td>
                <td>{values && values.netIncomeForTheFinancialYear}</td>
              </tr>
              <tr>
                <td>Other Comprehensive Income</td>
                <td />
              </tr>
              <tr>
                <td>Total Comprehensive Income</td>
                <td>{values && values.totalComprehensiveIncome}</td>
              </tr>
              <tr>
                <td>EPS(Kobo)</td>
                <td>{values && values.epsInKobo}</td>
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
  incomeStatement: Selectors.makeSelectIncomeStatement(),
  incomeStatementRange: Selectors.makeSelectIncomeStatementTimeRange(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatchGetIncomeStatementRangeAction: data =>
    dispatch(Actions.getIncomeStatementRangeAction(data)),
  dispatchGetAllIncomeStatementAction: () =>
    dispatch(Actions.getAllIncomeStatementAction()),
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
