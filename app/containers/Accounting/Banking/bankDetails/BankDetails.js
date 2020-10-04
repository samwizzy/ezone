import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Card,
  CardContent,
  CardActions,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  TableFooter,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import classNames from 'classnames';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import ControlledButtons from './components/ControlledButtons';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    margin: theme.spacing(2, 0),
  },
  card: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(4),
    '& .MuiCardActions-root': {
      justifyContent: 'center'
    }
  },
  title: { flexGrow: 1 },
  label: { marginLeft: theme.spacing(1) },
  total: {
    display: 'inline-flex',
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    border: `1px dotted ${theme.palette.divider}`
  },
  table: {
    width: '100% !important',
    '& tbody': {
      // '& tr': {
      //   display: 'flex',
      //   overflowX: 'hidden',
      // },
      '& td, & th': {
        border: 0,
      },
      '& td': {
        color: theme.palette.text.secondary,
      },
    },
    '& tfoot': {
      '& td': {
        ...theme.typography.subtitle1,
        color: theme.palette.secondary.contrastText
      },
      background: theme.palette.primary.main,
    },
  },
  datatable: {
    whiteSpace: 'nowrap',
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
    '& td': {
      fontSize: theme.typography.fontSize,
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
  },
}));

const AccountDetails = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const { accountSetupData, accountingPeriods, openAccountTransferToDialog, openAccountTransferFromDialog, bankAccount } = props;

  const { currency } = accountSetupData
  const activePeriod = _.find(accountingPeriods, { activeYear: true, status: true })

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBankTransferTo = () => {
    openAccountTransferToDialog(bankAccount)
    setAnchorEl(null);
  }

  const handleBankTransferFrom = () => {
    openAccountTransferFromDialog(bankAccount)
    setAnchorEl(null);
  }

  console.log(bankAccount, "bankAccount")
  console.log(activePeriod, "activePeriod")
  console.log(accountSetupData, "accountSetupData")

  if (!bankAccount) {
    return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <ControlledButtons bankAccount={bankAccount} />
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Account Name:</TableCell>
                  <TableCell>{bankAccount.accountName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Account Code:</TableCell>
                  <TableCell>{bankAccount.accountCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Account Type:</TableCell>
                  <TableCell>{bankAccount.accountType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Bank Name:</TableCell>
                  <TableCell>{bankAccount.bankName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Description:</TableCell>
                  <TableCell>{bankAccount.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Date Created:</TableCell>
                  <TableCell>
                    {moment(bankAccount.dateCreated).format('ll')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Transaction Period</TableCell>
                  <TableCell>
                    {activePeriod && `${moment(activePeriod.startDate).format('ll')} to ${moment(activePeriod.endDate).format('ll')}`}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Bank Balance</TableCell>
                  <TableCell>
                    {EzoneUtils.formatCurrency(bankAccount.bankBalance, currency && currency.code)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {bankAccount.transfers.length
        ? (
          <Grid container>
            <Grid item xs={12}>
              <Toolbar className={classes.toolbar}>
                <Typography variant="subtitle1" className={classes.title}>Transactions</Typography>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="primary"
                  variant="contained"
                >
                  Add transaction
                </Button>
              </Toolbar>
              <Table className={classes.datatable} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell component="th">Account</TableCell>
                    <TableCell component="th">Description</TableCell>
                    <TableCell component="th">Reference</TableCell>
                    <TableCell component="th">Transfer Type</TableCell>
                    <TableCell component="th">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bankAccount.transfers.map((entry, id) => (
                    <TableRow key={id}>
                      <TableCell>{bankAccount.accountNumber}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.referenceNumber}</TableCell>
                      <TableCell>{entry.transferType}</TableCell>
                      <TableCell>{entry.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell>
                      <div className={classes.total}>
                        {EzoneUtils.formatCurrency(bankAccount.transfers.reduce((a, b) => a + Number(b.amount), 0), currency && currency.code)}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <Table className={classes.table}>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} component="th">
                      <Typography variant="subtitle1">Attachments</Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Grid>
        )
        :
        (
          <Grid item xs={12}>
            <Card square className={classes.card}>
              <CardContent>
                <Typography align="center">You haven’t recorded any transactions for this account</Typography>
              </CardContent>
              <CardActions>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                  color="primary"
                  variant="contained"
                  disabled={!bankAccount.status}
                >
                  Add Transaction
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )}

      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleBankTransferFrom}>
          <ListItemText primary="Transfer from another account" secondary="Money In" />
        </MenuItem>
        <MenuItem onClick={handleBankTransferTo}>
          <ListItemText primary="Transfer to another account" secondary="Money Out" />
        </MenuItem>
      </Menu>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  bankAccount: Selectors.makeSelectBankAccountByIdData(),
  accountingPeriods: Selectors.makeSelectAccountingPeriods(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAccountTransferToDialog: data => dispatch(Actions.openAccountTransferToDialog(data)),
    openAccountTransferFromDialog: data => dispatch(Actions.openAccountTransferFromDialog(data)),
    getBankAccountById: data => dispatch(Actions.getBankAccountById(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AccountDetails);
