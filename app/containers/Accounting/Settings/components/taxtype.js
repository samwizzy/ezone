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
import { Euro, AttachMoney, Delete } from '@material-ui/icons';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogOfAccountPeriod from './DialogOfAccountPeriod';
import moment from 'moment';
// import ModuleLayout from '../../components/ModuleLayout';
import months from './../../../../utils/months';

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
      backgroundColor: theme.palette.grey[100],
    },
    grid: {
      justifyContent: "space-between",
      '& .MuiGrid-item': {
        flex: 1,
        margin: theme.spacing(2, 0),
      }
    },
    base:{
     padding:'18px'
    },
    header:{
    backgroundColor:'#bbb',
    margin:'10px',
    padding:'15px'
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
    softLift:{
     padding:'10px'
    },
    paper:{padding:'5px'},
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

const TaxType = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClickClose = () => {
        setOpen(false);
      };
      const [loadin,setLoadin] = useState(false)
      const [isUpdate,setIsUpate] = useState(false)
    const [currenciesDetails,setCurrenciesDetails] =useState([]) 

    const [values,setValues] = useState({
      taxType:'',
      description:''
    })

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    //Update
    useEffect(() => {
      getTaxType();
      return ()=>{
        getTaxType()
      } 
    },[])

    function getTaxType(){
      let taxes = []
      crud.getTaxType()
      .then((data)=>{
       for(let i=0;i<data.data.length;i++){
        taxes.push({taxType:data.data[i].taxType,description:data.data[i].description})
       }
       setCurrenciesDetails(taxes)
      })
      .catch((data)=>{

      })
    }

    function createTaxType(){
      setLoadin(true)
      crud.saveTaxType(values)
      .then((data)=>{
        swal("Success","Tax type created successfully","success");
        setLoadin(false)
      })
      .catch((error)=>{
        swal("Error","Something went wrong","error");
        setLoadin(false)
      })
    }

    function isReady(){
      return values.taxType.length >= 1 && values.description.length >= 1 
    }



    return ( 
        <div className={classes.base}>
           
      <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"New Tax type"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <div>
              <Paper elevation={1} className={classes.paper}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
              <Box p={1} className={classes.boxed}>
                <div className={classes.lightLift}>
                <TextField
                        size={'small'}
                        value={values.taxType}
                        onClick={handleChange('taxType')}
                        label="Tax type name"
                        variant="outlined"
                        fullWidth
                      />
                  {/*<Autocomplete
                    id="name"
                    options={currenciesDetails}
                    getOptionLabel={option => option.name}
                    onChange={(event, value) => {
                      //setMonthForCalender(event, value);
                      //(value.value);
                     
                    }}
                    style={{ width:300}}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        //label={calenderMonth === 0 ? 'Select Month' : `Month ${monthOnly(calenderMonth)}`}
                        label="Tax type name"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />*/}
                </div>
                <div className={classes.lightLift}>
                <TextField
                        size={'small'}
                        onClick={handleChange('description')}
                        label="Description"
                        value={values.description}
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                      />
                </div>
                
              </Box>
            </Grid>
                </Grid>
              </Paper>
            </div>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClickClose} color="textSecondary">
            Cancel
          </Button>
          {isUpdate ?
          (!loadin ?
            <Button variant="contained" color="primary">
            Update
          </Button>
          :
          <CircularProgress size={30}/>
          )
          :
          (!loadin?
          <Button variant="contained" onClick={()=>createTaxType()} color="primary">
            Add
          </Button>
          :
          <CircularProgress size={30}/>
          )
          }
        </DialogActions>
      </Dialog>
      </div>
            
            <div>
           <Paper elevation={2} className={classes.paper}>
               <Grid container spacing={3}>
                 
                 <Grid item xs={12}>
                     <div className={classes.softLift}>
                     <Grid container spacing={10}>
                         <Grid item xs={3}>
                             <div>
                             <Typography variant="subtitle1" gutterBottom>
                             Taxes
                           </Typography>
                             </div>
                         </Grid>
                         <Grid item xs={9}>
                             <div>
                                 <div style={{float:'right'}}>
                                 <Button className={classes.curve}
                      variant="contained"
                      color="primary"
                      type="button"
                      onClick={(e) =>{
                        e.preventDefault();
                        setOpen(true);
                        
                      }}
                    >
                     Add Tax Type
                  </Button>
                                 </div>
                             </div>
                         </Grid>
                     </Grid>
                     </div>
                 </Grid>
                 
                 <Grid item xs={12}>
                     <div>
                         <Grid container spacing={3}>
                             <Grid item xs={12}>
                                 <div className={classes.header}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Name
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Description
                                       </Typography>
                                        </Grid>
                                    </Grid>
                                 </div>
                             </Grid>
                             <Grid item xs={12}>
                                 <div style={{paddingLeft:'20px'}}>
                             <Grid container spacing={3}>
                                 {currenciesDetails.map((currency)=>
                                  <Grid key={currency.name} item xs={12}>
                                      <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                        <Grid container spacing={3}> 
                                       <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {currency.name}
                                       </Typography>
                                       </Grid>
                                       <Grid item xs={8}>
                                       <Typography variant="subtitle1" gutterBottom>
                                         {currency.description}
                                       </Typography>
                                       </Grid>
                                       </Grid>
                                       </Grid>
                                       </Grid>
                                  </Grid>
                                  
                                 )}
                                
                            </Grid>
                            </div>     
                            </Grid> 
                         </Grid>
                     </div>
                 </Grid>
                   

               </Grid>
           </Paper>
           </div>
        </div>
     );
}
 
export default TaxType;