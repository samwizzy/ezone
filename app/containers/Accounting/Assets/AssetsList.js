import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import {
  makeStyles,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { CircleLoader } from '../../../components/LoadingIndicator';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import * as Actions from './actions';
import * as Selectors from './selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    whiteSpace: 'nowrap',
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& td': {
      padding: theme.spacing(1, 2),
    },
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
}));

const AssetsList = props => {
  const classes = useStyles(props);
  const { loading, history, match, assets, openNewAssetDialog, openEditAssetDialog } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget)
    setSelectedAsset(_.find(assets, { id }))
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    const { id } = selectedAsset
    openEditAssetDialog(selectedAsset)
    history.push(`${match.url}/edit/${id}`)
    handleClose()
  }

  const handleViewClick = () => {
    const { id } = selectedAsset
    history.push(`${match.url}/view/${id}`)
    handleClose()
  }

  const orderedAssets = _.orderBy(assets, 'dateCreated', 'desc')

  if (loading) {
    return <CircleLoader />
  }

  console.log(assets, "assets")

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
      name: 'assetName',
      label: 'Asset Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'assetId',
      label: 'Asset ID',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'aquisitionValue',
      label: 'Aquisition Cost',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'location',
      label: 'Location',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'quantity',
      label: 'Quantity',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'assetStatus',
      label: 'Status',
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
        noMatch: 'Sorry, no fixed assets found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => (
      <Tooltip title="New Asset">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => history.push(`${match.url}/new`)}
        >
          New Asset
        </Button>
      </Tooltip>
    ),
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Fixed Assets"
        data={orderedAssets}
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
        <MenuItem onClick={handleViewClick}>
          View Details
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  assets: Selectors.makeSelectAssets(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAssetDialog: () => dispatch(Actions.openNewAssetDialog()),
    openEditAssetDialog: data => dispatch(Actions.openEditAssetDialog(data)),
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
)(AssetsList);
