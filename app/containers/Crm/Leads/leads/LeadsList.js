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
import { Add, Visibility, DeleteOutline } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginLeft: theme.spacing(2),
  },
  datatable: {
    whiteSpace: "nowrap",
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
  }
}));

const LeadsList = props => {
  const classes = useStyles();

  const {
    loading,
    leads,
    openNewLeadDialog,
    openEditLeadDialog,
  } = props;

  useEffect(() => {
  }, []);

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
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
      name: 'id',
      label: 'FullName',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const lead = leads.find(lead => value === lead.id);
          return (
            <Typography variant="subtitle2">
              {lead.firstName + ' ' + lead.lastName}
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
      name: 'company',
      label: 'Company',
      options: {
        filter: true,
        sort: false
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = leads.find(lead => value === lead.id);
          return (
            <Button variant="outlined" size="small" color="primary" onClick={() => openEditLeadDialog(data)}>
              Edit
            </Button>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = leads.find(contact => value === contact.id);
          return (
            <FormControlLabel
              control={<Visibility fontSize="small" />}
              onClick={() => { }}
            />
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = leads.find(contact => value === contact.id);
          return (
            <IconButton variant="outlined" size="small" color="primary" onClick={() => openEditLeadDialog(data)}>
              <DeleteOutline />
            </IconButton>
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
        onClick={() => openNewLeadDialog()}
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
        title="All Leads"
        data={[]}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

LeadsList.propTypes = {
  loading: PropTypes.bool,
  openNewLeadDialog: PropTypes.func,
  openEditLeadDialog: PropTypes.func,
  leads: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  leads: Selectors.makeSelectLeads(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewLeadDialog: () => dispatch(Actions.openNewLeadDialog()),
    openEditLeadDialog: data => dispatch(Actions.openEditLeadDialog(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LeadsList);
