import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from 'mui-datatables';
import AttachIcon from '@material-ui/icons/AttachFile';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
import { Grid,
    Button,
    TextField,InputLabel,MenuItem,Select,FormControl } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
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
        paddingLeft:'30px',
        paddingRight:'30px',
        marginBottom:'20px'
    },
    pap:{
        padding:'20px',
        marginBottom:'20px'
    },
    papy:{
        padding:'12px',
        marginBottom:'15px'
    },
    pushForward:{
    marginTop:'40px'
    },
    controlButtons:{
     padding:'10px',
     marginBottom:'15px'  
    },
    controlButton:{
      margin:'5px' 
    },
    totals:{
     float:'left',
     padding:'10px'
    },
    totalsButtons:{
    margin:'20px'
    },
    totalButton:{
    margin:'5px'
    },
    divContent:{
        textAlign:'center',
        margin:'3px'
    },
    divRight:{
        float:'right',
        padding:'5px'
    },
  }));

const NewShipment = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const handleDateChange = (date, name) => {
        //setValues({...values, [name]: date })
      }
    return ( 
        <div className={classes.base}>
          <Paper className={classes.pap} elevation={2}>
           <Grid container spacing={3}>
               <Grid item xs={12}>
                   <div>
                   <FormControl variant="outlined" className={classes.formControl}>
                   <InputLabel id="demo-simple-select-outlined-label">From Account</InputLabel>
                   <Select
                   labelId="demo-simple-select-outlined-label"
                   id="demo-simple-select-outlined"
                   variant="outlined"
                   value={age}
                   onChange={handleChange}
                   label="From Account"
                 >
                    <MenuItem value="">
                    <em>None</em>
                     </MenuItem>
                     <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select> 
                </FormControl> 
                   </div>
               </Grid>

               <Grid item xs={5}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    margin="normal"
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Date"
                    size="small"
                    format="MM/dd/yyyy"
                    fullWidth
                    // value={values.transactionDate}
                    onChange={(date) => handleDateChange(date, "transactionDate")}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                      </Grid>
                 <Grid item xs={9}>
                 <TextField
                  style={{width:'80%'}}
                  id="amount"
                  label="Amount"
                  type="number"
                 variant="outlined"
                  />
                 </Grid>   

                  <Grid item xs={8}>
                 <TextField
                  style={{width:'60%'}}
                  id="amount"
                  label="Reference Number"
                  type="number"
                 variant="outlined"
                  />
                 </Grid>   

                 
                  <Grid item xs={8}>
                 <TextField
                  style={{width:'60%'}}
                  id="amount"
                  label="Description"
                  multiline
                  rows={6}
                  type="text"
                 variant="outlined"
                  />
                 </Grid> 

                 <Grid item xs={12}>
                 <div className={classes.pushForward}>
                    <Button
                     startIcon={<AttachIcon />}
                    size={'small'}
                     variant="contained">
                      Attach a file
                      </Button>
                      </div> 
                 </Grid>

                 <Grid item xs={12}>

                   <div>
                    
                    <div className={classes.divRight}>
                       <Grid container spacing={3}>
                        <Grid item>
                            <div>
                            <Button
                           size={'small'}
                          variant="contained">
                          Cancel
                           </Button>  
                            </div>
                        </Grid>
                        <Grid item>
                            <div>
                            <Button
                           size={'small'}
                           color="primary"
                          variant="contained">
                          Transfer
                           </Button>  
                            </div>
                        </Grid>
                       </Grid>
                    </div>

                   </div>

                 </Grid> 

           </Grid>
          </Paper>
        </div>
     );
}
 
export default NewShipment;