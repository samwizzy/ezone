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
  Tooltip,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
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
      cursor: 'pointer',
    },
    '& td': {
      padding: theme.spacing(1, 2),
    },
  },
}));

const TaxesList = props => {
  const classes = useStyles(props);
  const { taxes, openNewTaxDialog, openEditTaxDialog } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTax, setSelectedTax] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedTax(_.find(taxes, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    openEditTaxDialog(selectedTax);
    handleClose();
  };

  console.log(taxes, 'taxes');

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        display: 'excluded',
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
      name: 'rate',
      label: 'Rate',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => new Intl.NumberFormat().format(value),
      },
    },
    {
      name: 'taxType',
      label: 'Tax Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Created',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => (date ? moment(date).format('ll') : ''),
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={event => handleClick(event, value)}
          >
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
    textLabels: {
      body: {
        noMatch: 'Sorry, no taxes found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New Tax">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNewTaxDialog}
        >
          New Tax
        </Button>
      </Tooltip>
    ),
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="All Taxes"
        data={taxes}
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
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  taxes: Selectors.makeSelectTaxes(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaxDialog: () => dispatch(Actions.openNewTaxDialog()),
    openEditTaxDialog: data => dispatch(Actions.openEditTaxDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TaxesList);
