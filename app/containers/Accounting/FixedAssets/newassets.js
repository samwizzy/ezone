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
  import UploadIcon from '@material-ui/icons/AddAPhotoOutlined';
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
        padding:'10px',
        textAlign:'center',
        border:'2px dashed blue'
    }
  }));

const NewAsset = () => {
    const classes = useStyles();
    const fixedContext = useContext(FixedAssetContext);

    const assetClass =[
        {
            value: 'General',
            label: 'General',
          },
          {
            value: 'Main',
            label: 'Main',
          }
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
                                <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="assetname"
                                    label="Asset Name"
                                    required
                                    variant="outlined"
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="assetId"
                                    label="Asset Id"
                                    required
                                    variant="outlined"
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <Autocomplete
                          id="assetclass"
                          options={assetClass}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Asset Class"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="itemType"
                                    label="Item Type"
                                    required
                                    variant="filled"
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <TextField className={classes.inputBox}
                                    id="assetnum"
                                    label="Asset Number"
                                    required
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
                          margin="normal"
                          />
                     </Grid>

                     <Grid item xs={6}>
                           <Autocomplete className={classes.lift}
                          id="barcode"
                          options={assetClass}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Barcode"
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
                              fullWidth
                            />
                          )}
                        />
                         </Grid>

                         <Grid item xs={6}>
                             <Grid container spacing={1}>
                                 <Grid item xs={12}>
                                 <Typography variant="h6" color="textSecondary" component="h6">
                                   Dimension (Length x Width)
                                   </Typography>
                                 </Grid>
                                 <Grid item xs={6}>
                                 <TextField className={classes.inputBox}
                                 id="manufacturer"
                                 placeholder={'Select'}
                                 variant="outlined"
                                    margin="normal"
                                 /> 
                                 </Grid>
                                 <Grid item xs={6}>
                                 <TextField className={classes.inputBox}
                                 id="manufacturer"
                                 placeholder={'Select'}
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
                                    margin="normal"
                                 /> 
                                 </div>  
                         </Grid>

                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="condition"
                                 variant="outlined"
                                 label="Condition"
                                    margin="normal"
                                 />   
                         </Grid>

                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="location"
                                 variant="outlined"
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
                     <Typography variant="h6" color="textSecondary" component="h6">
                      Disposal
                       </Typography>
                    </Grid>
                    <Grid item xs={6}>
                     <Typography variant="h6" color="textSecondary" component="h6">
                      Purchase
                       </Typography>
                    </Grid>
                    <Grid item xs={6}>
                         <Autocomplete
                          id="disposal"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Disposal Account"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                         </Grid>
                         <Grid item xs={6}>
                         <Autocomplete
                          id="ada"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Accumulated depreciation Account"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                         </Grid>

                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="aquivalue"
                                 variant="outlined"
                                 label="Aquisition value"
                                    margin="normal"
                                 />   
                         </Grid>

                         <Grid item xs={6}>
                         <TextField className={classes.inputBox}
                                 id="adv"
                                 variant="outlined"
                                 label="Accumulated depreciated value"
                                    margin="normal"
                                 />   
                         </Grid>

                         <Grid item xs={12}>
                         <Grid container spacing={3}>
                                 <Grid item xs={12}>
                                 <Typography variant="h6" color="textSecondary" component="h6">
                                   Tax liable
                                   </Typography>
                                 </Grid>
                                 <Grid item xs={6}>
                                 <Autocomplete
                          id="taxacc"
                          options={mesurement}
                          getOptionLabel={option => option.name}
                          
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Tax Account"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
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
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'depreciation'})}}
                endIcon={<SendIcon />}
              >
                Next
              </Button>
                     </div>
                 </div>
              </Grid>

              </Grid>
        </div>
    );
}
 
export default NewAsset;