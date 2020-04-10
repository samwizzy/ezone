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
import Person from '@material-ui/icons/Person';
import {AddPayroll} from '../components/AddButton'
import AddPayrollDialog from './components/AddPayrollDialog'

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
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: theme.spacing(2, 1),
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

const PayrollApp = props => {
  const classes = useStyles();
  const { loading, openNewPayrollDialog, getEmployee, employees, employee } = props;

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
      name: 'firstName',
      label: 'Department Name',
      options: {
      filter: true,
      sort: true,
      },
    },
    {
      name: 'id',
      label: 'Employee Count',
      options: {
        filter: true,
        sort: true,
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
    customToolbar: () => <AddPayroll openDialog={openNewPayrollDialog} />,
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
        <Grid item md={12}>
          <div className={classes.content}>
            
            <MUIDataTable
                className={classes.datatable}
                title="Payroll List"
                data={employees}
                columns={columns}
                options={options}
            />

          </div>
        </Grid>
      </Grid>

      <AddPayrollDialog />
    </div>
  );
};

PayrollApp.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
  openNewPayrollDialog: PropTypes.func,
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
    openNewPayrollDialog: () => dispatch(Actions.openNewPayrollDialog()),
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
)(PayrollApp));
