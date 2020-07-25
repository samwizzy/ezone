import React,{useState,useContext,useEffect} from 'react';
import {
    makeStyles,
    Button,
    Menu,
    TextField,
    Paper,
    Typography,
    MenuItem,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormControl,
    Grid
  } from '@material-ui/core';
  import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import SendIcon from '@material-ui/icons/ArrowBack';
  import BackIcon from '@material-ui/icons/ArrowBack';
  import CircularProgress from '@material-ui/core/CircularProgress';
  import * as crud from './crud';
  import swal from 'sweetalert';
  import { BrowserRouter as Router, Switch,useParams, Route,useRouteMatch } from "react-router-dom";
  import * as Enum from '../Settings/enums';
  import { SettingContext } from '../Settings/components/SettingsLayout';

  const useStyles = makeStyles(theme => ({
    root: {
      padding:'10px'
    },
    label: { marginLeft: theme.spacing(1) },
    title: {padding:'7px' },
    iconPaper: {
      boxShadow: theme.shadows[1]
    },
    inputBox:{
        width:'100%'
    },
    titleText:{
        fontWeight:600,
        color:'black'
    },
    curve:{
        borderRadius:'6px'
    },
    lift:{
    marginTop:'1.1em'
    },
    liftMargin:{
      marginTop:'-1.1em'
      },
    bColored:{
        width:'300px',
        height:'240px',
        border:'2px sold blue'
    }
  }));

  

