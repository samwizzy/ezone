import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Grid,
  Tooltip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import NewAccountDialog from './NewAccountDialog';
import ConfirmDeleteAccountDialog from './ConfirmDeleteAccountDialog';
// import LoadingIndicator from '../../../../components/LoadingIndicator';

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
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AccountChart = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');

  const {
    loading,
    history,
    openNewAccountDialogAction,
    openDeleteAccountDialogAction,
    editOpenAccountDialogAction,
    deleteChartOfAccountAction,
    chartOfAccountData,
  } = props;

  const handleClick = (event, id) => {
    console.log("id value --> ", id);
    setAnchorEl(event.currentTarget);
    const selectedAccount = chartOfAccountData && chartOfAccountData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
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
      name: 'accountType',
      label: 'Account Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Account Description',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: '.',
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
                <MenuItem onClick={() => {
                  editOpenAccountDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => {
                  history.push({
                    pathname: '/account/chart/details',
                    chartDetailsData: account,
                  });
                }}>
                  View Details
                </MenuItem>
                <MenuItem onClick={() => {
                  openDeleteAccountDialogAction(account);
                }}>
                  Delete 
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
      <Tooltip title="Create New Chart">
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={() => openNewAccountDialogAction()}
        >
          New Account
        </Button>
      </Tooltip>
    ),
  };

  return (
    <React.Fragment>
      <NewAccountDialog />
      <ConfirmDeleteAccountDialog />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              title="Account Charts"
              data={chartOfAccountData}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

AccountChart.propTypes = {
  // loading: PropTypes.bool,
  openNewAccountDialogAction: PropTypes.func,
  editOpenAccountDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  newAccountDialog: Selectors.makeSelectNewAccountDialog(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    openDeleteAccountDialogAction: evt => dispatch(Actions.openDeleteAccountDialog(evt)),
    editOpenAccountDialogAction: evt => dispatch(Actions.editOpenAccountDialog(evt)),
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
