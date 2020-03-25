import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, Button, ButtonGroup, TableContainer, Table, TableRow, TableCell, TableBody, TextField, Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import moment from 'moment'
import MUIDataTable from 'mui-datatables'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';
import Person from '@material-ui/icons/Person';
import {AddBranch} from '../components/AddButton'
import SideBar from './../components/SideBar'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  table: { 
    border: 0, 
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  }
}));

const BranchesApp = props => {
  const classes = useStyles();
  const { loading, getEmployee, employees, employee } = props;

  React.useEffect(() => {
  }, [employee]);

  const toTitleCase = (str) => { 
    return str? str[0].toUpperCase() + str.slice(1) : ""; 
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
      label: 'Employee Name',
      options: {
      filter: true,
      sort: true,
      customBodyRender: id => {
        const emp = employees && employees.find(e => e.id == id)
        return (
          <span>{`${toTitleCase(emp.firstName)} ${toTitleCase(emp.lastName)}`}</span>
        )
      }
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
      customBodyRender: enabled => {
        return (
          <span>{enabled?"Active":"Inactive"}</span>
        )
      }
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none', // single, multiple
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
    customToolbar: () => <AddBranch openFileDialog={() => {}} />,
    rowsPerPage: 10,
    rowsPerPageOptions: [10,25,50,100],
    onRowClick: (rowData, rowState) => {
      console.log(rowData[0], "rowData[0]")
      getEmployee(rowData[0])
    },
    elevation: 0
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-around'
      >
        <Grid item md={2}>
          <SideBar />
        </Grid>
        <Grid item md={7}>
          <div className={classes.content}>
        
            <MUIDataTable
                className={classes.datatable}
                title="Branch List"
                data={employees}
                columns={columns}
                options={options}
            />

          </div>
        </Grid>
        <Grid item md={3}>
          <div className={classes.gridRoot}>
            <div className={classes.buttonGroup}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button onClick={()=>{}}><EditSharp className={classes.icon} />Edit</Button>
                <Button onClick={()=>{}}><Assignment className={classes.icon} />Assign</Button>
              </ButtonGroup>
            </div>

            <TableContainer component={Paper} square>
                <Table className={classes.table} size="small" aria-label="a dense table">
                <TableBody>
                    {employee && Object.keys(employee).length > 0 && (
                    <React.Fragment>  
                      <TableRow key='0'>
                          <TableCell component="th" scope="row">
                              Name
                          </TableCell>
                          <TableCell align="right">
                            {`${toTitleCase(employee.firstName)} ${toTitleCase(employee.lastName)}`}
                          </TableCell>
                      </TableRow>
                      <TableRow key='1'>
                          <TableCell component="th" scope="row">
                              Email Address
                          </TableCell>
                          <TableCell align="right">{employee.emailAddress}</TableCell>
                      </TableRow>
                      <TableRow key='2'>
                          <TableCell component="th" scope="row">
                              Phone Number
                          </TableCell>
                          <TableCell align="right">{employee.phoneNumber}</TableCell>
                      </TableRow>
                      <TableRow key='3'>
                          <TableCell component="th" scope="row">
                              Gender
                          </TableCell>
                          <TableCell align="right">{employee.gender}</TableCell>
                      </TableRow>
                      <TableRow key='4'>
                          <TableCell component="th" scope="row">
                              Address
                          </TableCell>
                          <TableCell align="right">{`${employee.city?employee.city:""} ${employee.state?employee.state:""} ${employee.country}`}</TableCell>
                      </TableRow>
                      <TableRow key='5'>
                          <TableCell component="th" scope="row">
                              Created On                          </TableCell>
                          <TableCell align="right">{moment(employee.dateCreated).format('ll')}</TableCell>
                      </TableRow>
                    </React.Fragment>
                    )}
                </TableBody>
                </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

BranchesApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee : Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
)(BranchesApp));
