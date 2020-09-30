import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { Euro, AttachMoney, Delete, Check } from '@material-ui/icons';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  datatable: {
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer'
    },
    '& td': {
      padding: theme.spacing(1, 2)
    },
  },
}));

const CurrenciesList = (props) => {
  const classes = useStyles(props);
  const { currencies, openNewCurrencyDialog, openEditCurrencyDialog } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedCurrency, setSelectedCurrency] = useState(null)

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget)
    setSelectedCurrency(_.find(currencies, { id }))
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditClick = () => {
    openEditCurrencyDialog(selectedCurrency)
  }

  console.log(currencies, "currencies")

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        display: 'excluded'
      },
    },
    {
      name: 'code',
      label: 'Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'symbol',
      label: 'Symbol',
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
          return (
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => handleClick(event, value)}
            >
              <MoreVertIcon />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    textLabels: {
      body: {
        noMatch: 'Sorry, no currencies areas found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New Currency">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNewCurrencyDialog}
        >
          New Currency
        </Button>
      </Tooltip>
    ),
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Currencies List"
        data={currencies}
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
        <MenuItem onClick={handleEditClick}>
          Edit
        </MenuItem>
      </Menu>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currencies: Selectors.makeSelectCurrencies(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewCurrencyDialog: () => dispatch(Actions.openNewCurrencyDialog()),
    openEditCurrencyDialog: data => dispatch(Actions.openEditCurrencyDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CurrenciesList);
