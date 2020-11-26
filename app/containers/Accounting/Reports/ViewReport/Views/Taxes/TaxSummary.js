import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
// import makeSelectReports from '../../selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import ReportSaga from '../../saga';
// import Table from '../../Components/Table';
// import TopMenu from '../../Components/TopMenu';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import ControlledButtons from '../../Components/BackButton';
import * as Select from '../../../../../App/selectors';
import './style.css';

const TaxSummary = ({ time, user, dispatchCleanUpAction }) => {
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
  useEffect(() => {
    function table_to_array() {
      const myData = document.getElementById('tax-summary').rows;
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
        <div className="taxSummary">
          <table id="tax-summary" ref={tableRef}>
            <thead className="myTableHeader">
              <tr className="throw">
                <th>Description</th>
                <th>Actual</th>
                <th>Projection</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personal Income Tax </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Estimated payment </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Miscellaneous </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Refund </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment Due</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Withholding Tax </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Estimated payment </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Miscellaneous </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Refund</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>payment</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment Due </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Receipt </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Estimated receipts </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Miscellaneous </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Refund </td>
                <td />
                <td />
                <td />
              </tr>{' '}
              <tr>
                <td>Received </td>
                <td />
                <td />
                <td />
              </tr>{' '}
              <tr>
                <td>Receipts Due </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Corporation Tax </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Estimated </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Miscellaneous</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Refund </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment Due </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Sales Tax</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Collections </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payments </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Miscellaneous </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Refund</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Payment Due</td>
                <td />
                <td />
                <td />
              </tr>{' '}
              <tr>
                <td colSpan={4} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>Total Payment </td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Total Receipt</td>
                <td />
                <td />
                <td />
              </tr>
              <tr>
                <td>Net </td>
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
)(TaxSummary);
