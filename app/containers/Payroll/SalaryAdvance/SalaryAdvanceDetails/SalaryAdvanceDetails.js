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
import * as PayrollSelectors from '../../selectors';
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

const SalaryAdvanceDetails = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const { payrollSetupData, openAccountTransferToDialog, openAccountTransferFromDialog, salaryAdvance } = props;

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(salaryAdvance, "salaryAdvance")

  if (!salaryAdvance) {
    return <CircleLoader />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <ControlledButtons salaryAdvance={salaryAdvance} />
        </Grid>
        <Grid item xs={12}>
          <Paper square className={classes.paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Account Name:</TableCell>
                  <TableCell>{salaryAdvance.accountName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Account Code:</TableCell>
                  <TableCell>{salaryAdvance.accountCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Account Type:</TableCell>
                  <TableCell>{salaryAdvance.accountType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Bank Name:</TableCell>
                  <TableCell>{salaryAdvance.bankName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Description:</TableCell>
                  <TableCell>{salaryAdvance.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Date Created:</TableCell>
                  <TableCell>
                    {moment(salaryAdvance.dateCreated).format('ll')}
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
                    {EzoneUtils.formatCurrency(salaryAdvance.bankBalance, 'NGN')}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {salaryAdvance.transfers.length
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
                  {salaryAdvance.transfers.map((entry, id) => (
                    <TableRow key={id}>
                      <TableCell>{salaryAdvance.accountNumber}</TableCell>
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
                        {EzoneUtils.formatCurrency(salaryAdvance.transfers.reduce((a, b) => a + Number(b.amount), 0), 'NGN')}
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
                  disabled={!salaryAdvance.status}
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
        <MenuItem onClick={() => { }}>
          <ListItemText primary="Action 1" secondary="subtitle 1" />
        </MenuItem>
        <MenuItem onClick={() => { }}>
          <ListItemText primary="Action 2" secondary="subtitle 2" />
        </MenuItem>
      </Menu>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  salaryAdvance: Selectors.makeSelectSalaryAdvanceByIdData(),
  payrollSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSalaryAdvanceById: data => dispatch(Actions.getSalaryAdvanceById(data)),
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
)(SalaryAdvanceDetails);
