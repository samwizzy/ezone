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
}));

const ContactGroupsList = props => {
  const classes = useStyles();
  const { loading, openNewContactGroupsDialog } = props;

  useEffect(() => {

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
      name: 'groupname',
      label: 'Group Name',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Subscribers',
      label: 'Subscribers',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'Unconfirmed',
      label: 'Unconfirmed',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Unsubscribed',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'createdAt',
      label: 'Created At',
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
        onClick={() => openNewContactGroupsDialog()}
      >
        New
      </Button>
    ),
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
        data={[]}
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
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading()
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
  withConnect,
  memo,
)(ContactGroupsList);