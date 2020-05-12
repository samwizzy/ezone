import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  makeStyles, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableRow, 
  TableCell, 
  TextField, 
  Toolbar, 
  Typography 
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
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

  const {
    dispatchGetAccountingSetupAction
  } = props;

  const [values, setValues] = React.useState({
    entries: [],
    note: '',
    // orgId: currentUser.organisation.orgId,
    periodId: '',
    reference: '',
    transactionDate: moment(new Date()).format('YYYY-MM-DD'),
  });

  // const addRow = () => {
  //   const item = {
  //     accountId: 0,
  //     credit: 0,
  //     debit: 0,
  //     description: '',
  //   };
  //   setValues({...values, "entries": [ ...values.entries, item ]});
  // };

  // const removeRow = index => {
  //   values.entries.splice(index, 1);
  //   setValues({ ...values });
  // };

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  // const handleSelectChange = (name, value) => {
  //   setValues({ ...values, periodId: value.id });
  // };

  // const handleRowChange = (event, index) => {
  //   const entries = [...values.entries]
  //   entries[index][event.target.name] = event.target.value
  //   setValues({...values, entries})
  // }

  // const handleSelectChangeRows = (event, value, index) => {
  //   const { entries } = values;
  //   entries[index]["accountId"] = value.id;
  //   setValues({ ...values, entries });
  // };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAccountingSetupAction();
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
                    <TableCell>
                      <Box className={classes.box} p={2}>15th July</Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Accounting Method</TableCell>
                    <TableCell>
                      <Box className={classes.box} p={2}>Accrual</Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax year starts</TableCell>
                    <TableCell>
                      <Box className={classes.box} p={2}>15th July</Box>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Type</TableCell>
                    <TableCell>
                      <Box className={classes.box} p={2}>Limited Liability</Box>
                    </TableCell>
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
                  {[0,1,2].map((field, i) => (
                  <TableRow key={i}>
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
                    <TableCell component="th">
<<<<<<< HEAD
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        // endIcon={<DeleteIcon />}
                        disabled={true}
                        onClick={event => handleClick(event, item.id)}
                      >
                        Closed
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>View</MenuItem>
                      </Menu>
=======
                      <Typography variant="subtitle1">
                        Opened
                      </Typography>
>>>>>>> 17f179ab44e3e6191bffdeaf274f5a7357aa90d9
                    </TableCell>
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
    dispatchGetAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
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
