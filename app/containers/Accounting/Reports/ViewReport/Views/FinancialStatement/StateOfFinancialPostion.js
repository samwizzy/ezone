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

const StatementOfFinancialPostion = ({
  time,
  user,
  financialPosition,
  financialPositionRange,
  dispatchGetAllFinancialPositionAction,
  dispatchGetGeneralJournalTimeAction,
  dispatchCleanUpAction,
  dispatchGetFinancialPositionRangeAction,
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
    dispatchGetAllFinancialPositionAction();
    dispatchGetFinancialPositionRangeAction({ selectedRange: setDate });
    setDisplay(true);
  };

  window.addEventListener(
    'DOMContentLoaded',

    function table_to_array() {
      const myData = document.getElementById('financialTable_data').rows;
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
      const myData = document.getElementById('financialTable_data').rows;
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

  console.log(
    'oooooooooooooooooooooooooo',
    financialPosition,
    financialPositionRange,
  );

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
    const { selectedRange } = financialPositionRange;
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
    nonCurrentAsset,
    currentAsset,
    capitalAndReserves,
    totalEquityAndLiabilities,
    nonCurrentLiabilities,
    currentLiabilities,
  } = financialPosition;

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
        <div className="financialTable">
          <table ref={tableRef} id="financialTable_data">
            <thead className="myTableHeader">
              <tr className="throw">
                <th>DESCRIPTION</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="head1" colSpan={2}>
                  ASSETS
                </td>
              </tr>
              <tr>
                <td className="head2" colSpan={2}>
                  NON-CURRENT ASSETS:
                </td>
              </tr>
              <tr>
                <td>Property, Plant and Equipment </td>
                <td>
                  {nonCurrentAsset && nonCurrentAsset.propertyPlantAndEquipment}{' '}
                </td>
              </tr>
              <tr>
                <td>Capital Work in Progress</td>
                <td>
                  {nonCurrentAsset && nonCurrentAsset.capitalWorkInProgress}
                </td>
              </tr>
              <tr className="head2">
                <td>TOTAL NON-CURRENT ASSETS </td>
                <td>
                  {nonCurrentAsset &&
                    nonCurrentAsset.capitalWorkInProgress +
                      nonCurrentAsset.propertyPlantAndEquipment}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: '30px' }} />
              </tr>
              <tr className="head2">
                <td className="head2">CURRENT ASSETS:</td>
                <td />
              </tr>
              <tr>
                <td>Inventories</td>
                <td>{currentAsset && currentAsset.inventories}</td>
              </tr>
              <tr>
                <td>Trade & Other receivables</td>
                <td>{currentAsset && currentAsset.tradeAndOtherReceivables}</td>
              </tr>
              <tr>
                <td>Cash and cash equivalent</td>
                <td> {currentAsset && currentAsset.cashAndCashEquivalent}</td>
              </tr>
              <tr>
                <td className="head2">TOTAL CURRENT ASSETS </td>
                <td>
                  {' '}
                  {currentAsset &&
                    currentAsset.cashAndCashEquivalent +
                      currentAsset.inventories +
                      currentAsset.tradeAndOtherReceivables}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2">TOTAL ASSETS</td>
                <td>
                  {' '}
                  {currentAsset &&
                    nonCurrentAsset.capitalWorkInProgress +
                      nonCurrentAsset.propertyPlantAndEquipment +
                      currentAsset.cashAndCashEquivalent +
                      currentAsset.inventories +
                      currentAsset.tradeAndOtherReceivables}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2" colSpan={2}>
                  EQUITY AND LIABILITIES
                </td>
              </tr>
              <tr>
                <td className="head2" colSpan={2}>
                  CAPITAL AND RESERVES:
                </td>
              </tr>
              <tr>
                <td>Share Capital</td>
                <td>{capitalAndReserves && capitalAndReserves.shareCapital}</td>
              </tr>
              <tr>
                <td>Revaluation Reserves</td>
                <td>
                  {capitalAndReserves && capitalAndReserves.revaluationReserves}
                  ,
                </td>
              </tr>
              <tr>
                <td>Retained earnings</td>
                <td>
                  {capitalAndReserves && capitalAndReserves.retainedEarnings}
                </td>
              </tr>
              <tr>
                <td className="head2">TOTAL EQUITY</td> <td />
              </tr>
              <tr>
                <td colSpan={2} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2" colSpan={2}>
                  NON-CURRENT LIABILITIES:
                </td>
              </tr>
              <tr>
                <td>Long Term Borrowings</td>
                <td>
                  {nonCurrentLiabilities &&
                    nonCurrentLiabilities.longTermBorrowings}
                </td>
              </tr>
              <tr>
                <td>Deposit for Shares</td>
                <td>
                  {' '}
                  {nonCurrentLiabilities &&
                    nonCurrentLiabilities.depositForShares}
                </td>
              </tr>
              <tr>
                <td className="head2">TOTAL NON-CURRENT LIABILITIES </td>

                <td>
                  {nonCurrentLiabilities &&
                    nonCurrentLiabilities.depositForShares +
                      nonCurrentLiabilities.longTermBorrowings}
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2" colSpan={2}>
                  CURRENT LIABILITIES:
                </td>
              </tr>
              <tr>
                <td>Trade and other payables</td>
                <td>
                  {currentLiabilities &&
                    currentLiabilities.tradeAndOtherPayables}
                </td>
              </tr>
              <tr>
                <td>Short-term Loan</td>
                <td>
                  {currentLiabilities && currentLiabilities.shortTermLoan}
                </td>
              </tr>
              <tr>
                <td>Current tax Payable</td>
                <td>
                  {currentLiabilities && currentLiabilities.currentTaxPayable}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td className="head2">TOTAL CURRENT LIABILITIES:</td>
                <td>
                  {currentLiabilities &&
                    currentLiabilities.currentTaxPayable +
                      currentLiabilities.shortTermLoan +
                      currentLiabilities.tradeAndOtherPayables}
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ height: '30px' }} />
              </tr>
              <tr>
                <td>TOTAL EQUITY AND LIABILITIES:</td>
                <td>
                  {totalEquityAndLiabilities && totalEquityAndLiabilities}
                </td>
              </tr>
              <tr />
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
  financialPosition: Selectors.makeSelectFinancialPosition(),
  financialPositionRange: Selectors.makeSelectFinancialPositionTimeRange(),
});

const mapDispatchToProps = dispatch => ({
  dispatchGetGeneralJournalTimeAction: data =>
    dispatch(Actions.getGeneralJournalTimeAction(data)),
  dispatchGetFinancialPositionRangeAction: data =>
    dispatch(Actions.getFinancialPositionRangeAction(data)),
  dispatchGetAllFinancialPositionAction: () =>
    dispatch(Actions.getAllFinancialPositionAction()),
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
)(StatementOfFinancialPostion);
