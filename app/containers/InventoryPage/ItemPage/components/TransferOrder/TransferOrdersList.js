/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {
  makeStyles,
  FormControlLabel,
  Icon,
  Button
} from '@material-ui/core';
import moment from 'moment';
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

  const {
    loading,
    history,
    transferOrders,
    openNewTransferOrderDialog,
    getTransferOrderById,
    getAllWarehouse,
    getAllItems,
    getAllTransferOrder,
  } = props;

  useEffect(() => {
    getAllItems();
    getAllWarehouse();
    getAllTransferOrder();
  }, []);

  console.log(transferOrders, 'transferOrders');
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
      name: 'transferDate',
      label: 'Transfer Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => moment(date).format('ll')
      },
    },
    {
      name: 'items',
      label: 'No of Items',
      options: {
        filter: true,
        sort: false,
        customBodyRender: items => items.length
      },
    },
    {
      name: 'referenceNumber',
      label: 'Ref No',
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
      name: 'status',
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
      name: 'sourceWarehouse',
      label: 'Source WareHouse',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'destinationWarehouse',
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
        onClick={() => history.push('/inventory/transfers/create/new')}
      >
        New
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      getTransferOrderById(rowData[0])
      props.history.push('/inventory/transfer/' + rowData[0])
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
        data={transferOrders}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

TransferOrdersList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewTransferOrderDialog: PropTypes.func,
  getAllWarehouse: PropTypes.func,
  getAllItems: PropTypes.func,
  getAllTransferOrder: PropTypes.func,
  transferOrders: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  transferOrders: Selectors.makeSelectGetAllTransferOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllTransferOrder: () => dispatch(Actions.getAllTransferOrder()),
    getTransferOrderById: id => dispatch(Actions.getTransferOrderById(id)),
    openNewTransferOrderDialog: () => dispatch(Actions.openNewTransferOrderDialog()),
    getAllWarehouse: () => dispatch(Actions.getAllWarehouse()),
    getAllItems: () => dispatch(Actions.getAllItems()),
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
