import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Chip, IconButton, Typography, Toolbar } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, red } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& tbody': {
      '& td': {
        padding: theme.spacing(1, 2),
      },
    },
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
  avatar: {
    background: 'transparent',
    color: theme.palette.divider,
    border: `1px solid ${theme.palette.divider}`
  },
  toolbar: theme.mixins.toolbar,
  status: {
    color: red[500],
    '&.active': { color: green[500] },
  },
}));

const EmployeeList = props => {
  const classes = useStyles();
  const {
    loading,
    history,
    match,
    announcement,
  } = props;

  const handleBack = () => {
    history.goBack()
  }

  console.log(announcement, "get announcemtn")

  if (!announcement) {
    return null;
  }

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
      name: 'employeeImage',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: logo => (
          <Avatar
            aria-label="avatar"
            src={`data:image/jpg;base64,${logo}`}
            className={classes.avatar}
          />
        ),
      },
    },
    {
      name: 'id',
      label: 'Employee Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = announcement.employees.find(e => e.id == id);
          return `${emp.firstName} ${emp.lastName}`;
        },
      },
    },
    {
      name: 'employeeId',
      label: 'Employee ID',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'employeeType.name',
      label: 'Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department.name',
      label: 'Department ',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'enabled',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
        customBodyRender: enabled => {
          return enabled
            ? <Chip label="Active" variant="outlined" icon={<CheckCircleOutlineIcon className={classNames(classes.status, { active: enabled })} />} />
            : <Chip label="Inactive" variant="outlined" icon={<RadioButtonUncheckedIcon />} />
        }
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    viewColumns: false,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
    },
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title={
          <Toolbar variant="dense">
            <IconButton onClick={handleBack}><ArrowBackIcon /></IconButton>
            <Typography>{announcement.title.toUpperCase()} employees</Typography>
          </Toolbar>
        }
        data={announcement.employees}
        columns={columns}
        options={options}
      />
    </div>
  );
};

EmployeeList.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  announcement: Selectors.makeSelectAnnouncementById(),
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
)(EmployeeList);
