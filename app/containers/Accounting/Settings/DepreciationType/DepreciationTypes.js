import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import moment from 'moment';
import _ from 'lodash';
import { methods } from './components/DepreciationTypeDialog';

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

const DepreciationTypes = props => {
  const classes = useStyles(props);
  const {
    history,
    match,
    depreciationTypes,
    openNewDepreciationTypeDialog,
    openEditDepreciationTypeDialog,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepreciationType, setSelectedDepreciationType] = useState(
    null,
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedDepreciationType(_.find(depreciationTypes, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    openEditDepreciationTypeDialog(selectedDepreciationType);
    handleClose();
  };

  const handleViewClick = () => {
    const { id } = selectedDepreciationType;
    history.push(`${match.url}/${id}`);
    handleClose();
  };

  const orderedDepreciationTypes = _.orderBy(
    depreciationTypes,
    'dateCreated',
    'desc',
  );

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
        customBodyRender: value =>
          value ? _.find(methods, { value }).label : null,
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
        data={orderedDepreciationTypes}
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
        <MenuItem onClick={handleViewClick}>View Details</MenuItem>
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
    openEditDepreciationTypeDialog: data =>
      dispatch(Actions.openEditDepreciationTypeDialog(data)),
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
)(DepreciationTypes);
