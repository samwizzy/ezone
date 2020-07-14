import React,{useState,useContext} from 'react';
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
  import Autocomplete from '@material-ui/lab/Autocomplete';
  import SendIcon from '@material-ui/icons/ArrowForward';
  import BackIcon from '@material-ui/icons/ArrowBack';
  import { BrowserRouter as Router, Switch,useParams, Route,useRouteMatch } from "react-router-dom";
  import { FixedAssetContext } from './index';

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
    const fixedContext = useContext(FixedAssetContext);
    const [method,setMethod] = useState('Straightline');
    const [calculation,setCalculation] = useState('ATU');
    const methodType = [
      {
        value: 'Straightline',
        label: 'Straight line',
      },
      {
        value: 'Multiline',
        label: 'Multiline',
      }
    ]

    const base = [
      {
        value: 'AquisitionValue',
        label: 'Aquisition Value',
      }
    ]

    const calculationBase = [
      {
        value: 'Monthly',
        label: 'Monthly',
      },
      {
        value: 'Yearly',
        label: 'Yearly',
      }
    ]

    const calculationMethod = [
      {
        value: 'ATU',
        label: 'Aquisition / Total useful',
      },
      {
        value: 'POA',
        label: 'Percentage of Aquisition value',
      },
      {
        value: 'NBV',
        label: 'Netbook value / Remaining life',
      }
      
    ]

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

    function methodConverter(value){
      switch(value){
        case 'Multiline':
          return 'Multiline';
        default:
         return 'Straight line';   
      }
    }

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
                      <TextField className={classes.inputBox}
                        id="code"
                         label="Code"
                          variant="outlined"
                           margin="normal"
                          />
                      </Grid>
                      <Grid item xs={12}>
                      <TextField className={classes.inputBox}
                        id="description"
                         label="Description"
                          variant="outlined"
                           margin="normal"
                          />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={3} >
                      <Grid item xs={12}>
                      <div className={classes.lift}>
                          <Autocomplete className={classes.inputBox}
                              id="methodType"
                              onChange={(event, value) => {
                                setMethod(value.value);
                              }}
                             options={methodType}
                             getOptionLabel={(option) => option.label}
                             
                         renderInput={(params) => 
                         <TextField {...params} 
                         label={`${methodConverter(method)}`}
                          variant="outlined" />}
                          />
                     </div>
                      </Grid>
                      <Grid item xs={12}>
                      <div className={classes.lift}>
                          <Autocomplete className={classes.inputBox}
                              id="calculationBase"
                             options={calculationBase}
                             getOptionLabel={(option) => option.label}
                             
                         renderInput={(params) => 
                         <TextField {...params} 
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

              {
                method === 'Straightline'?
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
                      Useful life
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
                 </Grid>
                 </Grid>
                 </Grid>
                )
                :
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
                 <Typography variant="h6" color="textSecondary" component="h5">
                     Base
                     </Typography>
                 </Grid>
                 <Grid item xs={4}>
                 <Typography variant="h6" color="textSecondary" component="h5">
                     Number of years
                     </Typography>
                 </Grid>

                 <Grid item xs={4}>
                 <Typography variant="h6" color="textSecondary" component="h5">
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
              }

<Grid item xs={12}>
               
               <div style={{float:"right",padding:'10px'}}>
                <div>
                <Grid container spacing={1}>
                  <Grid item>
                  <Button
                variant="contained"
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'newasset'})}}
                startIcon={<BackIcon />}
              >
                Back
              </Button>
                </Grid>
                  <Grid item>
                  <Button
                variant="contained"
                color="primary"
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'depreciationarea'})}}
                endIcon={<SendIcon />}
              >
                Next
              </Button>
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