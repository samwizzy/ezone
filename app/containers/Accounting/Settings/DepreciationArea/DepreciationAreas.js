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
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import moment from 'moment';
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

const DepreciationAreas = props => {
  const classes = useStyles(props);
  const {
    depreciationAreas,
    openNewDepreciationAreaDialog,
    openEditDepreciationAreaDialog,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDepreciationArea, setSelectedDepreciationArea] = useState(
    null,
  );

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedDepreciationArea(_.find(depreciationAreas, { id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    openEditDepreciationAreaDialog(selectedDepreciationArea);
    handleClose();
  };

  const orderedDepreciationAreas = _.orderBy(
    depreciationAreas,
    'dateCreated',
    'desc',
  );

  console.log(depreciationAreas, 'depreciationAreas');

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
      name: 'type',
      label: 'Type',
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
        noMatch: 'Sorry, no depreciation areas found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New Depreciation Area">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNewDepreciationAreaDialog}
        >
          New Depreciation Area
        </Button>
      </Tooltip>
    ),
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Depreciation areas"
        data={orderedDepreciationAreas}
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
  depreciationAreas: Selectors.makeSelectDepreciationArea(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewDepreciationAreaDialog: () =>
      dispatch(Actions.openNewDepreciationAreaDialog()),
    openEditDepreciationAreaDialog: data =>
      dispatch(Actions.openEditDepreciationAreaDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DepreciationAreas);
