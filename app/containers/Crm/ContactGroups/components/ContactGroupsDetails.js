/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  Button,
  Paper,
  TableContainer, Table, TableBody, TableRow, TableCell,
  Toolbar,
  Typography
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import ContactGroupsDialog from './ContactGroupsDialog';
import AssignContactDialog from './AssignContactDialog';

// import * as ContactActions from '../../../Crm/Contacts/actions';
// import * as ContactReducers from '../../../Crm/Contacts/reducer';

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
}));

const ContactGroupsDetails = props => {
  const classes = useStyles();
  const { loading, openNewAssignContactDialog, match, getContactGroupByIdAction, getContactGroup, getContactsAction, getAllContacts } = props;
  const { params } = match

  useEffect(() => {
    getContactGroupByIdAction(params.contactId);
    getContactsAction();
  }, []);

  const columns = [
    {
      name: 'id',
      label: 'S/N',
      options: {
        display: "excluded",
        filter: true,
      },
    },
    {
      name: 'id',
      label: 'Contact Name',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const contactGp = getContactGroup.contacts.find(contact => value === contact.id);

          if (value === '') {
            return '';
          }
          return (
            <Typography>
              {contactGp.firstName} {contactGp.lastName}
            </Typography>
          );
        },
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
      name: 'emailAddress',
      label: 'Email',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'lifeStage',
      label: 'Life Stage',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'ownerName',
      label: 'Owner',
      options: {
        filter: true,
        sort: false,
      }
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'multiple',
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => openNewAssignContactDialog()}
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
      <Paper square>
        <Toolbar>
          <Typography variant="h6">Contact Groups</Typography>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th">Group Name:</TableCell>
                <TableCell>{getContactGroup.groupName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th">Description:</TableCell>
                <TableCell>{getContactGroup.groupDescription}</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell component="th">Private:</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <MUIDataTable
        className={classes.datatable}
        title="All Contacts"
        data={getContactGroup.contacts}
        columns={columns}
        options={options}
      />
      <ContactGroupsDialog />
      <AssignContactDialog params={params} getAllContacts={getAllContacts} />
    </React.Fragment>
  );
};

ContactGroupsDetails.propTypes = {
  loading: PropTypes.bool,
  openNewAssignContactDialog: PropTypes.func,
  getContactGroupByIdAction: PropTypes.func,
  getContactGroup: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  getContactsAction: PropTypes.func,
  getAllContacts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  getContactGroup: Selectors.makeSelectContactGroup(),
  getAllContacts: Selectors.makeSelectGetContacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAssignContactDialog: () => dispatch(Actions.openNewAssignContactDialog()),
    getContactGroupByIdAction: evt => dispatch(Actions.getContactGroupById(evt)),
    getContactsAction: () => dispatch(Actions.getContacts()),
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
)(ContactGroupsDetails);
