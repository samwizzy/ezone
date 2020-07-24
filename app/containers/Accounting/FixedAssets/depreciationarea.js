import React, {useState,useContext } from 'react';
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
import * as crud from '../Settings/crud';
import swal from 'sweetalert';
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

    const [values,setValues] = useState({
      code:'',
      description:'',
      type:''
    })


     function addNewDeprecitionArea(){
     crud.addDeprecitionArea(values)
     .then((data)=>{
      swal("Success","Depreciation Area added successfully","success");
      //settingContext.settingDispatch({type:'NAVIGATION',page:'deprecitionarea'})
     })
     .catch((error)=>{
      swal("Error","Something went wrong. Please check your connection","error");
     })
    }

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };

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
                     <Button
                variant="contained"
                color="primary"
                disabled={!isReady()}
                onClick={()=>{
                  addNewDeprecitionArea()}}
              >
                Add
              </Button>
                     </div>
                 </div>
              </Grid>

                </Grid>
        </div>
            
     );
}
 
export default DepreciationArea;