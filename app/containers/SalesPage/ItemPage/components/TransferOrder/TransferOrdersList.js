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
import TransferOrderDialog from './TransferOrderDialog';

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

const TransferOrdersList = props => {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });
  const classes = useStyles();
  const [values, setValues] = React.useState({
    transferOrder: '',
    destinationWarehouseUuId: '',
    itemId: '',
    itemSku: '',
    reason: '',
    sourceWareHouseUuid: '',
    transferQuantity: '',
  });

  const handleChange = event => {
    console.log(event.target, "event.target")
    setValues({...values, [event.target.name]: event.target.value });
    console.log('i am handling on change event')
  };

  const {
    loading,
    history,
    transferOrders,
    openNewTransferOrderDialogAction,
    getAllWarehousesAction,
    getAllItemsAction,
    getAllTransferOrderAction,
    getAllTransferOrder,
    // openEditEmployeeDialogAction,
    // openViewEmployeeDialogAction,
  } = props;

  useEffect(() => {
    getAllItemsAction();
    getAllWarehousesAction();
    getAllTransferOrderAction();
  }, []);

  console.log(getAllTransferOrder, 'getAllTransferOrder');
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
      name: 'transferDate',
      label: 'Transfer Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'referenceNumber',
      label: 'Transfer Order ',
      options: {
        filter: true,
        sort: false,
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
      name: '',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transferredQuantity',
      label: 'Quantity Transferred',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'sourceWareHouseUuid',
      label: 'Source WareHouse',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'destinationWarehouseUuid',
      label: 'Destination WareHouse',
      options: {
        filter: true,
        sort: false,
      },
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
        onClick={() => history.push('/inventory/transfer/orders/new')}
      >
        New
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      props.history.push('/inventory/transfer/orders/' + rowData[0])
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
        title="All Transfer Orders"
        data={getAllTransferOrder}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

TransferOrdersList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewTransferOrderDialogAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
  getAllItemsAction: PropTypes.func,
  getAllTransferOrderAction: PropTypes.func,
  getAllTransferOrder: PropTypes.array,
  // openEditEmployeeDialogAction: PropTypes.func,
  // openViewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllTransferOrder: Selectors.makeSelectGetAllTransferOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllTransferOrderAction: () =>
      dispatch(Actions.getAllTransferOrder()),
    openNewTransferOrderDialogAction: () =>
      dispatch(Actions.openNewTransferOrderDialog()),
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
)(TransferOrdersList);
