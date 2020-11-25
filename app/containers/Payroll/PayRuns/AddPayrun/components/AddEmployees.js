import React, { Fragment, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import classNames from 'classnames'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MUIDataTable from 'mui-datatables';
import {
  makeStyles,
  Card, CardHeader, CardContent,
  Button,
  Grid,
  FormLabel,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiCardContent-root': {
      justifyContent: 'flex-end',
    },
    '& .MuiCardActions-root': {
      padding: theme.spacing(1, 2),
    }
  },
  datatable: {
    whiteSpace: 'nowrap',
    '& .MuiToolbar-regular': {
      paddingLeft: 0
    },
  },
  radioGroup: {
    justifyContent: 'space-between'
  }
}));

const AddEmployees = props => {
  const classes = useStyles(props);
  const { loading, form, handleChange, handleDateChange, handleSelectChange, openNewPayrunDialog } = props;
  const [settings, setSettings] = useState({ employee: 'ALL_EMPLOYEES' })

  const handleOptionsChange = event => {
    const { name, value, type, checked } = event.target
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : value })
  }

  const columns = [
    {
      name: 'id',
      label: ' ',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
      },
    },
    {
      name: 'employee',
      label: 'Employee',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'department',
      label: 'Department',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'role',
      label: 'Role',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'salary',
      label: 'Gross Salary',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'earnings',
      label: 'Earnings',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'benefits',
      label: 'Benefits',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'deduction',
      label: 'Deduction',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'tax',
      label: 'Tax',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'id',
      label: 'Net Salary',
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'stacked',
    selectableRows: 'none',
    print: false,
    filter: false,
    viewColumns: false,
    download: false,
    textLabels: {
      body: {
        noMatch: 'Sorry, no employees found',
        toolTip: 'Sort',
        columnHeaderTooltip: column => `Sort for ${column.label}`,
      },
    },
    customToolbar: () => { },
    onRowClick: (rowData, rowState) => { },
    elevation: 0,
  };

  return (
    <Card className={classes.root} elevation={0}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Employees</FormLabel>
              <RadioGroup className={classes.radioGroup} aria-label="employee" name="employee" value={settings.employee} onChange={handleOptionsChange} row>
                <div>
                  <FormControlLabel value="ALL_EMPLOYEES" control={<Radio color="primary" />} label="All Employees" />
                  <FormControlLabel value="SELECT_EMPLOYEE" control={<Radio color="primary" />} label="Select Employee" />
                </div>
                <Button
                  color="primary"
                  startIcon={<AddIcon />}
                  variant="contained"
                  disableElevation
                  onClick={openNewPayrunDialog}
                >
                  Add Employee
                </Button>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              title="Employees"
              data={[]}
              columns={columns}
              options={options}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewPayrunDialog: () => dispatch(Actions.openNewPayrunDialog())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddEmployees);
