/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  List,
  FormControlLabel,
  Icon,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Add, Visibility } from '@material-ui/icons';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: "auto",
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
  },
}));

const JobsList = props => {
  const classes = useStyles();

  const {
    loading,
    getJobs,
    openNewJobDialog,
    openEditEdJobDialog,
  } = props;

  useEffect(() => {
    getJobs();
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
      label: 'Company Name',
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
    {
      name: 'dateCreated',
      label: 'Created At',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return moment(value).format('lll')
        }
      }
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          const data = jobs.find(company => value === company.id);

          return (
            <Button
              variant="outlined" size="small" color="primary"
              onClick={() => openEditJobDialog(data)}
            >
              Edit
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
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Add />}
        onClick={() => openNewJobDialog()}
      >
        Add Job
      </Button>
    ),
    elevation: 0
  };

  // if (loading) {
  //   return <LoadingIndicator />;
  // }

  return (
    <React.Fragment>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <MUIDataTable
        className={classes.datatable}
        title="All Jobs"
        data={[]}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
};

JobsList.propTypes = {
  loading: PropTypes.bool,
  getJobs: PropTypes.func,
  openNewJobDialog: PropTypes.func,
  openEditJobDialog: PropTypes.func,
  jobs: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  jobs: Selectors.makeSelectAllJobs(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewJobDialog: () => dispatch(Actions.openNewJobDialog()),
    openEditJobDialog: data => dispatch(Actions.openEditJobDialog(data)),
    getJobs: () => dispatch(Actions.getJobs()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JobsList);
