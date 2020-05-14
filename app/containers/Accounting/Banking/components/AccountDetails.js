import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  Icon,
  IconButton,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableFooter,
  Menu,
  MenuItem,
} from '@material-ui/core';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import TransactionTransferDialog from './TransactionTransferDialog';
import moment from 'moment';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    }
  },
  gridMargin: { marginBottom: theme.spacing(2) },
  label: { marginLeft: theme.spacing(1) },
  table: {
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.5),
      },
    },
    '& .MuiTableFooter-root': {},
    '& .MuiTableCell-root': {
        fontSize: theme.typography.fontSize + 2,
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightBold
    }
  },
  iconPaper: {
    textAlign: "right"
  }
}));

const AccountDetails = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { 
    history,
    openAccountTransferDialogAction
  } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    history.goBack();
  }

  console.log('accountDetailsData -> ', props.location.accountDetailsData);
  console.log('props.location.accountDetailsData.accountNumber -> ', props.location.accountDetailsData.accountNumber);
  

  return (
    <div className={classes.root}>
      <TransactionTransferDialog />
      <Grid container>
        <Grid item xs={6} className={classNames(classes.gridMargin)}>
          <Paper square className={classes.iconPaper}>
            <div>
              <IconButton
                onClick={handleBack}
              >
                <Icon>person</Icon> Back
              </IconButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} className={classNames(classes.gridMargin)}>
          <Paper square className={classes.iconPaper}>
            <div>
              <IconButton><Icon>add</Icon></IconButton>
              <IconButton><Icon>person</Icon></IconButton>
              <IconButton><Icon>edit</Icon></IconButton>
              <IconButton><Icon>cloud_download</Icon></IconButton>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} className={classNames(classes.gridMargin)}>
          <Paper square>
            <div className={classes.flex}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell component="th">Account Name</TableCell>
                    <TableCell align="left">{ props.location.accountDetailsData.accountName }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Account Code</TableCell>
                    <TableCell align="left">{ props.location.accountDetailsData.accountCode }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Account Type</TableCell>
                    <TableCell align="left">{ props.location.accountDetailsData.accountType }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Bank Name</TableCell>
                    <TableCell align="left">{ props.location.accountDetailsData.bankName }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Description</TableCell>
                    <TableCell align="left">{ props.location.accountDetailsData.description }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Date Created</TableCell>
                    <TableCell align="left">
                      { moment(props.location.accountDetailsData.dateCreated).format('dddd do-MMM-YYYY') }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th">Closing Balance</TableCell>
                    <TableCell align="left">NGN { props.location.accountDetailsData.bankBalance }</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Paper>
        </Grid>
    </Grid>

    { props.location.accountDetailsData.transfers.length ? (
      <Grid container>
      <Grid item xs={12}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th">Account</TableCell>
              <TableCell component="th">Description</TableCell>
              <TableCell component="th">Reference</TableCell>
              <TableCell component="th">Transfer Type</TableCell>
              <TableCell component="th">Amount</TableCell>
              <TableCell component="th" />
            </TableRow>
          </TableHead>
          <TableBody>
          {props.location.accountDetailsData.transfers.map((entry, id) => (
            <TableRow key={id}>
              <TableCell align="left">
                  {props.location.accountDetailsData.accountNumber}
              </TableCell>
              <TableCell align="left">
                {entry.description}
              </TableCell>
              <TableCell align="left">
                {entry.referenceNumber}
              </TableCell>
              <TableCell align="left">
                {entry.transferType}
              </TableCell>
              <TableCell align="left">
                {entry.amount}
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Typography variant="h6">Total</Typography>
              </TableCell>
              <TableCell>
                <Paper elevation={0} square className={classes.paper}>
                  <Typography variant="h6">
                    {/* { props.location.journalDetailsData.transfers.reduce((a, b) => a + Number(b.amount), 0) } */}
                  </Typography>
                </Paper>
              </TableCell>
              <TableCell>
                {/* <Paper elevation={0} square className={classes.paper}>
                  <Typography variant="h6">
                    0 */}
                    {/* NGN { props.location.journalDetailsData.entries.reduce((a, b) => a + Number(b.credit), 0) } */}
                  {/* </Typography> */}
                {/* </Paper> */}
              </TableCell>
              <TableCell />
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
        <Grid item xs={12}>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <Paper square className={classes.paper}>
              <Button 
                aria-controls="simple-menu" 
                aria-haspopup="true" 
                onClick={() => {
                  openAccountTransferDialogAction(props.location.accountDetailsData);
                }}
                color="primary"
                variant="contained"
                disabled={!props.location.accountDetailsData.status}
              >
                Transfer
              </Button>
            </Paper>
          </Grid>
        </Grid>
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
              onClick={() => {
                openAccountTransferDialogAction(props.location.accountDetailsData);
              }}
              color="primary"
              variant="contained"
              disabled={!props.location.accountDetailsData.status}
            >
              Transfer
            </Button>
            {/* <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                openAccountTransferDialogAction(1);
              }}>
                <Typography>
                  Transfer from another account
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                openAccountTransferDialogAction();
              }}>
                <Typography>
                  Transfer to another account
                </Typography>
              </MenuItem>
            </Menu> */}
          </Paper>
          </Grid>
        </Grid>
      </Grid>
    )}
  </div>
)};

AccountDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  //   loading: Selectors.makeSelectLoading(),
  bankTransferByOrgIdData: Selectors.makeSelectBankTransferByOrgIdData(),
  transferByAccountIdData: Selectors.makeSelectTransferByAccountIdData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAccountTransferDialogAction: (evt) => dispatch(Actions.openAccountTransferDialog(evt)),
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
