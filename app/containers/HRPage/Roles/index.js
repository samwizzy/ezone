import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, ButtonGroup, TableContainer, Table, TableRow, TableCell, TableBody, TextField, Grid, Paper, Typography } from '@material-ui/core';
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
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Person from '@material-ui/icons/Person';
import {AddRole} from '../components/AddButton'

const drawerWidth = '100%';

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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
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
    '& .MuiButtonGroup-root:last-child': {
      marginLeft: '10px'
    }
  }
}));

const HumanResource = props => {
  const classes = useStyles();
  const { loading, getEmployees, getEmployee, employees, employee } = props;

  React.useEffect(() => {
  }, [employee]);

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
        name: 'Rolename',
        label: 'Role Name',
        options: {
        filter: true,
        sort: true,
        customBodyRender: Rolename => {
          return  (
          <Typography variant="inherit" color="textSecondary">
              <AssignmentInd /> {Rolename}
          </Typography>
          )
        }
        },
    },
    {
        name: 'description',
        label: 'Description',
        options: {
          filter: true,
          sort: true
        },
    },
    {
        name: 'employeesCount',
        label: 'Employees',
        options: {
            filter: true,
            sort: true,
        },
    },
  ];

  const options = {
      filterType: 'checkbox',
      responsive: 'scrollMaxHeight',
      selectableRows: 'single', // none, multiple
      print: false,
      download: true,
      viewColumns: false,
      filter: false,
      customToolbar: () => <AddRole openFileDialog={() => {}} />,
      rowsPerPage: 10,
      rowsPerPageOptions: [10,25,50,100],
      onRowClick: (rowData, rowState) => {
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
            <div className={classes.buttonGroup}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button onClick={()=>{}}><EditSharp className={classes.icon} />Edit</Button>
                <Button onClick={()=>{}}><Assignment className={classes.icon} />Assign</Button>
              </ButtonGroup>
            </div>
            
            <MUIDataTable
                className={classes.datatable}
                title="Roles List"
                data={employees}
                columns={columns}
                options={options}
            />

          </div>
        </Grid>
        <Grid item md={3}>
          <div className={classes.gridRoot}>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                <TableBody>
                    {employee && Object.keys(employee).map(key => (
                    <TableRow key={employee.docName}>
                        <TableCell component="th" scope="row">
                            Employee Name
                        </TableCell>
                        <TableCell align="right">{employee[key]}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

HumanResource.propTypes = {
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
)(HumanResource));
