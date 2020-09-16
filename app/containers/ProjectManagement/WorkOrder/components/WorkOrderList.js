import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';

import MUIDataTable from 'mui-datatables';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { AddButton } from './AddButton';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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
  }
}));

const WorkOrderList = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [account, setAccount] = React.useState('');

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    console.log("id value is -> ", id);

    const selectedAccount = listOfWorkOrderData && listOfWorkOrderData.find(acc => id === acc.id);
    setAccount(selectedAccount);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    loading,
    openNewWorkOrderDialogAction,
    editOpenWorkOrderDialogAction,
    deleteWorkOrderAction,
    openVendorDialogAction,
    listOfWorkOrderData,
  } = props;


  console.log('listOfWorkOrderData--> ', listOfWorkOrderData);

  const columns = [
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {
          if (value === '') {
            return '';
          }
          return (
            <FormControlLabel
              label={tableMeta.rowIndex + 1}
              control={<Icon />}
            />
          );
        },
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'cost',
      label: 'Cost',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'amountPaid',
      label: 'Amount Paid',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'priority',
      label: 'Priority',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          // const AllCharts = chartOfAccountData && chartOfAccountData.find(post => value === post.id);
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
                  editOpenWorkOrderDialogAction(account);
                }}>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  View Details
                </MenuItem>
                <MenuItem onClick={() => {
                  deleteWorkOrderAction(account);
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
      <AddButton openNewWorkOrderDialogAction={openNewWorkOrderDialogAction} openVendorDialogAction={openVendorDialogAction} />
    ),
    elevation: 0
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <MUIDataTable
        className={classes.datatable}
        title="Work Order"
        data={listOfWorkOrderData}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

WorkOrderList.propTypes = {
  loading: PropTypes.bool,
  listOfWorkOrderData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  workOrderDialog: Selectors.makeSelectWorkOrderDialog(),
  listOfWorkOrderData: Selectors.makeSelectGetListOfWorkOrderData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewWorkOrderDialogAction: () => dispatch(Actions.openCreateWorkOrderDialog()),
    editOpenWorkOrderDialogAction: evt => dispatch(Actions.editOpenWorkOrderDialog(evt)),
    deleteWorkOrderAction: evt => dispatch(Actions.deleteWorkOrderAction(evt)),
    openVendorDialogAction: () => dispatch(Actions.openVendorDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WorkOrderList);
