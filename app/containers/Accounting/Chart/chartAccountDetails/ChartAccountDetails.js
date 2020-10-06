import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import {
  makeStyles,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  Typography,
  Toolbar,
} from '@material-ui/core';
import moment from 'moment';
import _ from 'lodash';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import ControlledButtons from './components/ControlledButtons'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2, 0),
  },
  toolbar: {
    ...theme.mixins.toolbar,
    border: `1px dotted ${theme.palette.divider}`
  },
  table: {
    width: '100% !important',
    '& thead': {
      '& th': {
        color: theme.palette.secondary.contrastText,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
    '& tfoot': {
      '& td': {
        ...theme.typography.subtitle1,
      },
      '& tr:first-child': {
        background: theme.palette.grey[100],
      },
      '& tr:not(:first-child)': {
        background: theme.palette.primary.main,
        '& td': { color: theme.palette.secondary.contrastText },
      },
    },
    '& td:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const ChartAccountDetails = props => {
  const classes = useStyles(props);
  const { history, accountSetupData, chartOfAccount, accountingPeriods } = props;

  console.log("Selected chartOfAccount", chartOfAccount);
  console.log("chartOfAccount accountingPeriods", accountingPeriods);
  console.log("chartOfAccount accountSetupData", accountSetupData);

  const { currency } = accountSetupData;

  const activePeriod = _.find(accountingPeriods, { activeYear: true, status: true })

  if (!chartOfAccount) {
    return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <ControlledButtons chartOfAccount={chartOfAccount} />
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell>{chartOfAccount.accountName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account Code</TableCell>
                  <TableCell>{chartOfAccount.accountCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Account Type</TableCell>
                  <TableCell>
                    {chartOfAccount.accountType && chartOfAccount.accountType.accountType}
                  </TableCell>
                </TableRow>
                {chartOfAccount.accountType &&
                  chartOfAccount.accountType.accountType === 'Bank' && (
                    <React.Fragment>
                      <TableRow>
                        <TableCell>Bank Name</TableCell>
                        <TableCell>{chartOfAccount.bankName}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Account Number</TableCell>
                        <TableCell>{chartOfAccount.accountNumber}</TableCell>
                      </TableRow>
                    </React.Fragment>
                  )}
                <TableRow>
                  <TableCell>Financial Statement</TableCell>
                  <TableCell>{chartOfAccount.financialStatement}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{chartOfAccount.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction Period</TableCell>
                  <TableCell>
                    {activePeriod && `${moment(activePeriod.startDate).format('ll')} to ${moment(activePeriod.endDate).format('ll')}`}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Opening Balance</TableCell>
                  <TableCell>
                    {chartOfAccount.accountType &&
                      chartOfAccount.accountType.accountType === 'Bank'
                      ? EzoneUtils.formatCurrency(chartOfAccount.bankBalance, currency && currency.code)
                      : EzoneUtils.formatCurrency(chartOfAccount.openingBalance, currency && currency.code)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Closing Balance</TableCell>
                  {chartOfAccount.type === 'CREDIT' ?
                    <TableCell>
                      {chartOfAccount.accountType &&
                        chartOfAccount.accountType.accountType === 'Bank'
                        ? EzoneUtils.formatCurrency(chartOfAccount.bankBalance, currency && currency.code)
                        : EzoneUtils.formatCurrency(chartOfAccount.openingBalance - (chartOfAccount.entries.reduce((curVal, b) => curVal + b.credit, 0) - chartOfAccount.entries.reduce((curVal, b) => curVal + b.debit, 0)), currency && currency.code)}
                    </TableCell>
                    :
                    <TableCell>
                      {chartOfAccount.accountType &&
                        chartOfAccount.accountType.accountType === 'Bank'
                        ? EzoneUtils.formatCurrency(chartOfAccount.bankBalance, currency && currency.code)
                        : EzoneUtils.formatCurrency(chartOfAccount.openingBalance - (chartOfAccount.entries.reduce((curVal, b) => curVal + b.debit, 0) - chartOfAccount.entries.reduce((curVal, b) => curVal + b.credit, 0)), currency && currency.code)}
                    </TableCell>
                  }
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Transactions</Typography>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Transaction Date</TableCell>
                  <TableCell component="th">Created at</TableCell>
                  <TableCell component="th">Description</TableCell>
                  <TableCell component="th">Debit</TableCell>
                  <TableCell component="th">Credit</TableCell>
                  <TableCell component="th">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartOfAccount.entries.map((entry, i) =>
                  <TableRow key={i}>
                    <TableCell>{moment(entry.dateCreated).format('ll')}</TableCell>
                    <TableCell>{moment(entry.dateCreated).format('ll')}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{EzoneUtils.formatCurrency(entry.debit, currency && currency.code)}</TableCell>
                    <TableCell>{EzoneUtils.formatCurrency(entry.credit, currency && currency.code)}</TableCell>
                    <TableCell>{EzoneUtils.formatCurrency(Number(entry.debit) - Number(entry.credit), currency && currency.code)}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell>Total</TableCell>
                  <TableCell>{EzoneUtils.formatCurrency(chartOfAccount.entries.reduce((curVal, b) => curVal + b.debit, 0), currency && currency.code)}</TableCell>
                  <TableCell>{EzoneUtils.formatCurrency(chartOfAccount.entries.reduce((curVal, b) => curVal + b.credit, 0), currency && currency.code)}</TableCell>
                  {chartOfAccount.type === 'CREDIT'
                    ? <TableCell>{EzoneUtils.formatCurrency(chartOfAccount.entries.reduce((curVal, b) => curVal + b.credit, 0) - chartOfAccount.entries.reduce((curVal, b) => curVal + b.debit, 0), currency && currency.code)}</TableCell>
                    : <TableCell>{EzoneUtils.formatCurrency(chartOfAccount.entries.reduce((curVal, b) => curVal + b.debit, 0) - chartOfAccount.entries.reduce((curVal, b) => curVal + b.credit, 0), currency && currency.code)}</TableCell>
                  }
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

ChartAccountDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountingPeriods: Selectors.makeSelectAccountingPeriodsData(),
  chartOfAccount: Selectors.makeSelectGetChartOfAccountById(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChartAccountDetails);
