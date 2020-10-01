import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles, IconButton, Button, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import classNames from 'classnames';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MUIDataTable from 'mui-datatables';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { green } from '@material-ui/core/colors';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import ImportControl from './ImportControl';

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
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer',
    },
    '& tbody': {
      '& td': {
        padding: theme.spacing(1, 2),
      },
    },
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
  },
}));

const AccountChart = props => {
  const classes = useStyles(props);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const {
    loading,
    history,
    match,
    openNewAccountDialog,
    openDeleteAccountDialog,
    editOpenAccountDialog,
    chartOfAccounts,
    getChartOfAccountById,
  } = props;

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedAccount(_.find(chartOfAccounts, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    const { id } = selectedAccount;
    getChartOfAccountById(id);
    history.push(`${match.url}/${id}`);
    handleClose();
  };

  const handleEditClick = () => {
    editOpenAccountDialog(selectedAccount);
    handleClose();
  };

  const orderedAccounts = _.orderBy(chartOfAccounts, 'dateCreated', 'desc');

  console.log(orderedAccounts, 'orderedAccounts');

  const fileInput = useRef();

  if (!chartOfAccounts.length > 0) {
    return <CircleLoader />;
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
      name: 'accountCode',
      label: 'Account Code',
      options: {
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
      name: 'accountType.accountType',
      label: 'Account Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'openingBalance',
      label: 'Balance',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => new Intl.NumberFormat("en-US").format(value)
      },
    },
    {
      name: 'type',
      label: 'Debit / Credit',
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
        sort: false,
        customBodyRender: value => {
          return value ? (
            <CheckCircleIcon
              className={classNames(classes.status, { active: value })}
            />
          ) : (
              <CheckCircleOutlineIcon />
            );
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
          <IconButton onClick={event => handleClick(event, value)}>
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
    filter: false,
    viewColumns: false,
    customToolbar: () => (
      <>
        <Tooltip title="Create new account">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            disableElevation
            onClick={openNewAccountDialog}
          >
            New Account
          </Button>
        </Tooltip>
        <ImportControl />
      </>
    ),
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Chart of Accounts"
        data={orderedAccounts}
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
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleView}>View Details</MenuItem>
        <MenuItem onClick={() => openDeleteAccountDialog(selectedAccount)}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

AccountChart.propTypes = {
  loading: PropTypes.bool,
  openNewAccountDialog: PropTypes.func,
  editOpenAccountDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  newAccountDialog: Selectors.makeSelectNewAccountDialog(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialog: () => dispatch(Actions.openNewAccountDialog()),
    openDeleteAccountDialog: data =>
      dispatch(Actions.openDeleteAccountDialog(data)),
    editOpenAccountDialog: data =>
      dispatch(Actions.editOpenAccountDialog(data)),
    getChartOfAccountById: data =>
      dispatch(Actions.getChartOfAccountById(data)),
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
)(AccountChart);
