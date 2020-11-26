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

const BankReconciliation = ({ time, user, dispatchCleanUpAction }) => {
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

  useEffect(() => {
    return async () => await dispatchCleanUpAction();
  }, []);

  const handleData = () => {
    setDisplay(true);
  };
  const Location = useLocation();
  const fileName = Location.pathname.split('/')[3];

  const setDate =
    display &&
    `${moment(startDate).format('MMM Do YYYY')} - ${moment(endDate).format(
      'MMM Do YYYY',
    )}`;
  window.addEventListener(
    'DOMContentLoaded',

    function table_to_array() {
      const myData = document.getElementById('bank-reconcilliation').rows;
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
      const myData = document.getElementById('bank-reconcilliation').rows;
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

  const dateValue = ({ target }) => {
    if (target.name === 'Start Date') {
      setPeriod({ ...period, firstDate: target.value.split('-').join('/') });
    }
    if (target.name === 'End Date') {
      setPeriod({ ...period, lastDate: target.value.split('-').join('/') });
    }
  };

  const csvPrint = tabledata.slice(1).reduce((accumulator, ele) => {
    let obj = {
      Description: ele[0],
      Actual: ele[1],
      Projections: ele[2],
      Difference: ele[3],
    };
    accumulator.push(obj);
    return accumulator;
  }, []);

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
        daterange={setDate}
        dateValue={dateValue}
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
        <div className="bankreconcilliation">
          <table id="bank-reconcilliation" ref={tableRef}>
            <thead className="myTableHeader">
              <tr className="throw">
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ending GL Balance </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Ending Bank Balance </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Add back deposits in transit </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>{' '}
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Total deposits in transit </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>(Less) outstanding checks </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>{' '}
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Total outstanding checks </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Add (Less) other </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>{' '}
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Total other </td>
                <td />
                <td />
                <td />
              </tr>{' '}
              <tr>
                <td>Unreconciled difference </td>
                <td />
                <td />
                <td />
              </tr>{' '}
              <tr>
                <td>Ending GL Balance </td>
                <td />
                <td />
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
)(BankReconciliation);
