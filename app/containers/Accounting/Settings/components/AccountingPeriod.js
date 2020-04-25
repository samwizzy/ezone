import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  makeStyles, 
  Box, 
  Button, 
  Menu,
  MenuItem,
  Grid, 
  Paper, 
  Table, 
  TableBody,
  TableFooter, 
  TableRow, 
  TableCell, 
  TextField, 
  Toolbar, 
  Typography,
  Tooltip
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
import DialogOfAccountPeriod from './DialogOfAccountPeriod';
// import reducer from '../../reducer';
// import saga from '../../saga';
// import ModuleLayout from '../../components/ModuleLayout';


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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    accountingSetupData,
    allAccountingPeriodData,
    openAccountPeriodDialogAction,
    editOpenAccountPeriodDialogAction
  } = props;

  const [values, setValues] = React.useState({
    dateCreated: "",
    endDate: "",
    orgId: "",
    startDate: "",
    status: "",
    year: ""
  });

  console.log('allAccountingPeriodData period file -> ', allAccountingPeriodData);
  console.log('status -> ', allAccountingPeriodData[0].status);

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


  return (
    <React.Fragment>
      <DialogOfAccountPeriod />
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
                    <Box className={classes.box} p={2}>
                      { accountingSetupData.companyStartDate }
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Accounting Method</TableCell>
                  <TableCell>
                    <Box className={classes.box} p={2}>
                      { accountingSetupData.accountMethod }
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax year starts</TableCell>
                  <TableCell>
                    <Box className={classes.box} p={2}>
                      { accountingSetupData.taxDay }-{ accountingSetupData.taxMonth }
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax Type</TableCell>
                  <TableCell>
                    <Box className={classes.box} p={2}>
                      { accountingSetupData.taxType }
                    </Box>
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
                {allAccountingPeriodData.map(item => (
                <TableRow>
                  <TableCell component="th">Name</TableCell>
                  <TableCell>
                    <TextField 
                      id="outlined-basic" 
                      label="Outlined" 
                      variant="outlined" 
                      value={item.year}
                    />
                  </TableCell>
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
                  {allAccountingPeriodData.status ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={handleClick}
                      >
                        Open
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Edit</MenuItem>
                        <MenuItem onClick={handleClose}>View</MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </TableCell>
                  ) : (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={handleClick}
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
                        <MenuItem 
                          onClick={() => editOpenAccountPeriodDialogAction()}
                        >
                          Edit
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  )}
                </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              <Tooltip title="Create Account Period">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className={classes.button}
                  onClick={() => openAccountPeriodDialogAction()}
                >
                  Add more
                </Button>
              </Tooltip>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  </React.Fragment>
  );
};

AccountingPeriod.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  accountingSetupData: Selectors.makeSelectGetAccountingSetupData(),
  allAccountingPeriodData: Selectors.makeSelectGetAllAccountingPeriodData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openAccountPeriodDialogAction: () => dispatch(Actions.openAccountPeriodDialog()),
    editOpenAccountPeriodDialogAction: () => dispatch(Actions.editOpenAccountPeriodDialog()),
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