const DepreciationSetup = () => {
    const classes = useStyles();
    const settingContext = useContext(SettingContext);
    const [method,setMethod] = useState('Straightline');
    const [calculation,setCalculation] = useState('ATU');
    const [isCreated, setIsCreated] = useState(false);
    const methodType = Enum.DeprecitionMethod
    const [loadin,setLoadin] = useState(false);

  const [selectedDate, setSelectedDate] = useState();

  const handleDateChangeFrom = (date) => {
    setValues({ ...values, validFrom: (new Date(date)).toISOString() });
  };

  const handleDateChangeTo = (date) => {
    setValues({ ...values, validTo: (new Date(date)).toISOString() });
  };

    const [values,setValues] = useState({
      calculationBase: 'MONTHLY',
      code: '',
      depreciatedValue: '',
      //depreciationRate:0,
      description: '',
      method: 'STRAIGHT_LINE',
      percentageValue: '',
      validFrom: getInitialDate('from'),
      validTo: getInitialDate('to')
    })

    function getInitialDate(value){
     let date = new Date();
     let month = date.getUTCMonth()
     let day = date.getUTCDate()
     let year = value==='from'?date.getUTCFullYear():date.getUTCFullYear() + 1
     return (new Date(`${year}-${month}-${day}`)).toISOString()
    }

    useEffect(() => {
      checkAlreadyCreated()
      return () =>{
        checkAlreadyCreated()
      }
      },[])

      function checkAlreadyCreated(){
        crud.getDeprecitionType()
        .then((data)=>{
          if(data.data.length > 0){
            setValues({
              ...values,
              calculationBase:data.data[0].calculationBase,
              code: data.data[0].code,
             depreciatedValue: data.data[0].depreciatedValue,
            //depreciationRate:0,
            description: data.data[0].description,
           method: data.data[0].method,
          percentageValue: data.data[0].percentageValue,
          validFrom: data.data[0].validFrom,
          validTo: data.data[0].validTo
            })
            setIsCreated(true)
          }
         console.log(`DepreciationType...... ${JSON.stringify(data.data)}`)
        })
        .catch((error)=>{

        })
      }

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };
      
    function validatePercentage(e){
      let percent = Number(e.target.value)
      if( percent >  0 && percent < 100){
      
      }
      else{
        setValues({ ...values, percentageValue:'' }); 
      }

      }

    const calculationBase = Enum.DepreciationCalculationBase

    function isReady(){
      return values.code.length >= 1 
      && values.depreciatedValue.length >= 1
       && values.description.length > 1
       && values.percentageValue.length > 1
    }

    function calculationConverter(value){
      switch(value){
        case 'NBA':
          return 'Netbook value / Remaining life';
        case 'POA':
        return 'Percentage of Aquisition value';  
        default:
         return 'Aquisition / Total useful';   
      }
    }
   

   function calculationBaseConverter(value){
     switch(value){
     case 'QUARTERLY':
       return 'Quarterly' 
       default:
         return 'Monthly' 
     }
   }

    function methodConverter(value){
      switch(value){
      case 'UNIT_OF_PRODUCTION':
        return 'Unit of Production'
      case 'SUM_OF_THE_YEAR_DIGIT':
       return 'Sum of the year Digit'
       case 'DOUBLE_DECLINING':
       return 'Double Declining'
       case 'REDUCING_BALANCE':
      return 'Reducing Balance'
      default:
        return 'Straight Line'  

      }
    }


    function updateDeprecitionType(){
      setLoadin(true);
      crud.updateDeprecitionType(values)
     .then((data)=>{
      checkAlreadyCreated()
      swal("Success","Depreciation Type Updated successfully","success");
      setLoadin(false)
     })
     .catch((error)=>{
      swal("Error","Something went wrong. Please check your connection","error");
      setLoadin(false)
     })
    }

    function saveDeprecitionType(){
      setLoadin(true);
      crud.saveDeprecitionType(values)
     .then((data)=>{
      checkAlreadyCreated()
      swal("Success","Depreciation Type created successfully","success");
      setLoadin(false)
     })
     .catch((error)=>{
      swal("Error","Something went wrong. Please check your connection","error");
      setLoadin(false)
     })
    }

    console.log(`values  got it  -> `, values);

    return (  
        <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={2}>
                <div className={classes.title}>
                      <Typography variant="h6" className={classes.titleText} component="h1">
                     Depreciation Type Setup
                     </Typography>
                      </div>
                </Paper>
              </Grid>

              <Grid item xs={12}>
               <Paper elevation={3} className={classes.root}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                      <TextField 
                        id="code"
                         label="Code"
                         value={values.code}
                         onChange ={handleChange('code')}
                         size={'small'}
                          variant="outlined"
                           margin="normal"
                           fullWidth
                          />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField className={classes.inputBox}
                        id="description"
                         label="Description"
                         value={values.description}
                         onChange ={handleChange('description')}
                         size={'small'}
                          variant="outlined"
                           margin="normal"
                          />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={4} >
                      <Grid item xs={12}>
                      <div className={classes.lift}>
                          <Autocomplete className={classes.inputBox}
                              defaultValue={{ value:values.method, label:methodConverter(values.method)}}
                              id="methodType"
                              onChange={(event, value) => {
                               setValues({...values,method:value.value})
                              }}
                             options={methodType}
                             getOptionLabel={(option) => option.label}
                             
                         renderInput={(params) => 
                         <TextField {...params} 
                         size={'small'}
                         label="Method"
                          variant="outlined" />}
                          />
                     </div>
                      </Grid>
                      <Grid item xs={12}>
                      <div className={classes.lift}>
                          <Autocomplete className={classes.inputBox}
                              id="calculationBase"
                              defaultValue={{ value:values.calculationBase, label:calculationBaseConverter(values.calculationBase)}}
                             options={calculationBase}
                             getOptionLabel={(option) => option.label}
                             onChange={(event, value) => {
                              setValues({...values,calculationBase:value.value})
                             }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         size={'small'}
                         label="Calculation Base"
                          variant="outlined" />}
                          />
                     </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
               </Paper>
              </Grid>

              {/*{
                method === 'Straightline'?*/}
                
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={3} className={classes.root}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField className={classes.inputBox}
                        id="mindepreciationvalue"
                        type="number"
                        value={values.depreciatedValue}
                         label="Minimum Depreciated value(Residual value)"
                         onChange ={handleChange('depreciatedValue')}
                          variant="outlined"
                          size={'small'}
                           margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField className={classes.inputBox}
                        id="salvagevalue"
                         label="Salvage value percentage"
                         type="number"
                         value={values.percentageValue}
                         onChange ={handleChange('percentageValue')}
                         onBlur={validatePercentage}
                          variant="outlined"
                          size={'small'}
                           margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12}>
                        <div className={classes.title}>
                      <Typography variant="h6" color="textSecondary" component="h1">
                      Estimated Useful life
                     </Typography>
                      </div>
                        </Grid>
                        <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                  disableToolbar
                  label="From"
                  inputVariant="outlined"
                  size={'small'}
                  format="MM/dd/yyyy"
                   margin="normal"
                   fullWidth
                  id="from"
                value={values.validFrom}
                onChange={handleDateChangeFrom}
                KeyboardButtonProps={{
              'aria-label': 'change date',
               }}
              />
               </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                  disableToolbar
                  inputVariant="outlined"
                  label="To"
                  size={'small'}
                  format="MM/dd/yyyy"
                   margin="normal"
                  id="to"
                  fullWidth
                value={values.validTo}
                onChange={handleDateChangeTo}
                KeyboardButtonProps={{
              'aria-label': 'change date',
               }}
              />
               </MuiPickersUtilsProvider>
                        </Grid>
                      </Grid>
                    </Paper>

                  </Grid>

                  {/*<Grid item xs={12}>
                   <Paper elevation={3} className={classes.root}>
                     <Grid container spacing={3}>
                       <Grid item xs={12}>
                       <div className={classes.title}>
                      <Typography variant="h6" color="textSecondary" component="h1">
                      Calculation
                     </Typography>
                      </div>
                       </Grid>
                       <Grid item xs={12}>
                       <div>
                          <Autocomplete
                              id="calculation"
                              onChange={(event, value) => {
                                setCalculation(value.value);
                              }}
                             options={calculationMethod}
                             getOptionLabel={(option) => option.label}
                             style={{ width: '100%' }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         label={`${calculationConverter(calculation)}`}
                          variant="outlined" />}
                          />
                          </div>
                       </Grid>
                     </Grid>
                   </Paper>
                 </Grid>*/}
                 </Grid>
                 </Grid>
                
               {/* :
                (
                  <Grid item xs={12}>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Paper elevation={3} className={classes.root}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                        <TextField className={classes.inputBox}
                        id="mindepreciationvalue"
                         label="Minimum Depreciated value"
                          variant="outlined"
                           margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField className={classes.inputBox}
                        id="salvagevalue"
                         label="Salvage value percentage"
                          variant="outlined"
                           margin="normal"
                          />
                        </Grid>
                        <Grid item xs={12}>
                        <div className={classes.title}>
                      <Typography variant="h6" color="textSecondary" component="h1">
                      Validity
                     </Typography>
                      </div>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField className={classes.inputBox}
                        id="from"
                         label="From"
                          variant="outlined"
                           margin="normal"
                          />
                        </Grid>
                        <Grid item xs={6}>
                        <TextField className={classes.inputBox}
                        id="to"
                         label="To"
                          variant="outlined"
                           margin="normal"
                          />
                        </Grid>
                      </Grid>
                    </Paper>

                  </Grid>

                  <Grid item xs={12}>
              <Paper className={classes.root} elevation={3}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <div className={classes.title}>
                      <Typography variant="h6" color="textSecondary" component="h6">
                       Depreciation areas
                     </Typography>
                      </div>
                  </Grid>
                  
                 <Grid item xs={4}>
                 <Typography variant="subtitle1" color="textSecondary">
                     Base
                     </Typography>
                 </Grid>
                 <Grid item xs={4}>
                 <Typography variant="subtitle1" color="textSecondary" >
                     Number of years
                     </Typography>
                 </Grid>

                 <Grid item xs={4}>
                 <Typography variant="subtitle1" color="textSecondary">
                     Annual percentage
                     </Typography>
                 </Grid>

                  <Grid item xs={12}>
                     <Grid container spacing={3}>
                         <Grid item xs={4}>
                         <div>
                          <Autocomplete
                              id="base"
                             options={base}
                             getOptionLabel={(option) => option.label}
                             style={{ width: '100%' }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         label=""
                          variant="outlined" />}
                          />
                        </div>
                         </Grid>
                        
                         <Grid item xs={4}>
                          <div className={classes.liftMargin}>
                         <TextField className={classes.inputBox} 
                         id="years"
                         value={7}
                          variant="outlined"
                          margin="normal"
                         />
                         </div>
                         </Grid>
                         <Grid item xs={4} >
                           <div className={classes.liftMargin}>
                         <TextField className={classes.inputBox} 
                         id="anual"
                         value={10}
                          variant="outlined"
                          margin="normal"
                         />
                         </div>
                         </Grid>

                     </Grid>
                       
                 </Grid>

                 <Grid item xs={12}>
                     <Grid container spacing={3}>
                         <Grid item xs={4}>
                         <div>
                          <Autocomplete
                              id="base"
                             options={base}
                             getOptionLabel={(option) => option.label}
                             style={{ width: '100%' }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         label=""
                          variant="outlined" />}
                          />
                        </div>
                         </Grid>
                         
                         <Grid item xs={4}>
                          <div className={classes.liftMargin}>
                         <TextField className={classes.inputBox} 
                         id="years1"
                         value={7}
                          variant="outlined"
                          margin="normal"
                         />
                         </div>
                         </Grid>
                         <Grid item xs={4}>
                         <div className={classes.liftMargin}>
                         <TextField className={classes.inputBox} 
                         id="anualP1"
                         value={10}
                          variant="outlined"
                          margin="normal"
                         />
                         </div>
                         </Grid>
                        
                     </Grid>
                       
                 </Grid>


              </Grid>
              </Paper>
              </Grid>
                    </Grid>
                    
                  </Grid>
                )
              }*/}

  <Grid item xs={12}>
        <div>
          <div style={{ float: 'right', paddingRight: '10px', paddingTop: '3em', paddingBottom: '2em' }}>
            <Grid container spacing={2}>
              <Grid item >
                <div>
                  <Button
                    variant="contained"
                    //onClick={(e)=> document.getElementById("calculationBase").reset() }
                  >
                  Cancel
              </Button>
                </div>
              </Grid>

              <Grid item>
                <div>
                  {isCreated ?
                  (!loadin ?
                   <Button
                   variant="contained"
                   color="primary"
                   type="button"
                   disabled={!isReady()}
                   onClick={(e) =>{
                     e.preventDefault();
                     updateDeprecitionType()
                   }}
                 >
                   Update
               </Button>
               :
               <CircularProgress />
                  )
                  :
                  (!login ?
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      disabled={!isReady()}
                      onClick={(e) =>{
                        e.preventDefault();
                        saveDeprecitionType()
                      }}
                    >
                      Save
                  </Button>
                  :
                  <CircularProgress />
                  )
                  
                    }
                </div>
              </Grid>
            </Grid>
          </div>
        </div>

      </Grid>


            </Grid>
        </div>
    );
}
 
export default DepreciationSetup;