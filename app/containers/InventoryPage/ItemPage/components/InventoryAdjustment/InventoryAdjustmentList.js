/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from '../../reducer';
import saga from '../../saga';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import InventoryAdjustmentDialog from './InventoryAdjustmentDialog';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
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
}));

const InventoryAdjustmentList = props => {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    loading,
    history,
    getAllWarehousesAction,
    getAllItemsAction,
    getAllInventoryAdjustmentsAction,
    getAllInventoryAdjusts,
  } = props;

  useEffect(() => {
    getAllItemsAction();
    getAllWarehousesAction();
    getAllInventoryAdjustmentsAction();
  }, []);

  console.log(getAllInventoryAdjusts, 'getAllInventoryAdjusts');
  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: "excluded",
        filter: true
      },
    },
    {
      name: 'Id',
      label: 'S/N',
      options: {
        filter: true,
        customBodyRender: (value, tableMeta) => {

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
      name: 'inventoryAdjustedDate',
      label: 'Adjusted Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => moment(date).format('ll')
      },
    },
    {
      name: 'reason',
      label: 'Reason',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'reasonDescription',
      label: 'Reason Description',
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
      },
    },
    {
      name: 'referenceNumber',
      label: 'Reference Number',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'warehouseName',
      label: 'Warehouse',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'addedBy',
      label: 'Adjusted By',
      options: {
        filter: true,
        sort: false,
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => history.push('/inventory/adjustments/new')}
      >
        New
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      props.history.push('/inventory/adjustments/' + rowData[0])
    },
    elevation: 0
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <MUIDataTable
        className={classes.datatable}
        title="All Inventory Adjustments"
        data={getAllInventoryAdjusts}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

InventoryAdjustmentList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewInventoryAdjustDialogAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
  getAllItemsAction: PropTypes.func,
  getAllInventoryAdjustmentsAction: PropTypes.func,
  getAllInventoryAdjusts: PropTypes.array,
  // openEditEmployeeDialogAction: PropTypes.func,
  // openViewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllInventoryAdjusts: Selectors.makeSelectGetAllInventoryAdjustments(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllInventoryAdjustmentsAction: () =>
      dispatch(Actions.getAllInventoryAdjustments()),
    openNewInventoryAdjustDialogAction: () =>
      dispatch(Actions.openNewInventoryAdjustDialog()),
    getAllWarehousesAction: () => dispatch(Actions.getAllWarehouse()),
    getAllItemsAction: () => dispatch(Actions.getAllItems()),
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
)(InventoryAdjustmentList);
