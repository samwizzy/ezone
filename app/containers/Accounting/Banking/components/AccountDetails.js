import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Card,
  CardHeader,
  CardActions,
  Icon,
  IconButton,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
  TableFooter,
  Menu,
  MenuItem,
} from '@material-ui/core';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import AddIcon from '@material-ui/icons/Add';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
  },
  grid: {
    justifyContent: 'space-between',
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    },
  },
  gridMargin: { marginBottom: theme.spacing(2) },
  title: { flexGrow: 1 },
  label: { marginLeft: theme.spacing(1) },
  table: {
    minWidth: 200,
    '& td, & th': {
      border: 0,
    },
    '& td': {
      color: theme.palette.text.secondary,
    },
  },
  datatable: {
    minWidth: 200,
    whiteSpace: 'nowrap',
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
    '& .MuiTableFooter-root': {},
    '& .MuiTableCell-root': {
      fontSize: theme.typography.fontSize,
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  iconPaper: {
    boxShadow: theme.shadows[1],
  },
}));

const AccountDetails = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    history,
    match,
    openAccountTransferDialog,
    backAccount,
    getBankAccountById,
  } = props;
  const { params } = match;
  console.log(params, 'params');

  useEffect(() => {
    // getBankAccountById(params.bankId)
    // return () => { }
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    history.goBack();
  };

  console.log(backAccount, 'backAccount');

  if (!backAccount) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classNames(classes.gridMargin)}>
          <Toolbar className={classes.iconPaper} variant="dense">
            <IconButton onClick={handleBack}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography className={classes.title} />
            <IconButton>
              <Icon>add</Icon>
            </IconButton>
            <IconButton>
              <Icon>person</Icon>
            </IconButton>
            <IconButton>
              <Icon>edit</Icon>
            </IconButton>
            <IconButton>
              <Icon>cloud_download</Icon>
            </IconButton>
          </Toolbar>
        </Grid>
        <Grid item xs={12} className={classNames(classes.gridMargi)}>
          <Paper square>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Account Name:</TableCell>
                  <TableCell>{backAccount.accountName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Account Code:</TableCell>
                  <TableCell>{backAccount.accountCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Account Type:</TableCell>
                  <TableCell>{backAccount.accountType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Bank Name:</TableCell>
                  <TableCell>{backAccount.bankName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Description:</TableCell>
                  <TableCell>{backAccount.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Date Created:</TableCell>
                  <TableCell>
                    {moment(backAccount.dateCreated).format('dddd do-MMM-YYYY')}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Closing Balance:</TableCell>
                  <TableCell>NGN {backAccount.bankBalance}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {backAccount.transfers.length ? (
        <Grid container>
          <Grid item xs={12}>
            <Table className={classes.datatable} aria-label="simple table">
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
                {backAccount.transfers.map((entry, id) => (
                  <TableRow key={id}>
                    <TableCell align="left">
                      {backAccount.accountNumber}
                    </TableCell>
                    <TableCell align="left">{entry.description}</TableCell>
                    <TableCell align="left">{entry.referenceNumber}</TableCell>
                    <TableCell align="left">{entry.transferType}</TableCell>
                    <TableCell align="left">{entry.amount}</TableCell>
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
                      <Typography variant="button">
                        {backAccount.transfers.length > 0 &&
                          backAccount.transfers.reduce(
                            (a, b) => a + Number(b.amount),
                            0,
                          )}
                      </Typography>
                    </Paper>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">
                        {/* 0 NGN {backAccount.entries.reduce((a, b) => a + Number(b.credit), 0)} */}
                      </Typography>
                    </Paper>
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
                      onClick={() => openAccountTransferDialog(backAccount)}
                      color="primary"
                      variant="contained"
                      disabled={!backAccount.status}
                      endIcon={<TrendingFlatIcon />}
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
              <Card square className={classes.paper}>
                <CardHeader title="You haven’t recorded any transactions for this account" />
                <CardActions>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={() => openAccountTransferDialog(backAccount)}
                    color="primary"
                    variant="contained"
                    disabled={!backAccount.status}
                    endIcon={<TrendingFlatIcon />}
                  >
                    Transfer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => openAccountTransferDialog(1)}>
          <Typography>Transfer from another account</Typography>
        </MenuItem>
        <MenuItem onClick={() => openAccountTransferDialog()}>
          <Typography>Transfer to another account</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

AccountDetails.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  backAccount: Selectors.makeSelectBankAccountByIdData(),
  bankTransferByOrgIdData: Selectors.makeSelectBankTransferByOrgIdData(),
  transferByAccountIdData: Selectors.makeSelectTransferByAccountIdData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAccountTransferDialog: data =>
      dispatch(Actions.openAccountTransferDialog(data)),
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
