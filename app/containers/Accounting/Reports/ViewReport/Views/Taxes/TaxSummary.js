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

const TaxSummary = ({ date, user, getTaxSummary }) => {
  const componentRef = useRef();
  const tableRef = useRef();

  const { organisation } = user;

  useEffect(() => {}, []);

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
          <Company logo={organisation.logo} name="Tax Summary" date={date} />

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
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  date: Selectors.makeSelectDate(),
  user: Select.makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  getTaxSummary: () => dispatch(() => {}),
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
