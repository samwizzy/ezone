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
import CircularProgress from '@material-ui/core/CircularProgress';
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

const Currencies = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [isUpDate,setIsUpDate] = useState(false)
    const [loadin,setLoadin] = useState(false)
    const [currencies,setCurrencies] = useState([])
    const handleClickClose = () => {
        setOpen(false);
      };
    
      const [values,setValues] = useState({
        code:'',
        description:'',
        name:'',
        symbol:''
      })

    const currenciesDetails =[
        {
            code:'USD',
            name:'Dollar',
            symbol:'&#x24;'
        },
        {
            code:'EUR',
            name:'Euro',
            symbol:'&#x20AC;'
        },
        {
          code:'CENT',
          name:'Cent',
          symbol:'&#xa2;'
      },
      {
        code:'PUD',
        name:'Pounds',
        symbol:'&#xa3;'
    },
    {
      code:'YEN',
      name:'Yen',
      symbol:'&#xa5;'
  },
  {
    code:'RUPEE',
    name:'Rupee',
    symbol:'&#x20B9;'
},
{
  code:'RUBLE',
  name:'Ruble',
  symbol:'&#x20BD;'
},
{
  code:'NGN',
  name:'Naira',
  symbol:'&#x20A6;'
}
    ]


    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    useEffect(() => {
      getCurrencies()
      return () =>{
        getCurrencies()
      }
      },[])
      
     function getCurrencies(){
       let total = []
       crud.getCurrencies()
       .then((data)=>{
         for(let i =0;i<data.data.length; i++){
         total.push({
          code:data.data[i].code,
          id:data.data[i].id, 
          description:data.data[i].description,
          name:data.data[i].name,
          symbol:data.data[i].symbol
      })
         }
         setCurrencies(total)
       })
       .catch((error)=>{
         console.log(`Error in Currency ${error}`)
       })
     }

     function saveCurrency(){
      setLoadin(true) 
     crud.saveCurrencies(values)
     .then((date)=>{
      getCurrencies()
      swal("Success","Currency added successfully","success");
      setLoadin(false)
     })
     .catch((error)=>{
      console.log(`Error in Currency ${error}`)
      swal("Error","Something went wrong","error");
      setLoadin(false)
     })
     }

     function updateCurrency(){
      setLoadin(true) 
     crud.updateCurrency(values)
     .then((date)=>{
      getCurrencies()
      swal("Success","Currency Updated successfully","success");
      setLoadin(false)
      setOpen(false)
     })
     .catch((error)=>{
      console.log(`Error in Currency ${error}`)
      swal("Error","Something went wrong","error");
      setLoadin(false)
     })
     }

     function retriveUpdate(value){
      setValues({...values,code:value.code,
        id:value.id, 
        description:value.description,
        name:value.name,
        symbol:value.symbol})
      setIsUpDate(true)
      setOpen(true)
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
        <DialogTitle id="alert-dialog-slide-title">{"New Currency"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <div>
              <Paper elevation={1} className={classes.paper}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
              <Box p={1} className={classes.boxed}>
                <div className={classes.lightLift}>
                  <Autocomplete
                    id="code"
                    inputValue={values.code}
                    options={currenciesDetails}
                    getOptionLabel={option => option.code}
                    onChange={(event, value) => { 
                      setValues({...values,code:value.code,name:value.name,symbol:value.symbol})
                    }}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        label="Code"
                        value={values.code}
                        
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
                    id="cname"
                    inputValue={values.name}
                    options={currenciesDetails}
                    getOptionLabel={option => option.name}
                    onChange={(event, value) => { 
                     setValues({...values,code:value.code,name:value.name,symbol:value.symbol})
                    }}

                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        label="Currency Name"
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
                    id="symbol"
                    inputValue={values.name}
                    options={currenciesDetails}
                    getOptionLabel={option => option.name}
                    onChange={(event, value) => { 
                      setValues({...values,code:value.code,name:value.name,symbol:value.symbol})
                    }}

                    style={{ width:'100%'}}
                    renderOption={option => (
                        <React.Fragment>
                          <span dangerouslySetInnerHTML={ {__html:option.symbol} }></span>
                        </React.Fragment>
                      )}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        label="Currency Symbol"
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
                <TextField 
                        id="description"
                         label="Description"
                         value={values.description}
                         onChange ={handleChange('description')}
                         size={'small'}
                          variant="outlined"
                           margin="normal"
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
          {!isUpDate?
          (!loadin ?
          <Button variant="contained" onClick={()=> saveCurrency()} color="primary">
            Add New
          </Button>
          :
          <CircularProgress size={30}/>
          )
          :
          (!loadin ?
            <Button variant="contained" onClick={()=> updateCurrency()} color="primary">
            Update
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
                             Currencies
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
                        setIsUpDate(false)
                        setOpen(true);
                        
                        
                      }}
                    >
                     New Currency
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
                                         Code
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Name
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Symbol
                                       </Typography>
                                        </Grid>
                                    </Grid>
                                 </div>
                             </Grid>
                             <Grid item xs={12}>
                                 <div style={{paddingLeft:'20px'}}>
                             <Grid container spacing={3}>
                                 {currencies.map((currency)=>
                                  <Grid key={currency.code} item xs={12}>
                                      <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                        <Grid container spacing={3}> 
                                        <Grid item xs={3}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {currency.code}
                                       </Typography>
                                       </Grid>

                                       <Grid item xs={3}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {currency.name}
                                       </Typography>
                                       </Grid>
                                       <Grid item xs={3}>
                                       <Typography variant="subtitle1" gutterBottom>
                                         <span style={{fontSize:25,position:'relative',top:'-.4em'}} dangerouslySetInnerHTML={ {__html:currency.symbol} }/>
                                       </Typography>
                                        
                                       </Grid>
                                       <Grid item xs={3}>
                                       <div style={{position:'relative',top:'-10px'}}>
                                         <Button onClick={()=>retriveUpdate(currency)} variant="contained" color="primary">
                                          Update
                                          </Button>
                                         </div>
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
 
export default Currencies;