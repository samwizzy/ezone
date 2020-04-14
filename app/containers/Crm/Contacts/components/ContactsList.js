/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
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
import LoadingIndicator from '../../../../components/LoadingIndicator';
// import InventoryAdjustmentDialog from './ContactDialog';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CompaniesList = props => {
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
    // getAllEmployees,
    // openNewInventoryAdjustDialogAction,
    // getAllWarehousesAction,
    // getAllItemsAction,
    // getAllInventoryAdjustmentsAction,
    // getAllInventoryAdjusts,
    // openEditEmployeeDialogAction,
    // openViewEmployeeDialogAction,
  } = props;

  useEffect(() => {
    // getAllItemsAction();
    // getAllWarehousesAction();
    // getAllInventoryAdjustmentsAction();
  }, []);

  // console.log(getAllInventoryAdjusts, 'getAllInventoryAdjusts');
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
      name: 'inventoryAdjustedDate',
      label: 'Adjusted Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'reason',
      label: 'Reason',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'reasonDescription',
      label: 'Reason Description',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        // customBodyRender: value => {
        //   const Post = getAllPosts.find(post => value === post.id);

        //   if (value === '') {
        //     return '';
        //   }
        //   return (
        //     <FormControlLabel
        //       label="Edit"
        //       control={<Icon>create</Icon>}
        //       onClick={evt => {
        //         evt.stopPropagation();
        //         openEditPostDialog(Post);
        //       }}
        //     />
        //   );
        // },
      },
    },
    {
      name: 'referenceNumber',
      label: 'Reference Number',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'addedBy',
      label: 'Adjusted By',
      options: {
        filter: true,
        sort: false,
      }
    },
    // {
    //   name: 'id',
    //   label: '',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: value => {
    //       const Post = datas.find(post => value === post.id);
    //       if (value === '') {
    //         return '';
    //       }
    //       return (
    //         <div>
    //           <Button
    //             aria-controls="simple-menu"
    //             aria-haspopup="true"
    //             onClick={handleClick}
    //           >
    //             Options
    //           </Button>
    //           <Menu
    //             id="simple-menu"
    //             anchorEl={anchorEl}
    //             keepMounted
    //             open={Boolean(anchorEl)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem onClick={handleClose}>Assign Role</MenuItem>
    //             <MenuItem onClick={handleClose}>Assign Apps</MenuItem>
    //             <MenuItem onClick={() => openEditEmployeeDialogAction(Post)}>
    //               Edit
    //             </MenuItem>
    //             <MenuItem onClick={() => openViewEmployeeDialogAction(Post)}>
    //               View Details
    //             </MenuItem>
    //             <MenuItem onClick={handleClose}>Deactivate</MenuItem>
    //           </Menu>
    //         </div>
    //       );
    //     },
    //   },
    // },
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
        // onClick={() => openNewInventoryAdjustDialogAction()}
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
        title="All Contacts"
        data={[]}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

CompaniesList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewInventoryAdjustDialogAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
  getAllItemsAction: PropTypes.func,
  getAllInventoryAdjustmentsAction: PropTypes.func,
  getAllInventoryAdjusts: PropTypes.array,
  // openEditEmployeeDialogAction: PropTypes.func,
  // openViewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  // getAllInventoryAdjusts: Selectors.makeSelectGetAllInventoryAdjustments(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getAllInventoryAdjustmentsAction: () =>
    //   dispatch(Actions.getAllInventoryAdjustments()),
    // openNewInventoryAdjustDialogAction: () =>
    //   dispatch(Actions.openNewInventoryAdjustDialog()),
    // getAllWarehousesAction: () => dispatch(Actions.getAllWarehouse()),
    // getAllItemsAction: () => dispatch(Actions.getAllItems()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompaniesList);
