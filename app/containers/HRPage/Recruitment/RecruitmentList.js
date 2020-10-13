import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, ButtonGroup, Icon, IconButton, TableContainer, Table, TableRow, TableCell, TableBody, TextField, Grid, Paper, Typography } from '@material-ui/core';
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
import { AddEmployee } from '../../Accounting/components/AddButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  datatable: {
    '& table': {
      width: '96% !important',
      margin: '4px auto',
    },
    '& tr:hover': {
      cursor: 'pointer'
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
  table: {
    border: 0,
    whiteSpace: 'nowrap',
    overflowX: 'auto',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
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
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  }
}));

const RecruitmentList = props => {
  const classes = useStyles();
  const { loading, openNewEmployeeDialog, getEmployee, employees, employee } = props;

  React.useEffect(() => {
  }, [employee]);

  console.log(employee, "employee")

  const toTitleCase = (str) => {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
  }

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        display: 'excluded',
        filter: true,
      },
    },
    {
      name: 'id',
      label: 'Job Title',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: 'Applicant',
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
            <span>{enabled ? "Active" : "Inactive"}</span>
          )
        }
      },
    },
    {
      name: 'dateCreated',
      label: 'Created On',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => {
          return (
            <Typography variant="inherit" color="textSecondary">
              {moment(day).format('lll')}
            </Typography>
          )
        }
      },
    },
    {
      name: 'dateCreated',
      label: 'Expiry Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => {
          return (
            <Typography variant="inherit" color="textSecondary">
              {moment(day).format('lll')}
            </Typography>
          )
        }
      },
    },
    {
      name: 'dateCreated',
      label: 'Publish Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => {
          return (
            <Typography variant="inherit" color="textSecondary">
              {moment(day).format('lll')}
            </Typography>
          )
        }
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
    customToolbar: () => <IconButton component={Link} to="/hr/recruitment/new"><Icon color="primary">add_circle</Icon></IconButton>,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 25, 50, 100],
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
        <Grid item md={9}>
          <div className={classes.content}>

            <MUIDataTable
              className={classes.datatable}
              title="Recruitment"
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
                <Button onClick={() => { }}><EditSharp className={classes.icon} />Edit</Button>
                <Button onClick={() => { }}><Assignment className={classes.icon} />Assign</Button>
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
                        <TableCell align="right">{`${employee.city ? employee.city : ""} ${employee.state ? employee.state : ""} ${employee.country}`}</TableCell>
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

RecruitmentList.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
    openEditEmployeeDialog: () => dispatch(Actions.openEditEmployeeDialog()),
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
  )(RecruitmentList));
