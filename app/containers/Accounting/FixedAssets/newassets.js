import React,{useState,useContext,useCallback,useRef,useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import "../FixedAssets/fixedcs.css";
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
  import * as crud from './crud';
  import * as Enum from './enums';
  import Joker from './joker.jpg';
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
    const fileInput = useRef();
    const [imageView,setImageView] = useState('');
    const [isFilled,setIsFilled] = useState(false)
    const [depreciationType,setDepreciationType] = useState()
    const [location,setLocation] = useState();

    const assetType =[
        {
            value: 'PLANT_MACHINERY',
            label: 'Plant and Machinery',
          }
    ]

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        /*const reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = error => reject(error);*/
        const result = toBase64(file)
        result.then(rs => {
         let fileNode = {file: rs,fileName: file.name} 
        setValues({...values,image:fileNode})
         setImageView(rs);
         setIsFilled(true);
         //console.log(`File Name ${file.name}`)
        
      })
      })
      
    }, [])

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });

    const {getRootProps, getInputProps} = useDropzone({onDrop})

   
    const [values,setValues] = useState({
      aquisitionValue: '',//number
      assetId: '',
      assetName: '',
     assetNumber: '',
     assetType: '',
     barcode: '',
     condition: '',
     depreciationAccountId:'',
     depreciationType:{},
     depreciationValue:0,
    description: '',
    //disposalAccountId: 0,
    image: {
    file: '',
    fileName: '',
    fileUrl: ''
   },
    length: '',//number
   location: '',
   measurement: '',
   quantity: '',//number
  // taxAccountId: 0,
   weigth: '',//number
   width: ''//number
    })

    function isReady(){
      return values.weigth.length >= 1 && values.width.length >= 1 
      && values.quantity.length >= 1 && values.measurement.length>= 1
      && values.location.length >= 1 && values.length.length>= 1
      && values.image.fileName.length >= 1 && values.description.length >= 1
      && values.condition.length>=1 && values.barcode.length>=1 && values.assetId.length>=1
      && values.assetName.length >= 1 && values.assetType.length >= 1 && values.aquisitionValue.length >= 1
    }

    //Get needed parameters
    useEffect(() => {
      getRequiredParameter();
      return ()=>{
        getRequiredParameter()
      } 
    },[])

    function getRequiredParameter(){
     let location = []
     crud.getDeprecitionType()
     .then((data)=>{
       console.log(`Confirming it ${JSON.stringify(data.data)}`)
       for(let i=0;i<data.data.length;i++){
         if(data.data[i].calculationBase != null){
           console.log(`for depreciation ${JSON.stringify(data.data[i])}`)
           setValues({...values,depreciationAccountId:data.data[i].id,
            depreciationValue:data.data[i].depreciatedValue,depreciationType:data.data[i]})
          break;
         }
         
       }
     })
     .catch((error)=>{
      console.log(`Error occured for depreciation ${error}`)
     })
     //Get Location
     crud.getOrganisationParties()
     .then((data)=>{
       
       for(let k =0;k<data.data.length;k++){
         if(data.data[k].parties!=undefined||data.data[k].parties != null){
             for(let j=0;j<data.data[k].parties.length;j++){
              location.push({value:data.data[k].parties[j].name,label:(`${(data.data[k].parties[j].name)}`).toUpperCase()})
             }
         }
       }
     })
     .catch((error)=>{
      console.log(`Error occured for location ${error}`)
     })
     setLocation(location);
    }

    const status =Enum.AssetStatus

    const mesurement = Enum.AssetMeasurement

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };


    function createAsset(){
      crud.createNewAsset(values)
      .then((data)=>{
       swal("Success","Asset created successfully","success");
      })
      .catch((error)=>{
       swal("Error","Something went wrong. Please check your connection","error");
      })
    }


    console.log(`values  from new assets  -> `, values);

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
                                        <div style={{margin:'2px auto'}}
                                        {...getRootProps()} 
                                        className={classes.bColored}>
                                         <Grid container spacing={3}>
                                           {isFilled?
                                           <Grid item xs={12}>
                                             <div style={{position:'relative',top:'-12px',left:'-12px'}}>
                                             <div className="config_block">
                                              <input 
                                              {...getInputProps()}
                                              style={{ display:'none',border:'0px' }}
                                             //type="file"
                                             ref={fileInput}
                                             />
                                          <img src={`data:image/png;base64,${imageView}`} style={{width:'300px',height:'240px',cursor:'pointer'}} onClick={() => fileInput.current.click()} />
                                          </div>
                                             
                                             </div>
                                           </Grid>
                                             :
                                           <Grid item xs={12}>

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
                                              <input style={{ display: 'none' }} {...getInputProps()} />
                                             </Button>
                                             
                                             </div>
                                             </Grid>

                                             </Grid>

                                             </Grid>

                                           }
                                         </Grid>
                                        </div>
                                        </div>
                                    

                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField 
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                  margin="normal"
                                  onChange ={handleChange('description')}
                                fullWidth
                                   rows={5}
                                  multiline
                                   />
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container style={{marginTop:'2px'}} spacing={7}>
                                <Grid item xs={12}>
                                    <TextField
                                    id="assetname"
                                    label="Asset Name"
                                    required
                                    size={'small'}
                                    onChange ={handleChange('assetName')}
                                    variant="outlined"
                                    fullWidth
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <TextField 
                                    id="assetId"
                                    label="Asset ID"
                                    required
                                    onChange ={handleChange('assetId')}
                                    size={'small'}
                                    fullWidth
                                    variant="outlined"
                                  margin="normal"
                                   />
                                   </Grid>
                                   <Grid item xs={12}>
                                    <Autocomplete
                                    id="assetype"
                                    options={assetType}
                                    getOptionLabel={option => option.label}
                                    onChange={(event, value) => {
                                      setValues({...values,assetType:value.value})
                                     }}
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
                                    <TextField 
                                    id="assetnum"
                                    label="Asset Number"
                                    required
                                    onChange ={handleChange('assetNumber')}
                                    size={'small'}
                                    variant="outlined"
                                  margin="normal"
                                  fullWidth
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
                     <TextField 
                       id="manufacturer"
                        label="Manufacturer"
                        required
                          variant="outlined"
                          onChange ={handleChange('manufacturer')}
                          size={'small'}
                          margin="normal"
                          fullWidth
                          />
                     </Grid>

                     <Grid item xs={6}>
                     <TextField className={classes.lift}
                       id="barcode"
                        label="Barcode"
                        required
                          variant="outlined"
                          onChange ={handleChange('barcode')}
                          size={'small'}
                          margin="normal"
                          fullWidth
                          />
                     </Grid>

                    {/*<Grid item xs={6}>
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
                         </Grid>*/}

                         <Grid item xs={6}>
                           <Autocomplete
                          id="mesurement"
                          options={mesurement}
                          getOptionLabel={option => option.label}
                          onChange={(event, value) => {
                            setValues({...values,measurement:value.value})
                           }}
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
                             <Grid container spacing={1} style={{marginTop:'-2em'}}>
                                 <Grid item xs={12}>
                                 <Typography variant="subtext1" color="textSecondary">
                                   Dimension (Length x Width)
                                   </Typography>
                                 </Grid>
                                 <Grid item xs={12}>
                                   <div style={{marginTop:'-2.5em'}}>
                                     <Grid container spacing={3}>
                                     <Grid item xs={6}>
                                 <TextField
                                 id="length"
                                 type="number"
                                 placeholder={'Select'}
                                 variant="outlined"
                                 onChange ={handleChange('length')}
                                 size={'small'}
                                 fullWidth
                                    margin="normal"
                                 /> 
                                 </Grid>
                                 <Grid item xs={6}>
                                 <TextField
                                 id="width"
                                 placeholder={'Select'}
                                 size={'small'}
                                 type="number"
                                 onChange ={handleChange('width')}
                                 fullWidth
                                 variant="outlined"
                                    margin="normal"
                                 /> 
                                 </Grid>
                                     </Grid>
                                   </div>
                                 </Grid>
                                 
                             </Grid>
                         </Grid>

                         <Grid item xs={6}>
                                 <TextField
                                 id="weight"
                                 size={'small'}
                                 type="number"
                                 onChange ={handleChange('weigth')}
                                 label="Weight"
                                 fullWidth
                                 variant="outlined"
                                    margin="normal"
                                 /> 
                                 </Grid>

                         {/*<Grid item xs={6}>
                         <Autocomplete
                          id="weight"
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
                         </Grid>*/}

                         <Grid item xs={6}>
                             <div className={classes.liftMargin}>
                         <TextField className={classes.inputBox}
                                 id="quantity"
                                 type="number"
                                 variant="outlined"
                                 onChange ={handleChange('quantity')}
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
                          onChange={(event, value) => {
                            setValues({...values,condition:value.value})
                           }}
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
                           <div style={{marginTop:'-1.2em'}}>
                           <Autocomplete className={classes.lift}
                          id="location"
                          options={location}
                          getOptionLabel={option => option.label}
                          onChange={(event, value) => {
                            setValues({...values,location:value.value})
                           }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label="Location"
                              size={'small'}
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                           </div>
                          
                         </Grid>

                 </Grid>
                 </Paper>  
                </Grid>  

                <Grid item xs={12}>
                  <Paper elevation={3} className={classes.root}>
                    <Grid container spacing={3}>
                   
                         <Grid item xs={6}>
                           <div style={{position:'relative',top:'.65em'}}>
                         <TextField
                                 id="aquivalue"
                                 type="number"
                                 size={'small'}
                                 variant="outlined"
                                 onChange ={handleChange('aquisitionValue')}
                                 label="Aquisition value (Cost of Asset)"
                                    margin="normal"
                                    fullWidth
                                 /> 
                                 </div>  
                         </Grid>

                         <Grid item xs={6}>
                         <Grid container spacing={3}>
                                 <Grid item xs={12}>
                                   <div style={{position:'relative',top:'-1em'}}>
                                 <Typography variant="h6" color="textSecondary">
                                   Tax liable
                                   </Typography>
                                   </div>
                                 </Grid>

                                 <Grid item xs={12}>
                                <TextField style={{marginTop:'-2em'}}
                                 id="taxacc"
                                 size={'small'}
                                 variant="outlined"
                                // onChange ={handleChange('taxAccount')}
                                 label="Tax Account"
                                    margin="normal"
                                    fullWidth
                                 />   
                             </Grid>

                             <Grid item xs={12}>
                                <TextField
                                 id="taxacc"
                                 size={'small'}
                                 variant="outlined"
                                // onChange ={handleChange('taxAmount')}
                                 label="Tax Amount"
                                    margin="normal"
                                    fullWidth
                                 />   
                             </Grid>

                                 {/*<Grid item xs={12}>
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
                        </Grid>*/}


                                
                          {/*<Grid item xs={12}>
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
                         </Grid>*/}

                             </Grid>
                         </Grid>

                         <Grid item xs={6}>
                           <div style={{position:'relative',top:'-6.1em'}}>
                         <TextField
                                 id="aquidate"
                                 size={'small'}
                                 variant="outlined"
                                 label="Aquisition Date"
                                    margin="normal"
                                    fullWidth
                                 />  
                                 </div> 
                         </Grid>
                         
                    </Grid>  
                  </Paper>  
                </Grid>    

                <Grid item xs={12}>
                 <div style={{padding:'10px'}}>
                 <div>
                  <Grid container spacing={10}>
                  <Grid item xs={3}>
                    
                  </Grid>
                  <Grid item xs={3}>
                    
                  </Grid> 
                  <Grid item xs={3}>
                  <Button
                variant="contained"
                style={{width:'100%'}}
                onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'fixed'})}}
              >
                Cancel
              </Button>
                  </Grid> 
                  <Grid item xs={3}>
                  <Button
                  disabled={!isReady()}
                  onClick={()=>createAsset()}
                  color="primary"
                  style={{width:'100%'}}
                variant="contained"
              >
                Create
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
 
export default NewAsset;