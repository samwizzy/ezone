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
  Tooltip,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import { Euro, AttachMoney, Delete, Check } from '@material-ui/icons';
import moment from 'moment';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer',
    },
    '& tbody': {
      '& td': {
        padding: theme.spacing(1),
      },
    },
  },
}));

const DepreciationTypes = props => {
  const classes = useStyles(props);
  const { depreciationTypes, openNewDepreciationTypeDialog } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  depreciationTypes.reverse();

  console.log(depreciationTypes, 'DepreciationTypes');

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
      name: 'code',
      label: 'Code',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'method',
      label: 'Method',
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
      name: 'calculationBase',
      label: 'Calculation Base',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'depreciatedValue',
      label: 'Depreciated Value',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value =>
          new Intl.NumberFormat('en-US', {}).format(value),
      },
    },
    {
      name: 'depreciationRate',
      label: 'Depreciation Rate',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value =>
          new Intl.NumberFormat('en-US', {}).format(value),
      },
    },
    {
      name: 'percentageValue',
      label: 'Percentage Value',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value =>
          new Intl.NumberFormat('en-US', {}).format(value),
      },
    },
    {
      name: 'validFrom',
      label: 'Valid From',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => (date ? moment(date).format('ll') : ''),
      },
    },
    {
      name: 'validTo',
      label: 'Valid To',
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
        noMatch: 'Sorry, no depreciation types found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New Depreciation Type">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNewDepreciationTypeDialog}
        >
          New Depreciation Type
        </Button>
      </Tooltip>
    ),
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Depreciation Types"
        data={depreciationTypes}
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
        <MenuItem onClick={() => {}}>Edit</MenuItem>
        <MenuItem
          onClick={() => history.push({ pathname: '/account/journal/details' })}
        >
          View Details
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  depreciationTypes: Selectors.makeSelectDepreciationTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewDepreciationTypeDialog: () =>
      dispatch(Actions.openNewDepreciationTypeDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DepreciationTypes);
