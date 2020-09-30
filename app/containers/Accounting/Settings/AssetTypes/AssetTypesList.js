import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import {
  makeStyles,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

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

const AssetTypesList = (props) => {
  const classes = useStyles(props);
  const { assetTypes, openNewAssetTypeDialog, openEditAssetTypeDialog } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAssetType, setSelectedAssetType] = useState(null)

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget)
    setSelectedAssetType(_.find(assetTypes, { id }))
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEditClick = () => {
    openEditAssetTypeDialog(selectedAssetType)
    handleClose()
  }

  const orderedAssetTypes = _.orderBy(assetTypes, 'dateCreated', 'desc');

  console.log(assetTypes, "asset Types")

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
      name: 'assetClass',
      label: 'Asset Class',
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
        noMatch: 'Sorry, no asset types found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New Asset Type">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openNewAssetTypeDialog}
        >
          New Asset
        </Button>
      </Tooltip>
    ),
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="All Asset Types"
        data={orderedAssetTypes}
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
  assetTypes: Selectors.makeSelectAssetTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAssetTypeDialog: () => dispatch(Actions.openNewAssetTypeDialog()),
    openEditAssetTypeDialog: data => dispatch(Actions.openEditAssetTypeDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssetTypesList);
