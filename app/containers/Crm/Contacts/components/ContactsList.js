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
  Typography,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
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
  view: {
    margin: theme.spacing(1),
  },
}));

const ContactsList = props => {
  const classes = useStyles();

  const {
    loading,
    allContacts,
    openNewContactDialogAction,
    openContactDetailsDialogAction,
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
      name: 'id',
      label: 'Name',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const contac = allContacts.find(contact => value === contact.id);
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Typography variant="subtitle2" gutterBottom>
                {`${contac.firstName} ${contac.lastName}`}
              </Typography>
            </div>
          );
        },
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
      name: 'phoneNumber',
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
      name: 'lifeStage',
      label: 'Life Stage',
      options: {
        filter: true,
        sort: false,
      }
    },
    {
      name: 'associationType',
      label: 'Association Type',
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
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const contac = allContacts.find(contact => value === contact.id);
          if (value === '') {
            return '';
          }
          return (
            <div>
              <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => openEditContactDialogAction(contac)}>
                Edit
              </Button>
              <FormControlLabel
                className={classes.view}
                control={<Visibility />}
                onClick={() =>openContactDetailsDialogAction(contac)}
              />
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
        startIcon={<Add />}
        onClick={() => openNewContactDialogAction()}
      >
        New
      </Button>
    ),
    elevation: 0
  };

  console.log(allContacts, 'allContacts');

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MUIDataTable
        className={classes.datatable}
        title="All Contacts"
        data={allContacts}
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
  openContactDetailsDialogAction: PropTypes.func,
  getAllContactsAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  allContacts: Selectors.makeSelectAllContacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewContactDialogAction: () =>
      dispatch(Actions.openNewContactDialog()),
    openEditContactDialogAction: evt =>
      dispatch(Actions.openEditContactDialog(evt)),
    openContactDetailsDialogAction: evt =>
      dispatch(Actions.openContactDetailsDialog(evt)),
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
