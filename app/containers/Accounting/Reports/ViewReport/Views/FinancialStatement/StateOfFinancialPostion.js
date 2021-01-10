import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import { makeStyles, Grid } from '@material-ui/core';
import Company from '../../Components/CompanyLogo';
import ControlledButtons from '../../Components/BackButton';
import * as Select from '../../../../../App/selectors';

const StatementOfFinancialPostion = ({
  date,
  user,
  financialPosition,
  getFinancialPosition,
}) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();

  const { organisation } = user;

  useEffect(() => {
    if (date.lastDate && date.firstDate) {
      getFinancialPosition(date);
    }
  }, [date]);

  useEffect(() => {
    return () => {};
  }, []);

  // const csvPrint = tabledata.slice(1).reduce((accumulator, ele) => {
  //   let obj = {
  //     DESCRIPTION: ele[0],
  //     AMOUNT: ele[1],
  //   };
  //   accumulator.push(obj);
  //   return accumulator;
  // }, []);

  const {
    nonCurrentAsset,
    currentAsset,
    capitalAndReserves,
    totalEquityAndLiabilities,
    nonCurrentLiabilities,
    currentLiabilities,
  } = financialPosition;

  const columns = [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={[]}
          printCsc={[columns, [] ? { ...[] } : '']}
          date={date}
          pdflogo={organisation.logo}
          daterange={`${date.startDate} — ${date.endDate}`}
          tableRef={tableRef}
          head={[columns]}
          body={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <div ref={componentRef}>
          <Company
            logo={organisation.logo}
            name="State of Financial Position"
            date={date}
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
                    {nonCurrentAsset &&
                      nonCurrentAsset.propertyPlantAndEquipment}{' '}
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
                  <td>
                    {currentAsset && currentAsset.tradeAndOtherReceivables}
                  </td>
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
                  <td>
                    {capitalAndReserves && capitalAndReserves.shareCapital}
                  </td>
                </tr>
                <tr>
                  <td>Revaluation Reserves</td>
                  <td>
                    {capitalAndReserves &&
                      capitalAndReserves.revaluationReserves}
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
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  financialPosition: Selectors.makeSelectFinancialPosition(),
});

const mapDispatchToProps = dispatch => ({
  getFinancialPosition: () => dispatch(Actions.getFinancialPosition()),
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
