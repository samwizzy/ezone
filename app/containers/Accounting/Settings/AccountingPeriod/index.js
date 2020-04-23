import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Button, Grid, Paper, Table, TableBody, TableRow, TableCell, TextField, Toolbar, Typography } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from '../../reducer';
import saga from '../../saga';
import ModuleLayout from '../../components/ModuleLayout';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    }
  },
  box: {
		backgroundColor: theme.palette.grey[200]
	},
	table: {
    '& .MuiTableFooter-root': {},
    '& th.MuiTableCell-root': {
			borderBottom: 'none !important',
			width: '10%'
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none !important'
    },
  },
}));

const AccountingPeriod = props => {
  const classes = useStyles();

  const {} = props;

  const [values, setValues] = React.useState({
    entries: [],
    note: '',
    // orgId: currentUser.organisation.orgId,
    periodId: '',
    reference: '',
    transactionDate: moment(new Date()).format('YYYY-MM-DD'),
  });

  const addRow = () => {
    const item = {
      accountId: 0,
      credit: 0,
      debit: 0,
      description: '',
    };
    setValues({...values, "entries": [ ...values.entries, item ]});
  };

  const removeRow = index => {
    values.entries.splice(index, 1);
    setValues({ ...values });
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, periodId: value.id });
  };

  const handleRowChange = (event, index) => {
    const entries = [...values.entries]
    entries[index][event.target.name] = event.target.value
    setValues({...values, entries})
  }

  const handleSelectChangeRows = (event, value, index) => {
    const { entries } = values;
    entries[index]["accountId"] = value.id;
    setValues({ ...values, entries });
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  }, []);

  return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={5}>
            <Toolbar>
              <Typography variant="h4">Settings</Typography>
            </Toolbar>
            <Paper square elevation={0}>
              <Toolbar>
                <Typography variant="h6">Accounting Period</Typography>
              </Toolbar>
              <Table size="small" className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>Financial Year Start</TableCell>
                    <TableCell><Box className={classes.box} p={2}>15th July</Box></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Accounting Method</TableCell>
                    <TableCell><Box className={classes.box} p={2}>Accrual</Box></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax year starts</TableCell>
                    <TableCell><Box className={classes.box} p={2}>15th July</Box></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Type</TableCell>
                    <TableCell><Box className={classes.box} p={2}>Limited Liability</Box></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={7}></Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Paper square elevation={0}>
              <Toolbar>
                <Typography variant="h6">Accounting Years</Typography>
              </Toolbar>
              <Table size="small" className={classes.table}>
                <TableBody>
                  {[0,1,2].map(filed => (
                  <TableRow>
                    <TableCell component="th">Name</TableCell>
                    <TableCell><TextField id="outlined-basic" label="Outlined" variant="outlined" /></TableCell>
                    <TableCell component="th">Start Date</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          format="MM/dd/yyyy"
                          margin="normal"
                          inputVariant="outlined"
                          name="startDate"
                          id="date-picker-startDate"
                          label="Start Date"
                          value={values.startDate}
                          onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell component="th">End Date</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          format="MM/dd/yyyy"
                          margin="normal"
                          inputVariant="outlined"
                          name="startDate"
                          id="date-picker-startDate"
                          label="Start Date"
                          value={values.startDate}
                          onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          fullWidth
                        />
                      </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell component="th"><Typography variant="subtitle1">Opened</Typography></TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
};

AccountingPeriod.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountingPeriod);
