/* eslint-disable prettier/prettier */
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
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import ViewItemDialog from './ViewItemDialog';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ItemsList = props => {
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
    getAllItems,
    openNewItemDialogAction,
    openViewItemDialogAction,
    // openEditEmployeeDialogAction,
  } = props;

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
      name: 'itemName',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
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
          const item = getAllItems.find(post => value === post.id);
          if (value === '') {
            return '';
          }
          return (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => openViewItemDialogAction(item)}
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
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => history.push('/inventory/items/new')}
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
      <MUIDataTable
        title="All Items"
        data={getAllItems}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

ItemsList.propTypes = {
  loading: PropTypes.bool,
  getAllItems: PropTypes.array,
  openNewItemDialogAction: PropTypes.func,
  openViewItemDialogAction: PropTypes.func,
  // openEditEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllItems: Selectors.makeSelectGetAllItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    openViewItemDialogAction: evt =>
      dispatch(Actions.openViewItemDialog(evt)),
    openNewItemDialogAction: () =>
      dispatch(Actions.openNewItemDialog()),
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
)(ItemsList);
