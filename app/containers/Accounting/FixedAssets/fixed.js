import React,{useState,useContext,useEffect,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from 'mui-datatables';
import Dialog from '@material-ui/core/Dialog';
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import moment from 'moment';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import ImportIcon from '@material-ui/icons/GetApp';
import SendIcon from '@material-ui/icons/ArrowForward';
import * as crud from './crud';
import DateFnsUtils from '@date-io/date-fns';
import * as Enum from './enums';
import ExportIcon from '@material-ui/icons/Publish';
import { Grid,
    Button,
    TextField, Menu,
    MenuItem } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FixedAssetContext } from '.';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    table: {
        marginTop: theme.spacing(2),
        '& .MuiTableCell-body': {
          fontSize: theme.typography.fontSize - 1,
        },
        '& .MuiTableRow-root:hover': {
          cursor: 'pointer'
        },
      },
      datatable: {
        '& .MuiTableRow-root:hover': {
          cursor: 'pointer'
        },
        '& .MuiTableHead-root': {
          '& .MuiTableCell-head': {
            color: theme.palette.common.white,
          },
          '& .MuiTableCell-root:nth-child(odd)': {
            backgroundColor: theme.palette.primary.main,
          },
          '& .MuiTableCell-root:nth-child(even)': {
            backgroundColor: darken(theme.palette.primary.main, 0.1),
          },
        },
      },
    paperBase:{
    padding:'15px'
    },
    base:{
        paddingTop: '10px',
        paddingLeft:'10px',
        paddingRight:'10px',
        marginBottom:'20px'
    },
    pap:{
        padding:'10px',
        marginBottom:'15px'
    },
    papy:{
        padding:'12px',
        marginBottom:'15px'
    },
    controlButtons:{
      float:'right'  
    },
    divContent:{
        textAlign:'center',
        margin:'3px'
    }
  }));

