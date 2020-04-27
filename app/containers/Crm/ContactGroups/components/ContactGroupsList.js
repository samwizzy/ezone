/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  Paper,
  TableContainer, Table, TableBody, TableRow, TableCell,
  Toolbar,
  Typography
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
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
  marginButton: {
    margin: theme.spacing(1),
  },
}));

const ContactGroupsList = props => {
  const classes = useStyles();
  const { loading, openNewContactGroupsDialog, allContactGroups } = props;

  useEffect(() => {

  }, []);

  const columns = [
    {
      name: 'id',
      label: 'S/N',
      options: {
        // display: "excluded",
        filter: true,
      },
    },
    {
      name: 'groupName',
      label: 'Group Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Number Of Contacts',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const contactGp = allContactGroups.find(contact => value === contact.id);

          if (value === '') {
            return '';
          }
          return (
            <Typography>
              {contactGp.contacts.length}
            </Typography>
          );
        },
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <Typography>
            {moment(value).format("MMM Do YYYY")}
          </Typography>
        ),
      }
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => (
          <div>
            <Button variant="outlined" size="small" color="primary" className={classes.marginButton}>
              Edit
            </Button>
            <Button variant="outlined" size="small" color="primary" className={classes.marginButton}>
              View
            </Button>
          </div>
        ),
      },
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
        onClick={() => openNewContactGroupsDialog()}
      >
        New
      </Button>
    ),
    onRowClick: (rowData, rowState) => {
      props.history.push(`/crm/contact-groups/${rowData[0]}`);
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
        title="All Contact Groups"
        data={allContactGroups}
        columns={columns}
        options={options}
      />
      <ContactGroupsDialog />
      <AssignContactDialog />
    </React.Fragment>
  );
};

ContactGroupsList.propTypes = {
  loading: PropTypes.bool,
  openNewContactGroupsDialog: PropTypes.func,
  allContactGroups: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  allContactGroups: Selectors.makeSelectAllContactsGroup()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewContactGroupsDialog: () => dispatch(Actions.openNewContactGroupsDialog()),
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
)(ContactGroupsList);
