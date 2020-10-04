import React, { memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  makeStyles,
  IconButton,
  Button,
  Chip,
  Menu,
  MenuItem,
  Grid,
  Tooltip,
} from '@material-ui/core';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MUIDataTable from 'mui-datatables';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green } from '@material-ui/core/colors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& td': { padding: theme.spacing(1, 2) },
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
  },
  status: {
    '&.active': { color: green[500] },
    '&.inactive': { color: theme.status.danger },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BankList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedBankAccount, setSelectedBankAccount] = React.useState(null);

  const {
    loading,
    history,
    match,
    accountSetupData,
    getBankAccountById,
    openNewBankAccountDialog,
    openEditBankAccountDialog,
    openDeleteBankAccountDialog,
    activateDeactivateBankAccount,
    bankAccounts,
  } = props;

  const { currency } = accountSetupData;

  const handleClick = (event, id) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
    setSelectedBankAccount(_.find(bankAccounts, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActivateDeactivateBankAccount = () => {
    const data = {
      id: selectedBankAccount.id,
      status: !selectedBankAccount.status,
    };
    activateDeactivateBankAccount(data);
    setAnchorEl(null);
  };

  const handleView = () => {
    const { id } = selectedBankAccount;
    getBankAccountById(id);
    history.push(`${match.url}/${id}`);
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    openEditBankAccountDialog(selectedBankAccount)
    setAnchorEl(null);
  };

  const handleRoute = id => {
    getBankAccountById(id);
    history.push(`${match.url}/${id}`);
  };

  const orderedBankAccounts = _.orderBy(bankAccounts, 'dateCreated', 'desc')

  if (!bankAccounts.length > 0) {
    return <CircleLoader />
  }

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
      },
    },
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
      name: 'id',
      label: 'Bank Balance',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const bankAccount = bankAccounts.find(account => account.id === value)
          return EzoneUtils.formatCurrency(bankAccount.bankBalance, currency.code)
        }
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: status => {
          return status
            ? <Chip label="Active" variant="outlined" icon={<CheckCircleIcon className={classNames(classes.status, { active: status })} />} />
            : <Chip label="Inactive" variant="outlined" icon={<RadioButtonUncheckedIcon />} />
        },
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={event => handleClick(event, value)}
          >
            <MoreVertIcon />
          </IconButton>
        ),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: 'Sorry, no bank accounts found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="Create New Bank Account">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => openNewBankAccountDialog()}
        >
          Add Bank Account
        </Button>
      </Tooltip>
    ),
    onRowClick: (rowData, rowState) => {
      handleRoute(rowData[0]);
    },
    elevation: 0,
  };

  console.log('account data -> ', bankAccounts);

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Banking"
        data={orderedBankAccounts}
        columns={columns}
        options={options}
      />

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={handleActivateDeactivateBankAccount}
          disabled={selectedBankAccount && selectedBankAccount.status}
        >
          Activate
        </MenuItem>
        <MenuItem
          onClick={handleActivateDeactivateBankAccount}
          disabled={selectedBankAccount && !selectedBankAccount.status}
        >
          Deactivate
        </MenuItem>
        <MenuItem
          onClick={() => openDeleteBankAccountDialog(selectedBankAccount)}
          disabled={
            selectedBankAccount && Boolean(selectedBankAccount.transfers.length)
          }
        >
          Delete
        </MenuItem>
        <MenuItem
          onClick={handleEditClick}
          disabled={
            selectedBankAccount && Boolean(selectedBankAccount.transfers.length)
          }
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleView}>View details</MenuItem>
      </Menu>
    </div>
  );
};

BankList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  bankAccounts: Selectors.makeSelectBankAccountData(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBankAccountById: data => dispatch(Actions.getBankAccountById(data)),
    openNewBankAccountDialog: () => dispatch(Actions.openNewBankAccountDialog()),
    openEditBankAccountDialog: data => dispatch(Actions.openEditBankAccountDialog(data)),
    openDeleteBankAccountDialog: data => dispatch(Actions.openDeleteBankAccountDialog(data)),
    activateDeactivateBankAccount: data => dispatch(Actions.activateDeactivateBankAccount(data)),
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
