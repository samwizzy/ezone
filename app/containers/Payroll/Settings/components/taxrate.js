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
import swal from 'sweetalert';
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

const TaxRate = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [loadin,setLoadin] = useState(false)
    const [isUpdate,setIsUpdate] = useState(false)
    const handleClickClose = () => {
        setOpen(false);
      };
    const [taxType, setTaxType] = useState() 

    const [values,setValues] = useState({
        description: '',
        id: 0,
        name: '',
        orgId: '',
        rate: 0,
        taxType: ''
    })

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    const currenciesDetails =[
        {
            rate:'20%',
            name:'Dollar',
            taxType:'VAT'
        },
        {
            rate:'30%',
            name:'Euro',
            taxType:'VAT'
        },
        {
            rate:'10%',
            name:'Pounds Sterling',
            taxType:'VAT'
        }
    ]

    //Get needed parameters
    useEffect(() => {
      let mounted = true
      if(mounted){
        getRequiredParameter()
      }
      return ()=>{
        mounted = false
      } 
    },[])

    function getRequiredParameter(){
      let type = []
      crud.getTaxType()
      .then((data)=>{
        for(let i=0;i<data.data.length;i++){
          type.push({
          description: data.data[i].description,
          id: data.data[i].id,
          name: data.data[i].name,
          orgId: data.data[i].orgId,
          rate: data.data[i].rate,
          taxType: data.data[i].taxType
        })
        }
       setTaxType(type)
      })
    }


    function updateTaxController(){

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
        <DialogTitle id="alert-dialog-slide-title">{"New Tax rate"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <div>
              <Paper elevation={1} className={classes.paper}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
              <Box p={1} className={classes.boxed}>
                <div className={classes.lightLift}>
                  <Autocomplete
                    id="taxtype"
                    options={taxType}
                    getOptionLabel={option => option.taxType}
                    onChange={(event, value) => {
                      setValues({...values,
                        id: value.id,
                        name: value.name,
                        orgId: value.orgId,
                        taxType: value.taxType
                      })
                      //setMonthForCalender(event, value);
                      //(value.value);
                     
                    }}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size={'small'}
                        //label={calenderMonth === 0 ? 'Select Month' : `Month ${monthOnly(calenderMonth)}`}
                        label="Tax Type"
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
                        size={'small'}
                        value={values.name}
                        label="Tax Name"
                        fullWidth
                        onChange={handleChange('name')}
                        variant="outlined" 
                      />
                    
                </div>
                <div className={classes.lightLift}>
                  
                <TextField
                        size={'small'}
                        value={values.rate}
                        label="Tax Rate"
                        type="number"
                        onChange={handleChange('rate')}
                        variant="outlined" 
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
          <Button variant="contained" color="primary">
            Add
          </Button>
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
                     Add Tax rate
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
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Rate
                                       </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         Tax Type
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
                                       <Grid item xs={4}>
                                        <Typography variant="subtitle1" gutterBottom>
                                         {currency.rate}
                                       </Typography>
                                       </Grid>
                                       <Grid item xs={4}>
                                       <Typography variant="subtitle1" gutterBottom>
                                         {currency.taxType}
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
 
export default TaxRate;