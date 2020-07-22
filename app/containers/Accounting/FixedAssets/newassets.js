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
  import BackIcon from '@material-ui/icons/ArrowBack';
  import UploadIcon from '@material-ui/icons/AddAPhotoOutlined';
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
    lift:{
    marginTop:'1.1em'
    },
    liftMargin:{
      marginTop:'-1.1em'
      },
    bColored:{
        width:'300px',
        height:'240px',
        padding:'10px',
        textAlign:'center',
        border:'2px dashed blue'
    }
  }));

const NewAsset = () => {
    const classes = useStyles();
    const fixedContext = useContext(FixedAssetContext);

    const assetType =[
        {
            value: 'PLANTANDMACHINERY',
            label: 'Plant and Machinery',
          }
    ]

    const status =[
      {
          value: 'GOOD',
          label: 'Good',
        },
        {
          value: 'BAD',
          label: 'Bad',
        },
        {
          value: 'INMAINTAINANCE',
          label: 'In Maintainance',
        },
        {
          value: 'LOST',
          label: 'lost',
        },
        {
          value: 'DISPOSED',
          label: 'Disposed',
        },
  ]

    const mesurement =[
        {
            value: 'cm',
            label: 'CM',
          },
          {
            value: 'mm',
            label: 'MM',
          }
    ]

    return ( 
        <div className={classes.root}>
          <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper elevation={2}>
                <div className={classes.title}>
                      <Typography variant="h6" className={classes.titleText} component="h1">
                       New Asset
                     </Typography>
                      </div>
                </Paper>
              </Grid>
               
              <Grid item xs={12}>
                    <Paper elevation={3} className={classes.root}>
                        <Grid container spacing={5}>
                        <Grid item xs={6}>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <div >
                                        <div style={{margin:'2px auto'}} className={classes.bColored}>
                                         <Grid container spacing={3}>
                                             <Grid item xs={12}>
                                                 <div>
                                                 <UploadIcon style={{fontSize:'80',color:'#bbb'}}/>
                                                 </div>
                                             
                                             </Grid>

                                             <Grid item xs={12}>
                                                 <div>
                                                 <Typography variant="h5" color="textSecondary">
                                                Drag Image to Upload
                                               </Typography>
                                                 </div>
                                             
                                             </Grid>

                                             <Grid item xs={12}>
                                                 <div>
                                             <Button className={classes.curve}
                                              variant="contained"
                                              color="primary">
                                              Choose Image
                                             </Button>
                                             </div>
                                             </Grid>
                                         </Grid>
                                        </div>
                                        </div>
                                    

                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                  margin="normal"
                                fullWidth
                                   rows={5}
                                  multiline
                                   />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container style={{marginTop:'2px'}} spacing={8}>
                                <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="assetname"
                                    label="Asset Name"
                                    required
                                    size={'small'}
                                    variant="outlined"
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="assetId"
                                    label="Asset ID"
                                    required
                                    size={'small'}
                                    variant="outlined"
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <Autocomplete
                                    id="assetype"
                                    options={assetType}
                                    getOptionLabel={option => option.label}
                          
                                     renderInput={params => (
                                   <TextField
                                   {...params}
                                   label="Asset Type"
                                   size={'small'}
                                   variant="outlined"
                                    fullWidth
                                    />
                                   )}
                                  />
                                    </Grid>
                                  
                                   <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="assetnum"
                                    label="Asset Number"
                                    required
                                    size={'small'}
                                    variant="outlined"
                                  margin="normal"
                                   />
                                   </Grid>

                                </Grid>
                                </Grid>

                        </Grid>
                    </Paper>
                </Grid>  

                <Grid item xs={12}>
                  <Paper elevation={3} className={classes.root}>
                 <Grid container spacing={3}>

                     <Grid item xs={6}>
                     <TextField className={classes.inputBox}
                       id="manufacturer"
                        label="Manufacturer"
                        required
                          variant="outlined"
                          size={'small'}
                          margin="normal"
                          />
                     </Grid>

                     <Grid item xs={6}>
                           <Autocomplete className={classes.lift}
                          id="barcode"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Barcode"
                              size={'small'}
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                         </Grid>

                         <Grid item xs={6}>
                           <Autocomplete
                          id="mesurement"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Mesurement"
                              variant="outlined"
                              size={'small'}
                              fullWidth
                            />
                          )}
                        />
                         </Grid>

                         <Grid item xs={6}>
                             <Grid container spacing={1}>
                                 <Grid item xs={12}>
                                 <Typography variant="subtext1" color="textSecondary">
                                   Dimension (Length x Width)
                                   </Typography>
                                 </Grid>
                                 <Grid item xs={6}>
                                 <TextField className={classes.inputBox}
                                 id="manufacturer"
                                 placeholder={'Select'}
                                 variant="outlined"
                                 size={'small'}
                                    margin="normal"
                                 /> 
                                 </Grid>
                                 <Grid item xs={6}>
                                 <TextField className={classes.inputBox}
                                 id="manufacturer"
                                 placeholder={'Select'}
                                 size={'small'}
                                 variant="outlined"
                                    margin="normal"
                                 /> 
                                 </Grid>
                             </Grid>
                         </Grid>

                         <Grid item xs={6}>
                         <Autocomplete
                          id="width"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Width"
                              size={'small'}
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                         </Grid>

                         <Grid item xs={6}>
                             <div className={classes.liftMargin}>
                         <TextField className={classes.inputBox}
                                 id="quantity"
                                 variant="outlined"
                                 label="Quantity"
                                 size={'small'}
                                    margin="normal"
                                 /> 
                                 </div>  
                         </Grid>

                         <Grid item xs={6}>
                         <Autocomplete
                           id="status"
                              options={status}
                          getOptionLabel={option => option.label}
                          
                          renderInput={params => (
                            <TextField
                            {...params}
                             label="Status"
                             size={'small'}
                              variant="outlined"
                               fullWidth
                                    />
                                   )}
                                  />  
                         </Grid>

                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="location"
                                 variant="outlined"
                                 size={'small'}
                                 label="Location"
                                    margin="normal"
                                 />   
                         </Grid>

                 </Grid>
                 </Paper>  
                </Grid>  

                <Grid item xs={12}>
                  <Paper elevation={3} className={classes.root}>
                    <Grid container spacing={3}>
                   
                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="aquivalue"
                                 size={'small'}
                                 variant="outlined"
                                 label="Aquisition value (Cost of Asset)"
                                    margin="normal"
                                 />   
                         </Grid>

                         <Grid item xs={6}>
                         <Grid container spacing={3}>
                                 <Grid item xs={12}>
                                 <Typography variant="subtext1" color="textSecondary">
                                   Tax liable
                                   </Typography>
                                 </Grid>
                                 <Grid item xs={12}>
                                 <Autocomplete style={{marginTop:'-1.8em'}}
                          id="taxacc"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField 
                              {...params}
                              label="Tax Account"
                              size={'small'}
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                                 </Grid>
                                
                                 <Grid item xs={12}>
                          <Autocomplete className={classes.inputBox}
                          id="taxamount"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField 
                              {...params}
                              size={'small'}
                              label="Tax Amount"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                                 </Grid>
                             </Grid>
                         </Grid>

                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="aquidate"
                                 size={'small'}
                                 variant="outlined"
                                 label="Aquisition Date"
                                    margin="normal"
                                 />   
                         </Grid>
                         
                    </Grid>  
                  </Paper>  
                </Grid>    

                <Grid item xs={12}>
                 <div style={{float:"right",padding:'10px'}}>
                     <div>
                     <Button
                variant="contained"
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'fixed'})}}
                startIcon={<BackIcon />}
              >
                Back
              </Button>
                     </div>
                 </div>
              </Grid>

              </Grid>
        </div>
    );
}
 
export default NewAsset;