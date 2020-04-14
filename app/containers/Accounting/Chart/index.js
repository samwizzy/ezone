import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Box,
  Button,
  Card, CardContent, CardActions,
  Divider,
  List,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import SendIcon from '@material-ui/icons/Send';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from './../../App/selectors';
import moment from 'moment'
import ModuleLayout from './../components/ModuleLayout'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: "space-between",
    borderBottom: `1px solid ${theme.palette.divider}`,
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(3, 2),
    }
  },
  table: {
    "& .MuiTableFooter-root": {
        fontSize: theme.typography.fontSize + 2,
        color: theme.palette.common.white,
        borderTop: `1px solid ${theme.palette.grey[400]} !important`,
        backgroundColor: theme.palette.primary.main,
        '& .MuiTableCell-root': {
          color: theme.palette.common.white,
          fontSize: theme.typography.fontSize + 2
        },
    },
    "& th.MuiTableCell-root": {
        borderBottom: "none !important",
        fontSize: theme.typography.fontSize + 2,
        fontWeight: theme.typography.fontWeightBold //fontWeightMedium
    },
    "& .MuiTableCell-root": {
        borderBottom: "none !important"
    },
    '& .MuiTableCell-body': {
        border: 0,
        color: theme.palette.text.secondary,
        fontSize: theme.typography.fontSize + 2
    },
  }
}));

const AccountDetails = props => {
    const classes = useStyles();
    const {} = props;

    return (
        <ModuleLayout>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container className={classes.grid}>
                            <Grid item xs={12}>
                              <Paper>
                                <Table className={classes.table}>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Account Name</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Sale Account</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Account Type</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Description</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Transaction Period</TableCell>
                                      <TableCell></TableCell>
                                    </TableRow>
                                  </TableBody>
                                  <TableFooter>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Closing Balance</TableCell>
                                      <TableCell>NGN 200,000.00</TableCell>
                                    </TableRow>
                                  </TableFooter>
                                </Table>
                              </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container className={classes.grid}>
                            <Grid item xs={12}>
                              <Paper>
                              <Table className={classes.table}>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell component="th" scope="row">Trs Date</TableCell>
                                      <TableCell>Created At</TableCell>
                                      <TableCell>Trs no.</TableCell>
                                      <TableCell>Debit</TableCell>
                                      <TableCell>Credit</TableCell>
                                      <TableCell>Balance</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>3rd, June, 2019</TableCell>
                                      <TableCell>3rd, June, 2019</TableCell>
                                      <TableCell>09089</TableCell>
                                      <TableCell>$1200</TableCell>
                                      <TableCell>$1200</TableCell>
                                      <TableCell>$1200</TableCell>
                                    </TableRow>
                                  </TableBody>
                                  <TableFooter>
                                    <TableRow>
                                      <TableCell colSpan={3}></TableCell>
                                      <TableCell>NGN 200,000.00</TableCell>
                                      <TableCell>NGN 200,000.00</TableCell>
                                      <TableCell>NGN 200,000.00</TableCell>
                                    </TableRow>
                                  </TableFooter>
                                </Table>
                              </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </ModuleLayout>
    );
};

AccountDetails.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
)(AccountDetails);
