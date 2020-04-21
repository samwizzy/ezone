import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import TransactionTransferDialog from './TransactionTransferDialog';

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

const AccountDetails = props => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { 
    bankTransferByOrgIdData,
    // editOpenBankAccountDialogAction
    openAccountTransferDialogAction
  } = props;

  console.log('AccountDetails loaded');
  console.log('accountDetailsData --> ', props.location.accountDetailsData);
  console.log('transfer --> ', props.location.accountDetailsData.transfers);
  console.log('bankTransferByOrgIdData from details.js --> ', bankTransferByOrgIdData);

  
  return (
    <div className={classes.root}>
      <TransactionTransferDialog />
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
                        {/* { props.location.accountDetailsData.accountName } */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Account Code</TableCell>
                      <TableCell>
                        {/* { props.location.accountDetailsData.accountCode } */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Account Type</TableCell>
                      <TableCell>
                        {/* { props.location.accountDetailsData.accountType.accountType } */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Description</TableCell>
                      <TableCell>
                        {/* { props.location.accountDetailsData.accountType.description } */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Transaction Period</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                        <TableCell component="th" scope="row">Closing Balance</TableCell>
                        <TableCell>
                          {/* NGN { props.location.accountDetailsData.accountType.openingBalance } */}
                        </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        { props.location.accountDetailsData.transfers.length ? (
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
        ) : (
          <Grid item xs={12}>
            <Grid container className={classes.grid}>
              <Grid item xs={12}>
              <Paper square className={classes.paper}>
                <Typography variant="h6" gutterBottom>You haven’t recorded any transactions for this account</Typography>
                <Button 
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                  color="primary"
                  variant="contained"
                >
                  Add Transactions
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => {
                    openAccountTransferDialogAction(1);
                  }}>
                    Transfer from another account
                  </MenuItem>
                  <MenuItem onClick={() => {
                    openAccountTransferDialogAction();
                  }}>
                    Transfer to another account
                  </MenuItem>
                </Menu>
              </Paper>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

AccountDetails.propTypes = {
  // loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  bankTransferByOrgIdData: Selectors.makeSelectBankTransferByOrgIdData(),
  // bankAccountDialog: Selectors.makeSelectBankAccountDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAccountTransferDialogAction: evt => dispatch(Actions.openAccountTransferDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountDetails);
