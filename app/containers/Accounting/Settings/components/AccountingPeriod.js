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
import swal from 'sweetalert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Autocomplete } from '@material-ui/lab';
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
import { getAccountingPeriods } from '../../FixedAssets/crud';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[300],
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
    borderRadius:'8px'
  },
  lightLift: {
    marginBottom: '20px',
  },
  paperBase:{
    padding: theme.spacing(1, 2),
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastYear,setLastYear] = useState()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    
  };

  const handleClickClose = () => {
    setOpen(false);
  };
  
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

  const handleDateChange = (date) => {
    setValues({ ...values,startDate:(new Date(date)).toISOString(), year:(new Date(date)).getFullYear()})
  };

  const [currentAccountPeriod,setCurrentAccountPeriod] = useState({});
  const [accountingPeriods,setAccountingPeriods] = useState([]);

  const [values, setValues] = useState({
    orgId: "",
    startDate:(new Date('2019-01-18T21:11:54')).toISOString(),
    year: lastYear
  });

  const [accountToUpdate, setAccountToUpdate] = useState({
    id: "",
    orgId: "",
    year: ""
  });

  useEffect(() => {
    let mounted = true
    if(mounted){
      getAccountingPeriod();
    }
    return ()=>{
     mounted = false
    } 
  },[])


  async function getAccountingPeriod() {
    let currentY = `${new Date().getUTCFullYear()}`
    await crud.getAccountingPeriods().then(data=>{
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].activeYear){
        setCurrentAccountPeriod(data.data[0])
        setLastYear ((Number(data.data[i].year)));
        break;
        }
      }
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

  const [calenderDay, setCalenderDay] = useState(0);
  const [calenderMonth,setCalenderMonth] = useState(0);

  const months = [
    {
      value: 1,
      label: 'January',
    },
    {
      value: 2,
      label: 'Febuary',
    },
    {
      value: 3,
      label: 'March',
    },
    {
      value: 4,
      label: 'April',
    },
    {
      value: 5,
      label: 'May',
    },
    {
      value: 6,
      label: 'June',
    },
    {
      value: 7,
      label: 'July',
    },
    {
      value: 8,
      label: 'August',
    },
    {
      value: 9,
      label: 'September',
    },
    {
      value: 10,
      label: 'October',
    },
    {
      value: 11,
      label: 'November',
    },
    {
      value: 12,
      label: 'December',
    },
  ];

  function leapYear(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  function calculateDaysOfMonth(length) {
    let days = [{ label: '1', value: 1 }];
    for (let i = 2; i <= length; i++) {
      days = [...days, { label: `${i}`, value:i }];
    }
    return days;
  }

  function getDaysOfTheMonth(value) {
    switch (value) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return calculateDaysOfMonth(31);
      case '2': {
        if (leapYear(new Date().getFullYear())) {
          return calculateDaysOfMonth(29);
        }
        return calculateDaysOfMonth(28);
      }
      case 4:
      case 6:
      case 9:
      case 11:
        return calculateDaysOfMonth(30);
    }
  }

  const [dmonth, setDmonth] = useState(1);

  function setMonthForCalender(event, value) {
    setDmonth(value.value);
  }

  function monthOnly(month){
    switch(month){
      
        case 1 :
        return 'January'
        case 2 :
          return 'Febuary'
        case 3 :
         return 'March'  
         case 4 :
          return 'April'
        case 5 :
          return 'May'
        case 6 :
          return 'June'  
        case 7 :
          return 'July'
        case 8 :
          return 'August' 
        case 9 :
          return 'September' 
        case 10 :
          return 'October'   
        case 11 :
            return 'November'
         default :
         return 'December'  
    }
  }

  function formatDate(){
    //console.log(` full date ${(lastYear)} ${calenderDay} ${calenderMonth}`)
   let date = (new Date((lastYear + 1),(calenderDay),(calenderMonth -1))).toISOString();
   return date;
  }

  function addPeriod(){
    let payload ={
    activeYear: false,
    startDate:values.startDate,
    status: true,
    year: `${values.year}`
    }
    crud.creatAccountingPeriod(payload).then((data)=>{
      handleClickClose();  
    swal("Success", "Accounting Period added successfully", "success");
    }).catch((error)=>{
      swal("Error", "Something went wrong. Please check your network", "error");
    })
    
  }

  function isReady(){
    let currentY = new Date().getUTCFullYear()
    return currentY > values.year
  }

  //console.log('current period file -> ', JSON.stringify(accountingPeriods));
  //console.log('accountToUpdate state -> ',  JSON.stringify(accountingSetupData));


  return (
    <div>
      <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Start Date"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <div>
              <Paper elevation={1} className={classes.paperBase}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        format="MM/dd/yyyy"
                        margin="normal"
                        inputVariant="outlined"
                        name="previous"
                        size="small"
                        id="date-picker-startDate"
                        label="Finacial Year"
                        value={values.startDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
               {/*<Grid item xs={12}>
              <Box p={1} className={classes.boxed}>
                <div className={classes.lightLift}>
                  <Autocomplete
                    id="months"
                    options={months}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => {
                      setMonthForCalender(event, value);
                      setCalenderMonth(value.value);
                     
                    }}
                    style={{ width: 200 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        label={calenderMonth === 0 ? 'Select Month' : `Month ${monthOnly(calenderMonth)}`}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
                <div className={classes.lightLift}>
                  <Autocomplete
                    id="days"
                    options={getDaysOfTheMonth(dmonth)}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => { 
                      setCalenderDay(value.value)
                    }}

                    style={{ width: 200 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        label={calenderDay === 0 ? 'Select Day' : `Day ${calenderDay}`}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>
              </Box>
            </Grid>*/}
                </Grid>
              </Paper>
            </div>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClickClose} color="textSecondary">
            Cancel
          </Button>
          <Button disabled={!isReady()} variant="contained" onClick={()=>addPeriod()} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      </div>
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
                 <Typography variant="body1">Current Accounting Year</Typography>
                 </Grid>
                 <Grid item xs={8}>
                  <div style={{padding:'2px'}}>
                    <Paper elevation={2} className={classes.paper}>
                    <Grid container spacing={4}>
                      <Grid item xs={6}>
                     <Typography variant="subtitle1" >Start Date : {moment(currentAccountPeriod.startDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                      <Typography variant="subtitle1">End Date : {moment(currentAccountPeriod.endDate).format('YYYY-MM-DD')}</Typography>
                      </Grid>
                    </Grid>
                    </Paper>
                  </div>
                 </Grid>
                 <Grid item xs={4}>
                 <Button className={classes.curve}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={(e) =>{
                        e.preventDefault();
                        setOpen(true);
                        
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
  </div>
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
