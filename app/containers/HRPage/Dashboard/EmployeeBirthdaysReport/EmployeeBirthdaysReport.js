import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Breadcrumbs, IconButton, Link, TextField, MenuItem, Grid, Typography, Toolbar } from '@material-ui/core';
import MUIDataTable from 'mui-datatables'
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment'
import _ from 'lodash'
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(4, 6),
    margin: theme.spacing(1, 0)
  },
  toolbar: theme.mixins.toolbar,
  datatable: {
    '& thead': {
      '& th': {
        color: theme.palette.common.white,
      },
      '& th:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& th:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
}));

const EmployeeBirthdaysReport = props => {
  const classes = useStyles();
  const { loading, history, employees } = props;

  const birthdayEmps = employees.length > 0 && employees.filter(emp => moment(emp.dob).format('MMM') === moment().format('MMM'));
  const birthdays = _.orderBy(birthdayEmps, 'dob', 'desc');

  const columns = [
    {
      name: 'uuId',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'id',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = employees.find(emp => emp.id === id)
          return emp.firstName + ' ' + emp.lastName
        }
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'dob',
      label: 'Birth Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: date => date ? moment(date).format('ll') : ""
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Created',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => value ? moment(value).format('ll') : ''
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link color="inherit" onClick={() => history.push('/hr/dashboard')}>
                  <IconButton onClick={() => history.push('/hr/dashboard')}>
                    <ArrowBackIcon className={classes.icon} />
                  </IconButton>
                </Link>
                <Typography variant="subtitle1" color="textPrimary" className={classes.title}>
                  Employee Birthdays
                </Typography>
              </Breadcrumbs>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <MUIDataTable
            className={classes.datatable}
            title="Birthday List"
            data={birthdays}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </div>
  );
};

EmployeeBirthdaysReport.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(EmployeeBirthdaysReport);
