import React, { memo,useState,useEffect } from 'react';
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
import * as crud from '../crud';
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
  curve:{
    borderRadius:'15px'
  },
	table: {
    display: "flex",
    flexDirection: "column",
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
    openDialogCloseAccountPeriodAction
  } = props;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentAccountPeriod,setCurrentAccountPeriod] = useState({});
  const [accountingPeriods,setAccountingPeriods] = useState([]);

  const [values, setValues] = useState({
    orgId: "",
    year: ""
  });

  const [accountToUpdate, setAccountToUpdate] = useState({
    id: "",
    orgId: "",
    year: ""
  });

  useEffect(() => {
    getAccountingPeriod() ; 
  },[])


  async function getAccountingPeriod() {
    await crud.getAccountingPeriods().then(data=>{
      setCurrentAccountPeriod(data.data[0])
      setAccountingPeriods(data.data);
    }).catch((err)=>{
     
      console.log(`Error from setUptins ${err}`)
    })
  }

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    const selectedAccountPeriod = allAccountingPeriodData 
    && allAccountingPeriodData.find(acc => id === acc.id);
    setAccountToUpdate({ 
      ...accountToUpdate, 
      id: selectedAccountPeriod.id,  
      orgId: selectedAccountPeriod.orgId,
      year: selectedAccountPeriod.year
    });
  };

  console.log('current period file -> ', JSON.stringify(accountingPeriods));
  //console.log('accountToUpdate state -> ',  JSON.stringify(accountingSetupData));


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
                      {moment(currentAccountPeriod.startDate).format('Do, MMM')}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Accounting Method</TableCell>
                  <TableCell>
                    <Box className={classes.box} p={2}>
                      {accountingSetupData.accountMethod}
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax year starts</TableCell>
                  <TableCell>
                    <Box className={classes.box} p={2}>
                      {/*{ accountingSetupData.taxDay }, { accountingSetupData.taxMonth }*/}
                      {moment(currentAccountPeriod.startDate).format('Do, MMM')}
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
             <div>
               <div style={{textAlign:'center',paddingLeft:'5em',paddingRight:'5em'}}>
               <Grid container spacing={2}>
                 <Grid item xs={12}>
                 <Typography variant="h6" component="h6">Current Accounting Year</Typography>
                 </Grid>
                 <Grid item xs={8}>
                  <div style={{backgroundColor:'#bbb',padding:'6px'}}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                     <Typography variant="subtitle1" >Start Date : {moment(currentAccountPeriod.startDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                      <Typography variant="subtitle1">End Date : {moment(currentAccountPeriod.endDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                    </Grid>
                  </div>
                 </Grid>
                 <Grid item xs={4}>
                 <Button className={classes.curve}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={(e) =>{
                        e.preventDefault();
                        
                      }}
                    >
                      Add Period
                  </Button>
                 </Grid>
               </Grid>
               </div>
             </div>

             <div>
               <div style={{textAlign:'center'}}>
               <Grid container spacing={3}>
                 {accountingPeriods.map((item) =>
                   <Grid key={item.id.toString()} item xs={12}>
                     <Grid container spacing={3}>
                     <Grid item xs={4}>
                      <Typography variant="subtitle1" >Start Date : {moment(item.startDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                       <Typography variant="subtitle1" >End Date : {moment(item.endDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        {item.status ?
                       <Typography variant="subtitle1" color="textSecondary" component="subtitle1">Open</Typography>
                       :
                       <Typography variant="subtitle1" style={{color:'red'}}>Close</Typography>
                        }
                       </Grid>
                     </Grid>
                   </Grid>
                 )}
               </Grid>
               </div>
             </div>

            {/*<Table size="small" className={classes.table}>
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
                        name="endDate"
                        size="small"
                        id="date-picker-startDate"
                        label="End Date"
                        value={values.endDate}
                        onChange={(date, formatted) => handleDateChange(date, formatted, 'endDate')}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </TableCell>

                  {item.status && !item.activeYear ? (
                    <TableCell component="th">
                      <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        size="small"
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
                        size="small"
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
                        size="small"
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
                <TableRow>
                  <TableCell colSpan={7}>
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
                  </TableCell>
                </TableRow>
              </TableFooter>
                  </Table>*/}

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
