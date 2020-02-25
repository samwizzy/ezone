import React, { memo } from 'react';
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
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { AddButton } from './AddButton';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 5, 5, 20),
    marginBottom: theme.spacing(4),
  },
  image: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    left: '150px',
    top: '180px',
    border: '1px solid #C4C4C4',
    borderRadius: '155px',
    padding: '25px',
  },
  edit: {
    position: 'absolute',
    height: '100px',
    left: '1280px',
    top: '180px',
    color: '#1A88E1',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '13px',
    lineHeight: '16px',
    // border: '2px solid #1A88E1',
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      height: '100px',
      left: '265px',
      top: '150px',
      color: '#1A88E1',
    },
  },
  orgContainer: {
    padding: theme.spacing(0, 5, 0, 5),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  editButton: {
    width: '117px',
    height: '40px',
    background: '#1A88E1',
    borderRadius: '10px',
    align: 'right',
  },
  listFormat: {
    marginBottom: '10px',
    marginTop: '10px',
  },
}));

const EmployeeList = props => {
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
    openNewEmployeeDialogAction,
    openEditEmployeeDialogAction,
    openViewEmployeeDialogAction,
    getAllEmployees,
  } = props;

  const datas = [
    {
      id: '1',
      name: 'Teslim Andulafeez',
      company: 'Test Corp',
      city: 'Ikeja',
      state: 'Lagos State',
    },
    {
      id: '2',
      name: 'Christ okeme',
      company: 'Test Corp',
      city: 'Cross River',
      state: 'Calabar',
    },
    {
      id: '3',
      name: 'Joel Johnson',
      company: 'Test Corp',
      city: 'Abuja',
      state: 'FCT',
    },
    {
      name: 'Kelechi Chinanka',
      company: 'Test Corp',
      city: 'Ikeja',
      state: 'Lagos State',
    },
  ];

  console.log(getAllEmployees, 'getAllEmployees');

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
    {
      name: 'id',
      label: '',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const Post = datas.find(post => value === post.id);
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Options
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Assign Role</MenuItem>
                <MenuItem onClick={handleClose}>Assign Apps</MenuItem>
                <MenuItem onClick={() => openEditEmployeeDialogAction(Post)}>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => openViewEmployeeDialogAction(Post)}>
                  View Details
                </MenuItem>
                <MenuItem onClick={handleClose}>Deactivate</MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => (
      <AddButton openNewEmployeeDialogAction={openNewEmployeeDialogAction} />
    ),
  };

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <React.Fragment>
      <MUIDataTable
        title="All Employees"
        // data={getAllEmployees}
        data={datas}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

EmployeeList.propTypes = {
  loading: PropTypes.bool,
  openNewEmployeeDialogAction: PropTypes.func,
  openEditEmployeeDialogAction: PropTypes.func,
  openViewEmployeeDialogAction: PropTypes.func,
  getAllEmployees: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getAllEmployees: Selectors.makeSelectGetAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialogAction: () =>
      dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialogAction: evt =>
      dispatch(Actions.openEditEmployeeDialog(evt)),
    openViewEmployeeDialogAction: evt =>
      dispatch(Actions.openViewEmployeeDialog(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeList);
