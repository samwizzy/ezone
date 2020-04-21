/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  Icon,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import ContactDialog from './ContactDialog';
import ContactDetailsDialog from './ContactDetailsDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
  },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ContactsList = props => {
  const classes = useStyles();
  const dd = [
    { id: 1, name: 'cust1', phone: '0810132', emailAddress: 'cust1@gmail.com' },
  ];

  const {
    loading,
    openNewContactDialogAction,
    openEditContactDialogAction,
    getAllContactsAction,
  } = props;

  useEffect(() => {
    getAllContactsAction();
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
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'emailAddress',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
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
    {
      name: 'id',
      label: '',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const d = dd.find(post => value === post.id);
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => openEditContactDialogAction(d)}>
                Edit
              </Button>
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
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => openNewContactDialogAction()}
      >
        New
      </Button>
    ),
    elevation: 0
  };

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MUIDataTable
        className={classes.datatable}
        title="All Contacts"
        data={dd}
        columns={columns}
        options={options}
      />
      <ContactDialog />
      <ContactDetailsDialog />
    </React.Fragment>
  );
};

ContactsList.propTypes = {
  loading: PropTypes.bool,
  openNewContactDialogAction: PropTypes.func,
  openEditContactDialogAction: PropTypes.func,
  getAllContactsAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  // getAllInventoryAdjusts: Selectors.makeSelectGetAllInventoryAdjustments(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewContactDialogAction: () =>
      dispatch(Actions.openNewContactDialog()),
    openEditContactDialogAction: () =>
      dispatch(Actions.openEditContactDialog()),
    getAllContactsAction: () =>
      dispatch(Actions.getAllContacts()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactsList);
