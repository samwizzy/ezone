import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Grid,
  Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, red, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import EditSharp from '@material-ui/icons/EditSharp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Person from '@material-ui/icons/Person';
import { AddEmployee } from '../../Accounting/components/AddButton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableBody-root': {
      '& .MuiTableCell-root': {
        padding: theme.spacing(1)
      },
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
  avatar: {
    boxShadow: theme.shadows[2]
  },
  toolbar: theme.mixins.toolbar,
  status: {
    color: red[500],
    '&.active': { color: green[500] },
  },
}));

const EmployeesApp = props => {
  const classes = useStyles();
  const {
    loading,
    history,
    openNewEmployeeDialog,
    getEmployee,
    employees,
    departments,
    employeeTypes,
    roles,
    employee,
  } = props;

  const handleRoute = (id) => {
    getEmployee(id);
    history.push(`/hr/employees/${id}`)
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
          <Avatar aria-label="avatar" src={`data:image/jpg;base64,${logo}`} className={classes.avatar} />
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
          const emp = employees && employees.find(e => e.id == id);
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
      label: 'Active',
      options: {
        filter: true,
        sort: true,
        customBodyRender: enabled => (
          <span className={classNames(classes.status, { 'active': enabled })}>{enabled ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}</span>
        ),
      },
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    customToolbar: () => <AddEmployee openDialog={openNewEmployeeDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      handleRoute(rowData[0])
    },
    elevation: 0,
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        className={classes.datatable}
        title="Employee List"
        data={employees && employees}
        columns={columns}
        options={options}
      />
    </div>
  );
};

EmployeesApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  departments: Selectors.makeSelectDepartments(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: () => dispatch(Actions.openEditEmployeeDialog()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: uuid => dispatch(Actions.getEmployee(uuid)),
    getPartyTags: () => dispatch(Actions.getPartyTags()),
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
)(EmployeesApp);
