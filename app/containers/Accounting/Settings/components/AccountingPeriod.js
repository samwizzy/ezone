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
import { CheckIcon, DeleteIcon } from '@material-ui/icons';
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
  
  const {
    accountingSetupData,
    allAccountingPeriodData,
    openAccountPeriodDialogAction,
    editOpenAccountPeriodDialogAction,
    openDialogCloseAccountPeriodAction
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
                      {moment(accountingSetupData.companyStartDate).format('dddd do-MMM-YYYY')}
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
                {/* <TableRow>
                  <TableCell>Tax year starts</TableCell>
                  <TableCell>
                    <Box className={classes.box} p={2}>
                      { accountingSetupData.taxDay }-{ accountingSetupData.taxMonth }
                    </Box>
                  </TableCell>
                </TableRow> */}
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

                  {item.status && !item.activeYear ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={event => handleClick(event, item.id)}
                      >
                        Open InActive
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
                          onClick={() => openDialogCloseAccountPeriodAction(accountToUpdate)}
                        >
                          Close Period
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  ) : item.status && item.activeYear ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={event => handleClick(event, item.id)}
                      >
                        Open Active
                      </Button>
                    </TableCell>
                  ) : !item.status && !item.activeYear ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        onClick={event => handleClick(event, item.id)}
                      >
                        Closed
                      </Button>
                    </TableCell>
                  ) : null}
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
                  onClick={() => openAccountPeriodDialogAction() }
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
    openDialogCloseAccountPeriodAction: evt => dispatch(Actions.openDialogCloseAccountPeriod(evt)),
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
