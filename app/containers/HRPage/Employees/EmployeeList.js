import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, red } from '@material-ui/core/colors';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MUIDataTable from 'mui-datatables';
import EditSharp from '@material-ui/icons/EditSharp';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import { AddEmployee } from '../components/AddButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  datatable: {
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

const EmployeesApp = props => {
  const classes = useStyles();
  const {
    history,
    match,
    openNewEmployeeDialog,
    getEmployee,
    employees,
  } = props;

  const handleRoute = id => {
    getEmployee(id);
    history.push(`${match.url}/${id}`);
  };

  console.log(employees, "employees")

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
    customToolbar: () => <AddEmployee openDialog={openNewEmployeeDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
    onRowClick: (rowData, rowState) => {
      handleRoute(rowData[0]);
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
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: () => dispatch(Actions.openEditEmployeeDialog()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: uuid => dispatch(Actions.getEmployee(uuid)),
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
