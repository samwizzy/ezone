import React, {useState,useContext,useEffect } from 'react';
import {
  makeStyles,
  Button,
  Menu,
  TextField,
  Autocomplete,
  Paper,
  Typography,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  Grid
} from '@material-ui/core';
import AccessClasses from './assetsclasses';
import SendIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import * as crud from './crud';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BrowserRouter as Router, Switch,useParams, Route,useRouteMatch } from "react-router-dom";
import { SettingContext } from '../Settings/components/SettingsLayout';

const useStyles = makeStyles(theme => ({
    root: {
      padding:'15px'
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
    bColored:{
        width:'300px',
        height:'240px',
        border:'2px sold blue'
    }
  }));

const DepreciationArea = () => {
    const [mainDepreciation,setMainDepreciation] = useState(false);
    const classes = useStyles();
    const settingContext = useContext(SettingContext);
    const [isCreated,setIsCreated] = useState(false)
    const [loadin,setLoadin] = useState(false)

    const [values,setValues] = useState({
      code:'',
      description:'',
      type:''
    })


     function addNewDeprecitionArea(){
      setLoadin(true)
     crud.addDeprecitionArea(values)
     .then((data)=>{
      checkAlreadyCreated()
      swal("Success","Depreciation Area added successfully","success");
      setLoadin(false)
      //settingContext.settingDispatch({type:'NAVIGATION',page:'deprecitionarea'})
     })
     .catch((error)=>{
      swal("Error","Something went wrong. Please check your connection","error");
      setLoadin(false)
     })
    }

    function updateDeprecitionArea(){
      setLoadin(true)
     crud.updateDeprecitionArea(values)
     .then((data)=>{
      checkAlreadyCreated()
      swal("Success","Depreciation Area updated successfully","success");
      setLoadin(false)
      //settingContext.settingDispatch({type:'NAVIGATION',page:'deprecitionarea'})
     })
     .catch((error)=>{
      swal("Error","Something went wrong. Please check your connection","error");
      setLoadin(false)
     })
    }

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

    useEffect(() => {
      checkAlreadyCreated()
      return () =>{
        checkAlreadyCreated()
      }
      },[])   

      function checkAlreadyCreated(){
        crud.getDeprecitionArea()
        .then((data)=>{
          if(data.data.length > 0){
            setValues({...values,code:data.data[0].code,
              description:data.data[o].description,
              type:data.data[0].type
            })
          }
          setIsCreated(true);
        })
        .catch((error)=>{

        })
      }

    function isReady(){
      return values.code.length > 1 && values.description.length > 1 && values.type.length > 1
    }


    return ( 
        <div className={classes.root}>
          <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3}>
                        <div className={classes.title}>
                        <Typography variant="h6" className={classes.titleText} component="h1">
                        Depreciation Area Setup
                       </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.root} elevation={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                         <Grid container spacing={3}>
                             <Grid item xs={12}>
                             <TextField className={classes.inputBox}
                                    id="code"
                                    label="Code"
                                    value={values.code}
                                    onChange ={handleChange('code')}
                                    size={'small'}
                                    variant="outlined"
                                  margin="normal"
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
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                             <TextField className={classes.inputBox}
                                    id="type"
                                    label="Type"
                                    variant="filled"
                                    value={values.type}
                                    onChange ={handleChange('type')}
                                    size={'small'}
                                    placeholder="Posting GL"
                                  margin="normal"
                                   />
                                </Grid>
                                <Grid item xs={12}>
                                <div>
                              <FormControl component="fieldset">
                               <FormGroup aria-label="position" row>
                               <FormControlLabel
                               value="end"
                               checked={mainDepreciation === true}
                               onChange ={()=>setMainDepreciation(!mainDepreciation) }
                            control={<Checkbox color="primary" />}
                            label="Main Depreciation Area"
                             labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                </Paper>  
                </Grid>

                <Grid item xs={12}>
                 <div style={{float:"right",padding:'10px'}}>
                     <div>
                       {isCreated ?
                      (!loadin?

                        <Button
                        variant="contained"
                        color="primary"
                        style={{width:200}}
                        disabled={!isReady()}
                        onClick={()=>{
                          updateDeprecitionArea()}}
                      >
                        Update
                      </Button>
                      :
                      <CircularProgress />
                      )

                     :
                     (!loadin?
                     <Button
                variant="contained"
                color="primary"
                style={{width:200}}
                disabled={!isReady()}
                onClick={()=>{
                  addNewDeprecitionArea()}}
              >
                Add
              </Button>
              :
              <CircularProgress />
                     )
               }
                     </div>
                 </div>
              </Grid>

                </Grid>
        </div>
            
     );
}
 
export default DepreciationArea;