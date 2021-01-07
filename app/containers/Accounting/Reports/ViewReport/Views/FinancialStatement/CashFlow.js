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

const CashFlow = ({ date, user, cashFlow, getCashFlow }) => {
  const componentRef = useRef();
  const tableRef = useRef();
  const companyRef = useRef();

  const { organisation } = user;

  // const csvPrint = tabledata.slice(1).reduce((accumulator, ele) => {
  //   let obj = {
  //     DESCRIPTION: ele[0],
  //     AMOUNT: ele[1],
  //   };
  //   accumulator.push(obj);
  //   return accumulator;
  // }, []);

  const {
    taxExpense,
    cashFlowsFromOperatingActivities,
    cashFlowsFromInvestingActivities,
    cashAndCashEquivalents,
  } = cashFlow;

  const columns = [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <ControlledButtons
          tableData={[]}
          printCsc={[columns, [] ? { ...[] } : '']}
          pdflogo={organisation.logo}
          tableRef={tableRef}
          daterange={`${date.startDate} — ${date.endDate}`}
          date={date}
          head={[columns]}
          body={[]}
        />
      </Grid>
      <Grid item xs={12}>
        <div ref={componentRef}>
          <Company
            ref={companyRef}
            logo={organisation.logo}
            name="Cash Flow"
            date={date}
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
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
  cashFlow: Selectors.makeSelectCashFlow(),
});

const mapDispatchToProps = dispatch => ({
  getCashFlow: () => dispatch(Actions.getCashFlow()),
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
