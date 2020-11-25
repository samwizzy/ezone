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

  const { organisation } = user;
  const { startDate, endDate } = time;
  const [period, setPeriod] = useState({ firstDate: '', lastDate: '' });

  useInjectReducer({ key: 'reports', reducer: viewReportReducer });
  useInjectSaga({ key: 'reports', saga: ReportSaga });

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
  console.log(
    'ggggggggggggggggggggggggggggggggggggggggg',
    incomeStatement,
    incomeStatementRange,
  );
  useEffect(() => {
    dispatchGetIncomeStatementRangeAction({ selectedRange: setDate });
  }, [display]);

  const handleData = () => {
    dispatchGetAllIncomeStatementAction();
    setDisplay(true);
  };
  useEffect(() => {
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
  }, [period]);

  useEffect(() => {
    console.log('===========================================>>>>');
    dispatchGetIncomeStatementRangeAction({ selectedRange: setDate });
  }, [display]);

  return (
    <React.Fragment>
      <ControlledButtons
        componentRef={componentRef}
        print={print}
        setPrint={setPrint}
        tableData={tabledata}
        // printCsc={[columns, data ? { ...data } : '']}
        handleFetch={handleData}
        pdflogo={organisation.logo}
        tableRef={tableRef}
        companyRef={companyRef}
        daterange={setDate}
        dateValue={dateValue}
        // head={[columns]}
        // body={data}
        fromDay="Start Date"
        toDay="End Date"
      />
      <div ref={componentRef}>
        <Company
          ref={companyRef}
          ComLogo={organisation.logo}
          name={`${fileName}`}
          date={setDate}
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
                <td />
              </tr>

              <tr>
                <td>Direct Cost</td>
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

/**
 * <TopMenu
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
 */
