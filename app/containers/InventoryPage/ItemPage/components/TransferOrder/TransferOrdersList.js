/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
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
import ModuleLayout from '../../../components/ModuleLayout';
import TransferOrderDialog from './TransferOrderDialog';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const TransferOrdersList = props => {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [transferOrdersState, setTransferOrdersState] = React.useState([]);
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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formModel = {
    transferOrder: <input type='text' name="transferOrder" value={values.transferOrder} onChange={handleChange} />, 
    destinationWarehouseUuId: <input type='text' name="destinationWarehouseUuId" value={values.destinationWarehouseUuId}  onChange={handleChange} />, 
    itemId: <input type='text' name="itemId" value={values.itemId}  onChange={handleChange} />,
    itemSku: <input type='text' name="itemSku" value={values.itemSku}  onChange={handleChange} />,
    reason: <input type='text' name="reason" value={values.reason}  onChange={handleChange} />,
    sourceWareHouseUuid: <input type='text' name="sourceWareHouseUuid" value={values.sourceWareHouseUuid}  onChange={handleChange} />,
    transferQuantity: <input type='text' name="transferQuantity" value={values.transferQuantity}  onChange={handleChange} />,
  }

  const {
    loading,
    transferOrders,
    openNewTransferOrderDialogAction,
    getAllWarehousesAction,
    // openEditEmployeeDialogAction,
    // openViewEmployeeDialogAction,
  } = props;

  useEffect(() => {
    getAllWarehousesAction();
    console.log("I have get updated after addition")
  }, [transferOrders]);

  const handleNewRow = () => {
    if(transferOrders){ transferOrders.unshift(formModel) }
    setTransferOrdersState([...transferOrdersState, formModel])
    console.log('Adding Form Model..')
  }

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
      name: 'transferOrder',
      label: 'Transfer Order',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'destinationWarehouseUuId',
      label: 'Warehouse Destination ',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'itemId',
      label: 'Item Id',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'itemSku',
      label: 'Item Sku',
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
      name: 'sourceWareHouseUuid',
      label: 'WareHouse Source',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'transferQuantity',
      label: 'Transfer Quantity',
      options: {
        filter: true,
        sort: false,
      },
    },
    // {
    //   name: 'id',
    //   label: '',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: value => {
    //       const Post = datas.find(post => value === post.id);
    //       if (value === '') {
    //         return '';
    //       }
    //       return (
    //         <div>
    //           <Button
    //             aria-controls="simple-menu"
    //             aria-haspopup="true"
    //             onClick={handleClick}
    //           >
    //             Options
    //           </Button>
    //           <Menu
    //             id="simple-menu"
    //             anchorEl={anchorEl}
    //             keepMounted
    //             open={Boolean(anchorEl)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem onClick={handleClose}>Assign Role</MenuItem>
    //             <MenuItem onClick={handleClose}>Assign Apps</MenuItem>
    //             <MenuItem onClick={() => openEditEmployeeDialogAction(Post)}>
    //               Edit
    //             </MenuItem>
    //             <MenuItem onClick={() => openViewEmployeeDialogAction(Post)}>
    //               View Details
    //             </MenuItem>
    //             <MenuItem onClick={handleClose}>Deactivate</MenuItem>
    //           </Menu>
    //         </div>
    //       );
    //     },
    //   },
    // },
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
        // onClick={() => openNewTransferOrderDialogAction()}
        onClick={handleNewRow}
      >
        New
      </Button>
    ),
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <ModuleLayout>
        <MUIDataTable
          title="All Transfer Orders"
          data={transferOrders}
          columns={columns}
          options={options}
        />
      </ModuleLayout>
      <TransferOrderDialog />
    </React.Fragment>
  );
};

TransferOrdersList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewTransferOrderDialogAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
  // openEditEmployeeDialogAction: PropTypes.func,
  // openViewEmployeeDialogAction: PropTypes.func,
  getAllUsersAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  transferOrders: Selectors.makeSelectTransferOrders(),
  // getAllEmployees: UtilitySelectors.makeSelectAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getAllUsersAction: () =>
    //   dispatch(Actions.get()),
    openNewTransferOrderDialogAction: () =>
      dispatch(Actions.openNewTransferOrderDialog()),
    getAllWarehousesAction: () => dispatch(Actions.getAllWarehouse()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TransferOrdersList);
