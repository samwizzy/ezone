import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {
  makeStyles,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { darken } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  datatable: {
    whiteSpace: 'nowrap',
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

const SalesOrdersList = props => {
  const classes = useStyles();

  const {
    loading,
    history,
    match,
    getAllItems,
    getItemById,
    openNewItemDialog,
  } = props;

  const handleNewClick = () => {
    openNewItemDialog()
    history.push(`${match.url}/new`)
  }

  const handleItemClick = (saleId) => {
    history.push(`${match.url}/${saleId}`)
  }

  const orderedItems = _.orderBy(getAllItems, 'dateCreated', 'desc')

  console.log(getAllItems, "getAllItems")

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
      name: 'itemName',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'sku',
      label: 'SKU',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'barcode',
      label: 'Barcode',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'quantity',
      label: 'Stock On Hand',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const item = getAllItems.find(item => value === item.id);

          return (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => handleItemClick(item.id)}
            >
              View
            </Button>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    sortOrder: {
      name: 'itemName',
      direction: 'desc'
    },
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleNewClick}
      >
        New Sales Order
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      getItemById(rowData[0]);
      handleItemClick(rowData[0])
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
        title="Sales Orders"
        data={orderedItems}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

SalesOrdersList.propTypes = {
  loading: PropTypes.bool,
  getAllItems: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllItems: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getItemById: id => dispatch(Actions.getItemById(id)),
    openNewItemDialog: data => dispatch(Actions.openNewItemDialog(data)),
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
)(SalesOrdersList);