const Assets = () => {
    const fixedContext = useContext(FixedAssetContext)
    const classes = useStyles();
    const [open,setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [assetData] = useState([
      {assetname:'Air conditioner',assetid:'000910',acquitioncost:'N20000.00',location:'Ikeja',quantity:10,status:'Good',id:0},
      {assetname:'Typewriter',assetid:'7890PO',acquitioncost:'N20000.00',location:'Ikeja',quantity:1,status:'Disposed',id:1},
      {assetname:'',assetid:'Mary Paul',acquitioncost:'N20000.00',location:'Ikeja',quantity:5,status:'Lost',id:2},
      {assetname:'Truck',assetid:'89408LK',acquitioncost:'N20000.00',location:'Ikeja',quantity:200,status:'Bad',id:3},
      {assetname:'Dilling machine',assetid:'12345LP',acquitioncost:'N20000.00',location:'Ikeja',quantity:3,status:'In maintenance',id:4} 
    ]);

    const [disposalValues,setDisposalValues] = useState({
      amount:'',
      date:(new Date('2020-08-18T21:11:54')).toISOString(),
      reason:''
    })

    const handleDateChange = (date) => {
      setValues({ ...disposalvalues, date: (new Date(date)).toISOString() });
    };

    const handleChange = name => event => {
      setValues({ ...disposalValues, [name]: event.target.value });
    };
  

    const handleClose = () => {
      setAnchorEl(null);
    };

    const [displayId,setDisplayId] = useState();

    const handleClick = (event, id) => {
      setAnchorEl(event.currentTarget);
      setDisplayId(id)
    };

    const handleClickClose = () => {
      setOpen(false);
    };


    useEffect(() => {
      getAsset()
      return () =>{
        getAsset()
      }
      },[])
  
      async function getAsset(){
         await crud.getAsset()
         .then((data)=>{
          console.log(`Asset ${JSON.stringify(data.data)}`)
         })
         .catch((error)=>{
         console.log(`Error from Asset ${error}`)
         })
      }

    const sales = [
        {
          value: 1,
          label: 'Nepa Bill',
        },
        {
          value: 2,
          label: 'House Rent',
        }
      ];

      const columns = [
        {
          name: 'assetname',
          label: 'Asset name',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'assetid',
          label: 'Asset Id',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'acquitioncost',
          label: 'Acquition cost',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
           name: 'location',
            label: 'Location',
            options: {
              filter: true,
              sort: false,
            },
        },

        {
            name: 'quantity',
             label: 'Quantity',
             options: {
               filter: true,
               sort: false,
             },
         },
         {
          name: 'status',
           label: 'Status',
           options: {
             filter: true,
             sort: false,
           },
       },
       {
        name: 'id',
        label: ' ',
        options: {
          filter: true,
          sort: false,
          customBodyRender: value => {
            if (value === '') {
              return '';
            }
            return (
              <div style={{margin:'5px'}}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={event => handleClick(event, value)}
                >
                  Options
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={(e) => {
                   // editOpenAccountDialogAction(account);   
                  }}>
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => {
                    fixedContext.fixedDispatch({type:'SET_ID',page:'details',id:displayId})
                   /* history.push({
                      pathname: '/account/charts/details',
                      chartDetailsData: account,
                    });*/
                    //chartContext.chartDispatch({type:'VIEW_ID',id:account.id})
                  }}>
                    View Details
                  </MenuItem>
                  <MenuItem onClick={() => {
                   setOpen(true)
                  }}>
                    Disposal
                  </MenuItem>
                  <MenuItem onClick={() => {
                    //openDeleteAccountDialogAction(account);
                  }}>
                    Delete 
                  </MenuItem>
                </Menu>
              </div>
            );
          },
        },
      },
    
      ];

    return ( 
        <div className={classes.base}>
          
          <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Disposal"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">

            <div>
              <Paper elevation={1} className={classes.paperBase}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                  <TextField
                    id="amount"
                    label="Disposal Amount"
                         value={disposalValues.amount}
                          variant="outlined"
                          onChange ={handleChange('reason')}
                          margin="normal"
                          fullWidth
                         />
                  </Grid>
                <Grid item xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        format="MM/dd/yyyy"
                        margin="normal"
                        inputVariant="outlined"
                        name="disposalDate"
                        size="small"
                        id="date-picker-startDate"
                        label="Disposal Date"
                        value={disposalValues.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
               </Grid>
               <Grid item xs={12}>
                  <TextField
                    id="reason"
                    label="Reason for Disposal"
                    onChange ={handleChange('reason')}
                    value={disposalValues.reason}
                    variant="outlined"
                    multiline
                    rows={5}
                    margin="normal"
                    fullWidth
                         />
                  </Grid>
                </Grid>
              </Paper>
            </div>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClickClose} color="textSecondary">
            Cancel
          </Button>
          <Button variant="contained" 
          //onClick={()=>addPeriod() } 
          color="primary">
            Dispose
          </Button>
        </DialogActions>
      </Dialog>
      </div>


            <Grid container spacing={2} >
             
             <Grid item xs={12}>
                 <Paper className={classes.papy} elevation={3}>
                     <Grid container spacing={3}>
                         <Grid item xs={8}>
                           <Grid item xs={12}>
                             <div>
                             <Typography gutterBottom variant="h5" component="h1">
                              Assets Master Data
                             </Typography>
                             </div>
                           </Grid>
                           <Grid item xs={12}>
                               <div>
                     <Autocomplete
                    id="sales"
                    options={sales}
                    size={'small'}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => { 
                    //accContext.accDispatch({type:'PAYLOAD',payload:{label:'startDay',value:value.value}})
                      // setFinancialYearDate();
                    }}
                    style={{ width: 200}}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={''}
                        style={{borderRadius:'100px' }}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                               </div>
                           </Grid>
                         </Grid>
                         <Grid item xs={4}>
                             <div>
                                 <div className={classes.controlButtons}>
                                   <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                      <div className={classes.divContent}>
                                      <Button
                                      size={'small'}
                                      onClick={()=>{fixedContext.fixedDispatch({type:'NAVIGATION',page:'newasset'})}}
                                      variant="contained"
                                       color="primary">
                                        New Assets
                                        </Button>
                                      </div>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <div className={classes.divContent}>
                                      <Grid container spacing={0}>
                                      <Grid item xs={2}>

                                      </Grid>
                                          <Grid item xs={4}>
                                          <div>
                                      <Button
                                       startIcon={<ImportIcon />}
                                       size={'small'}
                                      variant="contained">
                                        Import
                                            </Button>
                                      </div> 
                                          </Grid>
                                          <Grid item xs={4}>
                                          <div>
                                      <Button
                                       startIcon={<ExportIcon />}
                                       size={'small'}
                                      variant="contained">
                                        Export
                                        </Button>
                                      </div> 
                                          </Grid>
                                      </Grid>
                                      </div>
                                  </Grid>
                                  </Grid>
                                 </div>

                             </div>
                             
                         </Grid>
                     </Grid>

                 </Paper>
             </Grid>

             <Grid item xs={12}>
                 <div className={classes.pap}>
                 <div>
                <React.Fragment>
                  <div className={classes.root}>
                    <Grid container>
                      <Grid item xs={12}>
                        <MUIDataTable
                          className={classes.datatable}
                          data={assetData}
                          columns={columns}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
               
              </div>
                 </div>
             </Grid>

            

            </Grid>

        </div>
     );
}
 
export default Assets;