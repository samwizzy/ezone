import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import viewReportReducer from '../../reducers';
import ReportSaga from '../../saga';
import Company from '../../Components/CompanyLogo';
import formatDate from '../../Helpers';
import ControlledButtons from '../../Components/BackButton';
import * as Select from '../../../../../App/selectors';
import './style.css';

const CashFlow = ({
  time,
  user,
  cashFlow,
  cashFlowRange,
  dispatchGetAllCashFlowAction,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  dispatchGetCashFlowRangeAction,
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
    dispatchGetAllCashFlowAction();
    dispatchGetCashFlowRangeAction({ selectedRange: setDate });
    setDisplay(true);
  };

  window.addEventListener(
    'DOMContentLoaded',

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
    },
  );
  window.removeEventListener(
    'DOMContentLoaded',

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
    const { selectedRange } = cashFlowRange;
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

  const {
    taxExpense,
    cashFlowsFromOperatingActivities,
    cashFlowsFromInvestingActivities,
    cashAndCashEquivalents,
  } = cashFlow;

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
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.profitAndLossBeforeTax}{' '}
                </td>
              </tr>
              <tr>
                <td>Depreciation </td>
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.depreciation}{' '}
                </td>
              </tr>
              <tr>
                <td>Net Cash flows before changes in working capital </td>
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.netCashFlowsBeforeChangesInWorkingCapital}{' '}
                </td>
              </tr>
              <tr>
                <td>(Increase)/Decrease in Inventories </td>
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.increaseAndDecreaseInInventories}{' '}
                </td>
              </tr>
              <tr>
                <td>(Increase)/Decrease in Trade and Other Receivables</td>
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.increaseAndDecreaseInTradeAndOtherReceivables}{' '}
                </td>
              </tr>
              <tr>
                <td>(Increase)/Decrease in Trade and Other Payables</td>
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.increaseAndDecreaseInTradeAndOtherPayables}{' '}
                </td>
              </tr>
              <tr>
                <td>Net Cash outflows/Inflows from Operating Activities</td>
                <td>
                  {cashFlowsFromOperatingActivities &&
                    cashFlowsFromOperatingActivities.netCashOutFlowsAndInFlowsFromOperatingActivities}{' '}
                </td>
              </tr>
              <tr>
                <td>Tax expense</td>
                <td> {taxExpense} </td>
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
                <td>
                  {' '}
                  {cashFlowsFromInvestingActivities &&
                    cashFlowsFromInvestingActivities.acquisitionOfPropertyPlantAndEquipment}{' '}
                </td>
              </tr>
              <tr>
                <td>Disposal of Property, Plant and Equipment </td>
                {cashFlowsFromInvestingActivities &&
                  cashFlowsFromInvestingActivities.disposalOfPropertyPlantAndEquipment}
              </tr>
              <tr>
                <td>Capital Work in Progress</td>
                {cashFlowsFromInvestingActivities &&
                  cashFlowsFromInvestingActivities.capitalWorkInProgress}
              </tr>
              <tr>
                <td>Net Cash Outflow from Investing Activities </td>
                {cashFlowsFromInvestingActivities &&
                  cashFlowsFromInvestingActivities.netCashOutFlowsFromInvestingActivities}
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
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  time: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  cashFlow: Selectors.makeSelectCashFlow(),
  cashFlowRange: Selectors.makeSelectCashFlowTimeRange(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatchGetCashFlowRangeAction: data =>
    dispatch(Actions.getCashFlowRangeAction(data)),
  dispatchGetAllCashFlowAction: () => dispatch(Actions.getAllCashFlowAction()),
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
