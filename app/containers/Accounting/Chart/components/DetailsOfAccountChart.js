import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  Tooltip,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import * as Actions from '../actions';
// import * as Selectors from '../selectors';
// import TransactionTransferDialog from './TransactionTransferDialog';

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
        fontSize: theme.typography.fontSize + 2,
        padding: theme.spacing(4, 2),
      },
      '& .MuiTableRow-root': {
        borderRadius: `${theme.shape.borderRadius * 6} !important`  
      }
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
  },
  paper: {
    padding: theme.spacing(10, 0),
    textAlign: 'center'
  }
}));

const DetailsOfAccountChart = props => {
  const classes = useStyles();

  const { 
    history,
  } = props;

  console.log('chartDetailsData --> ', props.location.chartDetailsData);
//   console.log('transfer --> ', props.location.accountDetailsData.transfers);
//   console.log('bankTransferByOrgIdData from details.js --> ', bankTransferByOrgIdData);

const handleBack = () => {
  history.goBack();
}

  return (
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
                      <TableCell>
                        { props.location.chartDetailsData.accountName }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Account Code</TableCell>
                      <TableCell>
                        { props.location.chartDetailsData.accountCode }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Account Type</TableCell>
                      <TableCell>
                        { props.location.chartDetailsData.accountType }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Description</TableCell>
                      <TableCell>
                        { props.location.chartDetailsData.description }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Date Created</TableCell>
                      <TableCell>
                      { props.location.chartDetailsData.dateCreated }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell>
                          <Tooltip title="Go Back">
                            <ArrowBackIcon 
                              onClick={handleBack}
                            />
                          </Tooltip>
                          {/* NGN { props.location.accountDetailsData.accountType.openingBalance } */}
                        </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

DetailsOfAccountChart.propTypes = {
  // loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
//   bankTransferByOrgIdData: Selectors.makeSelectBankTransferByOrgIdData(),
  // bankAccountDialog: Selectors.makeSelectBankAccountDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    // openAccountTransferDialogAction: (evt) => dispatch(Actions.openAccountTransferDialog(evt)),
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
)(DetailsOfAccountChart);
