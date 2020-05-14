import React, { memo } from 'react';
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
import { Add, Check, Delete } from '@material-ui/icons';
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
import moment from 'moment';
// import ModuleLayout from '../../components/ModuleLayout';
import months from './../../../../utils/months';


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
    whiteSpace: "nowrap",
    '& .MuiTableFooter-root': {},
    '& th.MuiTableCell-root': {
			borderBottom: 'none !important',
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none !important'
    },
  },
}));

const AccountingPeriod = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const {
    accountingSetupData,
    allAccountingPeriodData,
    openAccountPeriodDialogAction,
    editOpenAccountPeriodDialogAction,
    dispatchUpdateAccountPeriodAction
  } = props;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [values, setValues] = React.useState({
    orgId: "",
    year: ""
  });

  const [accountToUpdate, setAccountToUpdate] = React.useState({
    id: "",
    orgId: "",
    year: ""
  });

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    const selectedAccountPeriod = allAccountingPeriodData && allAccountingPeriodData.find(acc => id === acc.id);
    setAccountToUpdate({ 
      ...accountToUpdate, 
      id: selectedAccountPeriod.id,  
      orgId: selectedAccountPeriod.orgId,
      year: selectedAccountPeriod.year
    });
  };

  console.log('allAccountingPeriodData period file -> ', allAccountingPeriodData);
  console.log('accountToUpdate state -> ', accountToUpdate);


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
                      {moment(accountingSetupData.companyStartDate).format('Do, MMM')}
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
                      { accountingSetupData.taxDay }, { accountingSetupData.taxMonth }
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
                {allAccountingPeriodData && allAccountingPeriodData.map(item => (
                <TableRow>
                  <TableCell component="th">Name</TableCell>
                  <TableCell>
                    <TextField 
                      id="outlined-basic" 
                      label="Name" 
                      variant="outlined" 
                      value={item.year}
                      size="small"
                      margin="normal"
                    />
                  </TableCell>
                  <TableCell component="th">Start Date</TableCell>
                  <TableCell>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        format="MM/dd/yyyy"
                        margin="normal"
                        inputVariant="outlined"
                        size="small"
                        name="startDate"
                        id="date-picker-startDate"
                        label="Start Date"
                        value={values.startDate}
                        onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>
                  <TableCell component="th">End Date</TableCell>
                  <TableCell>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        format="MM/dd/yyyy"
                        margin="normal"
                        inputVariant="outlined"
                        name="startDate"
                        size="small"
                        id="date-picker-startDate"
                        label="Start Date"
                        value={values.startDate}
                        onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>

                  {item.status && item.activeYear ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        // endIcon={<CheckIcon />}
                        size="small"
                        onClick={event => handleClick(event, item.id)}
                      >
                        Open Active
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem 
                          onClick={() => editOpenAccountPeriodDialogAction(accountToUpdate)}
                        >
                          Set As Active 
                        </MenuItem>
                        <MenuItem
                          onClick={() => dispatchUpdateAccountPeriodAction(accountToUpdate)}
                        >
                          Close Period
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  ) : item.status && !item.activeYear ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        // endIcon={<CheckIcon />}
                        size="small"
                        onClick={event => handleClick(event, item.id)}
                      >
                        Open Inactive
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem 
                          onClick={() => editOpenAccountPeriodDialogAction(accountToUpdate)}
                        >
                          Set As Active 
                        </MenuItem>
                        <MenuItem
                          onClick={() => dispatchUpdateAccountPeriodAction(accountToUpdate)}
                        >
                          Close Period
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  ) : (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        // endIcon={<DeleteIcon />}
                        size="small"
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
                    </TableCell>
                  )}
                </TableRow>
                ))}
              </TableBody>
              <TableFooter>
              <Tooltip title="Create Account Period">
                <Button
                  variant="contained"
                  color="default"
                  // size="small"
                  className={classes.button}
                  onClick={() => openAccountPeriodDialogAction()}
                  startIcon={<Add />}
                  disableElevation
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
    editOpenAccountPeriodDialogAction: evt => dispatch(Actions.editOpenAccountPeriodDialog(evt)),
    dispatchUpdateAccountPeriodAction: evt => dispatch(Actions.updateAccountPeriodAction(evt)),
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
