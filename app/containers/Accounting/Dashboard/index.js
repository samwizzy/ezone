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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    border: `1px solid ${theme.palette.grey[100]}`,
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(5)
    }
  },
  table: {
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

const AccountDashBoard = props => {
  const classes = useStyles();
  const {} = props;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container className={classes.grid}>
          <Grid item xs={5}>
                <Typography gutterBottom variant="h6" component="h2">
                    Total Receivables
                </Typography>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" color="textSecondary">
                            Total Unpaid Invoices
                        </Typography>
                        <TableContainer>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan="3" variant="head" component="th">
                                            <Typography variant="h6" component="h2" color="primary">Current</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">10</TableCell>
                                        <TableCell align="left">1 - 10 days</TableCell>
                                        <TableCell align="left">NGN 100.00</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>    
                            
                        </TableContainer>
                    </CardContent>
                    <Divider />

                    <CardActions>
                        <Table className={classes.table}>
                            <TableFooter>
                                <TableRow>
                                    <TableCell align="left" colSpan={2}>
                                        <Typography variant="h6" component="h2" color="textSecondary">Total</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6" component="h2" color="textSecondary">NGN 100000.00</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </CardActions>
                    
                </Card>           
          </Grid>
          <Grid item xs={5}>
           
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

AccountDashBoard.propTypes = {
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
)(AccountDashBoard);
