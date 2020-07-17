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
  import SendIcon from '@material-ui/icons/ArrowBack';
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
    marginTop:'-1.1em'
    },
    bColored:{
        width:'300px',
        height:'240px',
        border:'2px sold blue'
    }
  }));


const AccessClass = () => {
    const [mainDepreciation,setMainDepreciation] = useState(false);
    const classes = useStyles();
    const fixedContext = useContext(FixedAssetContext);
    const assetType = [
        {
          value: 'General',
          label: 'General',
        },
        {
          value: 'Main',
          label: 'Main',
        }
      ]

      const base = [
        {
          value: 'AquisitionValue',
          label: 'Aquisition Value',
        }
      ]

      const accountDetermination = [
        {
          value: 'Generator',
          label: 'Generator',
        }
      ]


    return ( 
        <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
                  <Paper elevation={3}>
                      <div className={classes.title}>
                      <Typography variant="h6" className={classes.titleText} component="h1">
                     Assets Classes
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
                      <div>
                          <Autocomplete
                              id="assettype"
                             options={assetType}
                             getOptionLabel={(option) => option.label}
                             style={{ width: '100%' }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         label="Asset Type"
                          variant="outlined" />}
                          />
                     </div>
                      </Grid>


                  </Grid>
                  </Paper>
                  </Grid>

                  <Grid item xs={12}>
              <Paper className={classes.root} elevation={3}>
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                      <div className={classes.title}>
                      <Typography variant="h5" color="textSecondary" component="h6">
                       Depreciation areas
                     </Typography>
                      </div>
                  </Grid>
                  
                 <Grid item xs={3}>
                 <Typography variant="h6" color="textSecondary" component="h5">
                     Base
                     </Typography>
                 </Grid>
                 <Grid item xs={3}>
                 <Typography variant="h6" color="textSecondary" component="h5">
                     Account Determination
                     </Typography>
                 </Grid>
                 <Grid item xs={3}>
                 <Typography variant="h6" color="textSecondary" component="h5">
                     Depreciation Type
                     </Typography>
                 </Grid>

                 <Grid item xs={3}>
                 <Typography variant="h6" color="textSecondary" component="h5">
                     Life span (months)
                     </Typography>
                 </Grid>

                  <Grid item xs={12}>
                     <Grid container spacing={3}>
                         <Grid item xs={3}>
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
                         <Grid item xs={3}>
                         <div>
                          <Autocomplete
                              id="accountDetermination"
                             options={accountDetermination}
                             getOptionLabel={(option) => option.label}
                             style={{ width: '100%' }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         label=""
                          variant="outlined" />}
                          />
                        </div>
                         </Grid>
                         <Grid item xs={3}>
                          <div className={classes.lift}>
                         <TextField 
                         id="type"
                         value={10}
                          variant="outlined"
                          margin="normal"
                         />
                         </div>
                         </Grid>
                         <Grid item xs={3} className={classes.lift}>
                         <TextField
                         id="type"
                         value={10}
                          variant="outlined"
                          margin="normal"
                         />
                         </Grid>

                     </Grid>
                       
                 </Grid>

                 <Grid item xs={12}>
                     <Grid container spacing={3}>
                         <Grid item xs={3}>
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
                         <Grid item xs={3}>
                         <div>
                          <Autocomplete
                              id="accountDetermination"
                             options={accountDetermination}
                             getOptionLabel={(option) => option.label}
                             style={{ width: '100%' }}
                         renderInput={(params) => 
                         <TextField {...params} 
                         label=""
                          variant="outlined" />}
                          />
                        </div>
                         </Grid>
                         <Grid item xs={3}>
                          <div className={classes.lift}>
                         <TextField 
                         id="type"
                         value={10}
                          variant="outlined"
                          margin="normal"
                         />
                         </div>
                         </Grid>
                         <Grid item xs={3} className={classes.lift}>
                         <TextField
                         id="type"
                         value={10}
                          variant="outlined"
                          margin="normal"
                         />
                         </Grid>
                         <Grid item xs={12}>
                             <div>
                                 <div style={{float:'right',padding:'10px'}}>
                                 <Button
                                 variant="contained"
                                //onClick={onNextPage}
                               >
                               Add more
                               </Button>
                                 </div>
                             </div>
                         </Grid>
                     </Grid>
                       
                 </Grid>


              </Grid>
              </Paper>
              </Grid>

             
        </Grid>
        </div>
            
     );
}
 
export default AccessClass;