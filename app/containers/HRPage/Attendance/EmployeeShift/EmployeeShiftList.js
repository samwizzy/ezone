import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, TextField, Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from '../../../App/selectors';
import {AssignShift} from '../components/AddButton'
import AssignShiftDialog from './components/AssignShiftDialog'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
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
  toolbar: theme.mixins.toolbar,
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  }
}));

const employeeShifts = [
  {id: 1, avi: '', employee: 'Samuel', shift: 'Night', duration: '6:00pm - 6:00am'}
]

const EmployeeShiftList = props => {
  const classes = useStyles();
  const { loading, openNewAttendanceDialog, getAttendances, getAttendanceById, attendance, employees } = props;
  console.log(employees, "Employees in employeeShift");
  const toTitleCase = str => (str ? str[0].toUpperCase() + str.slice(1) : '');
  React.useEffect(() => {
  }, []);

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    /*
    {
      name: 'avi',
      label: ' ',
      options: {
        filter: true,
        sort: true,
        customBodyRender: avi => {
          return (
            <Avatar src='' />
          )
        }
      }
    },
    */
    {
      name: 'id',
      label: 'Name',
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
      name: 'id',
      label: 'Shift',
      options: {
        filter: true,
        sort: true,
        customBodyRender: id => {
          const emp = employees && employees.find(e => e.id == id);
          return (
            emp.workShift && <span>{`${toTitleCase(emp.workShift.shiftName)}`}</span>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'End date',
      options: {
      filter: true,
      sort: true,
      customBodyRender: id => {
        const emp = employees && employees.find(e => e.id == id);
        return (
          emp.workShift && <span>{`${toTitleCase(emp.workShift.endDate)}`}</span>
        );
      },
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AssignShift openDialog={openNewEmployeeShiftDialog} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
     // getAttendanceById(rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-around'
      >
        <Grid item md={12}>
          <MUIDataTable
            className={classes.datatable}
            title="Employee Shifts"
            data={employees}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

      <AssignShiftDialog />
    </div>
  );
};

EmployeeShiftList.propTypes = {
  loading: PropTypes.bool,
  openNewEmployeeShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  user: AppSelectors.makeSelectCurrentUser(),
  attendances: Selectors.makeSelectAttendances(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAttendances: () => dispatch(Actions.getAttendances()),
    getAttendanceById: (uuid) => dispatch(Actions.getAttendanceById(uuid)),
    openNewEmployeeShiftDialog: () => dispatch(Actions.openNewEmployeeShiftDialog()),
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
)(EmployeeShiftList);