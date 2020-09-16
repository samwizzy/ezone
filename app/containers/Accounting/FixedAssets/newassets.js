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
  import swal from 'sweetalert';
  import CircularProgress from '@material-ui/core/CircularProgress';
  import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
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
    const [loadin,setLoadin] = useState(false)
    const [isUpdate,setIsUpdate] = useState(false)
    const [depreciationType,setDepreciationType] = useState()
    const [location,setLocation] = useState();

    const [assetType,setAssetType] = useState()
    const [taxType,setTaxType] = useState()

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


    /*useEffect(() => {
      let mounted = true
      if(mounted){
        isEdit()
      }
        return () =>{
        mounted = false
          }
        },[])*/


        function isEdit(){
         crud.getAsset()
         .then((data)=>{
          let id = fixedContext.fixedState.display
          for(let i=0;i<data.data.length;i++){
            if(data.data[i].id === id){
              setIsUpdate(true)
              setValues(data.data[i])
              break;
            }
          }
         
         })
         .catch((error)=>{
          console.log(`Error from Update ${error}`)
         }) 
        }

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });

    const {getRootProps, getInputProps} = useDropzone({onDrop})

   
    const [values,setValues] = useState({
      aquisitionDate: (new Date).toISOString(),
      aquisitionValue: '',//number
      assetId: '',
      assetName: '',
      assetNumber: '',
      assetStatus: '',
      assetTypeId: 0,
      barcode: '',
      condition: '',
      description: '',
      image: {
        file: '',
        fileName: '',
        fileUrl: ''
      },
      length: '',//number
      location: '',
      manufacturer: '',
      measurement: '',
      orgId: '',
      quantity: '',//number
      taxAccountId: 0,
      taxAmount: '',//number
      weigth: '',//number
      width: ''//number
    })

    function isReady(){
      return values.weigth.length >= 1 && values.width.length >= 1 
      && values.quantity.length >= 1 && values.measurement.length>= 1 && values.taxAmount.length >= 1
      && values.location.length >= 1 && values.length.length>= 1 && values.manufacturer.length >= 1
      && values.image.fileName.length >= 1 && values.description.length >= 1 && values.assetStatus.length >= 1
      && values.assetStatus.length>=1 && values.barcode.length>=1 && values.assetId.length>=1
      && values.assetName.length >= 1 && values.aquisitionValue.length >= 1
    }

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
     let location = []
     let type = []
     let tax = []
     crud.getAssetType()
     .then((data)=>{
       //console.log(`AssetTypes ${JSON.stringify(data.data)}`)
      // console.log(`Confirming it ${JSON.stringify(data.data)}`)
      for(let i=0;i<data.data.length;i++){
        if(data.data[i].name != null){
          type.push(
            {
              id: data.data[i].id,
              name: data.data[i].name
            }
          )
        }
      
     }
     setAssetType(type)
     })
     .catch((error)=>{
      console.log(`Error occured for AssetType ${error}`)
     })
     //Get Tax
     crud.getTaxType()
     .then((data)=>{
       //console.log(`Tax Type ${JSON.stringify(data.data)}`)
       for(let j=0;j<data.data.length;j++){
        tax.push({id:data.data[j].id,taxType:data.data[j].taxType})
       }
       setTaxType(tax);
      
     })
     .catch((error)=>{
       console.log(`Tax Type Error ${error}`)
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

    const handleDateChange = (date) => {
      setValues({ ...values,aquisitionDate:(new Date(date)).toISOString()})
    };
  

    const status =Enum.AssetStatus

    const mesurement = Enum.AssetMeasurement

    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value });
    };


    function createAsset(){
      setLoadin(true)
      crud.createNewAsset(values)
      .then((data)=>{
       swal("Success","Asset created successfully","success");
       setLoadin(false)
      })
      .catch((error)=>{
       swal("Error","Something went wrong. Please check your connection","error");
       setLoadin(false)
      })
    }

    function updateAsset(){
      crud.updateAsset(values)
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
                                    value={values.description}
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
                                    value={values.assetName}
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
                                    value={values.assetId}
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
                                    getOptionLabel={option => (option.name).toUpperCase()}
                                    onChange={(event, value) => {
                                      setValues({...values,assetType:value.name,assetTypeId:value.id})
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
                                    value={values.assetNumber}
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
                          value={values.manufacturer}
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
                          value={values.barcode}
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
                                 value={values.length}
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
                                 value={values.width}
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
                                 value={values.weigth}
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
                                 value={values.quantity}
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
                            setValues({...values,assetStatus:value.value})
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
                                 value={values.aquisitionValue}
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
                                 <Autocomplete style={{marginTop:'-2em'}}
                          id="taxacc"
                          options={taxType}
                          getOptionLabel={option => option.taxType}
                          onChange={(event, value) => {
                            setValues({...values,taxAccountId:value.id})
                           }}
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
                               {/* <TextField }
                                 id="taxacc"
                                 size={'small'}
                                 variant="outlined"
                                 value={values.taxAccountId}
                                 onChange ={handleChange('taxAccount')}
                                 label="Tax Account"
                                    margin="normal"
                                    fullWidth
                                 /> */} 
                             </Grid>

                             <Grid item xs={12}>
                                <TextField
                                 id="taxacc"
                                 size={'small'}
                                 variant="outlined"
                                 value={values.taxAmount}
                                onChange ={handleChange('taxAmount')}
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
                           <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        format="MM/dd/yyyy"
                        margin="normal"
                        inputVariant="outlined"
                        name="previous"
                        size="small"
                        id="date-picker-startDate"
                        label="Aquisition Date"
                        value={values.aquisitionDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                          
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
                    {!isUpdate ?
                    (!loadin?
                  <Button
                  disabled={!isReady()}
                  onClick={()=>createAsset()}
                  color="primary"
                  style={{width:'100%'}}
                variant="contained"
              >
                Create
              </Button>
              :
              <CircularProgress size={30}/>
                )
              :
               (!loadin?
                <Button
                disabled={!isReady()}
                onClick={()=>updateAsset()}
                color="primary"
                style={{width:'100%'}}
              variant="contained"
            >
              Update
            </Button>
            :
            <CircularProgress size={30}/>
               )
                }
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