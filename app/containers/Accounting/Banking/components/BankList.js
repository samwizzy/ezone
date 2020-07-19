import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
  Grid,
  Tooltip
} from '@material-ui/core';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { green, red } from '@material-ui/core/colors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AddBankAccountDialog from './AddBankAccountDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  }, 
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
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
  },
  status: {
    '&.active': {color: green[500]},
    '&.inactive': {color: theme.status.danger},
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BankList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');

  const {
    loading,
    history,
		openNewBankAccountDialogAction,
    editOpenBankAccountDialogAction,
    openDeleteBankAccountDialogAction,
    openActivateBankAccountDialogAction,
    deactivateBankAccountDialogOpenAction,
    bankAccountData,
  } = props;

  const handleClick = (event, id) => {
    console.log("account id -> ", id);
    setAnchorEl(event.currentTarget);
    const selectedAccount = bankAccountData && bankAccountData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const columns = [
    {
      name: 'accountName',
      label: 'Account Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountCode',
      label: 'Account Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'bankName',
      label: 'Bank Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
			name: 'bankBalance',
			label: 'Bank Balance',
			options: {
				filter: true,
				sort: false,
			},
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: status => (
          <span className={classNames(classes.status, {'active': status})}>{status ? 'Active' : 'Inactive'}</span>
        ),
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={event => handleClick(event, value)}
              >
                Options
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => openActivateBankAccountDialogAction(account) }
                  disabled={account.status}
                >
                  Activate
                </MenuItem>
                <MenuItem onClick={() => deactivateBankAccountDialogOpenAction(account) }
                  disabled={!account.status}
                >
                  Deactivate
                </MenuItem>
                <MenuItem onClick={() => openDeleteBankAccountDialogAction(account) }
                  disabled={account && account.transfers.length}
                >
                  Delete
                </MenuItem>
                <MenuItem onClick={() => editOpenBankAccountDialogAction(account) }
                  disabled={account && account.transfers.length}
                >
                  Edit
                </MenuItem>
                <MenuItem onClick={() => {
                  history.push({
                    pathname: '/account/banking/details',
                    accountDetailsData: account,
                  });
                }}>
                  View Details
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Tooltip title="Create New Account">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => openNewBankAccountDialogAction()}
        >
          Add Bank Account
        </Button>
      </Tooltip>
    ),
    elevation: 0
  };

  console.log('account data -> ', bankAccountData);

  return (
    
    (
    <React.Fragment>
      <AddBankAccountDialog />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              title="Banking"
              data={bankAccountData}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  )
  );
};

BankList.propTypes = {
//   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  bankAccountData: Selectors.makeSelectBankAccountData()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewBankAccountDialogAction: () => dispatch(Actions.openNewBankAccountDialog()),
    editOpenBankAccountDialogAction: evt => dispatch(Actions.editOpenBankAccountDialog(evt)),
    openDeleteBankAccountDialogAction: evt => dispatch(Actions.openDeleteBankAccountDialog(evt)),
    openActivateBankAccountDialogAction: evt => dispatch(Actions.openActivateBankAccountDialog(evt)),
    deactivateBankAccountDialogOpenAction: evt => dispatch(Actions.deactivateBankAccountDialogOpen(evt)),
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
)(BankList);
