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
import AddBranchDialog from './components/AddBranchDialog'

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
  const { loading, openNewBranchDialog, getEmployee, employees, employee } = props;

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
    customToolbar: () => <AddBranch openDialog={openNewBranchDialog} />,
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
        <Grid item md={12}>
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
      </Grid>

      <AddBranchDialog />
    </div>
  );
};

BranchesApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
  openNewBranchDialog: PropTypes.func,
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
    openNewBranchDialog: () => dispatch(Actions.openNewBranchDialog()),
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
