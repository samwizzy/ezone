/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {
  makeStyles,
  FormControlLabel,
  Icon,
  Button
} from '@material-ui/core';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import ViewItemDialog from './ViewItemDialog';

const useStyles = makeStyles(theme => ({
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

const ItemsGroupsList = props => {
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
    match,
    ItemsGroups,
    openNewItemGroupDialog,
    getItemsGroupById,
  } = props;

  console.log(match, "match grouop list")

  const orderedItemsGroups = _.orderBy(ItemsGroups, 'dateCreated', 'desc')

  console.log(ItemsGroups, "ItemsGroups")

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
      name: 'groupName',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'groupDescription',
      label: 'Description',
      options: {
        filter: true,
        sort: false,
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
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const itemGroup = ItemsGroups.find(itemGroup => value === itemGroup.id);

          return (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={event => {
                event.stopPropagation()
                history.push(`/inventory/items/groups/${itemGroup.id}`)
              }}
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
        startIcon={<AddIcon />}
        onClick={openNewItemGroupDialog}
      >
        New
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      getItemsGroupById(rowData[0]);
      props.history.push(`${match.url}/${rowData[0]}`)
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
        title="All Items Groups"
        data={orderedItemsGroups}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

ItemsGroupsList.propTypes = {
  loading: PropTypes.bool,
  ItemsGroups: PropTypes.array,
  openNewItemGroupDialog: PropTypes.func,
  openViewItemGroupDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  ItemsGroups: Selectors.makeSelectGetAllItemsGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    getItemsGroupById: evt => dispatch(Actions.getItemsGroupById(evt)),
    openViewItemGroupDialog: data => dispatch(Actions.openNewItemGroupDialog(data)),
    openNewItemGroupDialog: () => dispatch(Actions.openNewItemGroupDialog()),
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
)(ItemsGroupsList);
