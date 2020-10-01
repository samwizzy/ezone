import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
  Divider,
} from '@material-ui/core';
import classNames from 'classnames';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import * as Selectors from '../selectors';
import ControlledButtons from './components/ControlledButtons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
  },
  table: {
    margin: 0,
    width: '100% !important',
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
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
        color: theme.palette.secondary.contrastText,
      },
      background: theme.palette.primary.main,
    },
    '& td:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  },
  title: { flexGrow: 1 },
}));

const ChartAccountDetails = props => {
  const classes = useStyles(props);

  const { history, chartOfAccount } = props;

  console.log('Selected chartOfAccount', chartOfAccount);

  if (!chartOfAccount) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <ControlledButtons />
        </Grid>
        <Grid item xs={12}>
          <Paper square>
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
                    {chartOfAccount.accountType &&
                      chartOfAccount.accountType.accountType}
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
                  <TableCell>Description</TableCell>
                  <TableCell>{chartOfAccount.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Transaction Period</TableCell>
                  <TableCell>
                    {moment(chartOfAccount.dateCreated).format('ll')}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Closing Balance</TableCell>
                  <TableCell>
                    {chartOfAccount.accountType &&
                    chartOfAccount.accountType.accountType === 'Bank'
                      ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'NGN',
                      }).format(chartOfAccount.bankBalance)
                      : new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'NGN',
                      }).format(chartOfAccount.openingBalance)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Toolbar>
            <Typography variant="h6">Transactions</Typography>
          </Toolbar>
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.pape}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell component="th">Trs Date</TableCell>
                  <TableCell component="th">Created at</TableCell>
                  <TableCell component="th">Ref no</TableCell>
                  <TableCell component="th">Debit</TableCell>
                  <TableCell component="th">Credit</TableCell>
                  <TableCell component="th">Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    {moment(chartOfAccount.dateCreated).format('ll')}
                  </TableCell>
                  <TableCell>09089</TableCell>
                  <TableCell>$2000</TableCell>
                  <TableCell>$30000</TableCell>
                  <TableCell>$320000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell>Total</TableCell>
                  <TableCell>$2000</TableCell>
                  <TableCell>$30000</TableCell>
                  <TableCell>$320000</TableCell>
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
  chartOfAccount: Selectors.makeSelectGetChartOfAccountById(),
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
