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
import { BrowserRouter as Router, Switch,useParams, Route,useRouteMatch } from "react-router-dom";
import { FixedAssetContext } from './index';

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
    const fixedContext = useContext(FixedAssetContext);


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
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                             <TextField className={classes.inputBox}
                                    id="type"
                                    label="Type"
                                    variant="filled"
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
                <Grid container spacing={1}>
                  <Grid item>
                  <Button
                variant="contained"
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'depreciation'})}}
                startIcon={<BackIcon />}
              >
                Back
              </Button>
                </Grid>
                  <Grid item>
                  <Button
                variant="contained"
                color="primary"
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'assetclasses'})}}
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
 
export default DepreciationArea;