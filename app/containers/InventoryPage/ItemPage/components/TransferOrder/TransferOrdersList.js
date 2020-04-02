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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import reducer from '../../reducer';
import saga from '../../saga';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import ModuleLayout from '../../../components/ModuleLayout';
import TransferOrderDialog from './TransferOrderDialog';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const TransferOrdersList = props => {
  useInjectReducer({ key: 'itemPage', reducer });
  useInjectSaga({ key: 'itemPage', saga });
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
    getAllEmployees,
    openNewTransferOrderDialogAction,
    getAllWarehousesAction,
    getAllItemsAction,
    // openEditEmployeeDialogAction,
    // openViewEmployeeDialogAction,
  } = props;

  useEffect(() => {
    getAllItemsAction();
    getAllWarehousesAction();
  }, []);

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
      name: 'firstName',
      label: 'First Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lastName',
      label: 'Last Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'emailAddress',
      label: 'Email Address',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
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
      name: 'gender',
      label: 'Gender',
      options: {
        filter: true,
        sort: false,
      },
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
        onClick={() => openNewTransferOrderDialogAction()}
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
      <ModuleLayout>
        <MUIDataTable
          title="All Transfer Orders"
          data={getAllEmployees}
          columns={columns}
          options={options}
        />
      </ModuleLayout>
      <TransferOrderDialog />
    </React.Fragment>
  );
};

TransferOrdersList.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewTransferOrderDialogAction: PropTypes.func,
  getAllWarehousesAction: PropTypes.func,
  getAllItemsAction: PropTypes.func,
  // openEditEmployeeDialogAction: PropTypes.func,
  // openViewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  // getAllEmployees: Selectors.makeSelectGetAllEmployees(),
  // getAllEmployees: UtilitySelectors.makeSelectAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getAllUsersAction: () =>
    //   dispatch(Actions.get()),
    openNewTransferOrderDialogAction: () =>
      dispatch(Actions.openNewTransferOrderDialog()),
    getAllWarehousesAction: () => dispatch(Actions.getAllWarehouse()),
    getAllItemsAction: () => dispatch(Actions.getAllItems()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TransferOrdersList);
