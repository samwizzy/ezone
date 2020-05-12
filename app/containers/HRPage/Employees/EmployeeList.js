import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  ButtonGroup,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';
import Person from '@material-ui/icons/Person';
import { AddEmployee } from '../components/AddButton';
import AddEmployeeDialog from './components/AddEmployeeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
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
  table: {
    border: 0,
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 1),
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
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
    //getDepartmentsByOrgIdApi,
  } = props;
  React.useEffect(() => {/*getDepartmentsByOrgIdApi()*/}, [employee, employees, departments, employeeTypes, roles]);
  console.log(employees);
  const toTitleCase = str => (str ? str[0].toUpperCase() + str.slice(1) : '');

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
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => (
          <Avatar aria-label="avatar" className={classes.avatar}>
            A
          </Avatar>
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
          return (
            <span>{`${toTitleCase(emp.firstName)} ${toTitleCase(
              emp.lastName,
            )}`}</span>
          );
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
      name: 'type',
      label: 'Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'department',
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
        customBodyRender: enabled => (
          <span>{enabled ? 'Active' : 'Inactive'}</span>
        ),
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none', // single, multiple
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
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
      <Grid
        container
        justify='space-around'
      >
        <Grid item md={12}>
          <div className={classes.content}>
            <MUIDataTable
              className={classes.datatable}
              title="Employee List"
              data={employees}
              columns={columns}
              options={options}
            />
          </div>
        </Grid>
      </Grid>

      <AddEmployeeDialog />
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
    // getDepartmentsByOrgIdApi: () =>
    //   dispatch(Actions.getDepartmentsByOrgIdApi()),
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