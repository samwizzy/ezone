import React, { useRef, memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import MUIDataTable from 'mui-datatables';
import { makeStyles, Grid } from '@material-ui/core';
import Company from '../../Components/CompanyLogo';
import ControlledButtons from '../../Components/BackButton';
import * as Select from '../../../../../App/selectors';

const ComprehensiveIncome = ({ date, user, incomeStatement }) => {
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

  const columns = [];

  const { totalRevenueBalance, values } = incomeStatement;

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
            ref={companyRef}
            logo={organisation.logo}
            name="Comprehensive Income"
            date={date}
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
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
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
