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

const enrollments = [
  { id: 1, avatar: '', user: 'Sarah Thompson', enrolledCourse: 'Statistics for Beginners', enrolledDate: '2020-10-23T15:35:45' },
  { id: 2, avatar: '', user: 'Sarah Thompson', enrolledCourse: 'Statistics for Beginners', enrolledDate: '2020-10-23T15:35:45' }
]

const EnrollmentsList = props => {
  const classes = useStyles();

  const { loading, openNewEnrollmentDialog } = props;

  useEffect(() => {

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
      name: 'user',
      label: 'User',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'enrolledCourse',
      label: 'Enrolled course',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'enrolledDate',
      label: 'Enrolled Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => value ? moment(value).format('ll') : ''
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    filter: false,
    viewColumns: false,
    print: false,
    customToolbar: () => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<Add />}
        onClick={openNewEnrollmentDialog}
        disableElevation
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
        title="All Enrollments"
        data={enrollments}
        columns={columns}
        options={options}
      />

    </React.Fragment>
  );
};

EnrollmentsList.propTypes = {
  loading: PropTypes.bool,
  openNewEnrollmentDialog: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEnrollmentDialog: () => dispatch(Actions.openNewEnrollmentDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EnrollmentsList);
