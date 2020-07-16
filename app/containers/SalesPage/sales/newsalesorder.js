import React, { useState,useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MUIDataTable from 'mui-datatables';
import AttachIcon from '@material-ui/icons/AttachFile';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import DateFnsUtils from '@date-io/date-fns';
import { Grid,
    Button,
    TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { SalesContext } from '.';


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
        paddingTop: '5px',
        paddingLeft:'5px',
        paddingRight:'5px',
        marginBottom:'20px'
    },
    pap:{
        padding:'10px',
        marginBottom:'10px'
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
    }
  }));

const NewSaleOrder = () => {
    const classes = useStyles();
    const salesContext = useContext(SalesContext);
    const[salesorders,setSaleorders] = useState([])

    const columns = [
      {
        name: 'item',
        label: 'Item',
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: 'description',
        label: 'Description',
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
         name: 'price',
          label: 'Price',
          options: {
            filter: true,
            sort: false,
          },
      },

      {
          name: 'tax',
           label: 'Amount',
           options: {
             filter: true,
             sort: false,
           },
       },
       {
          name: 'amount',
           label: 'Amount',
           options: {
             filter: true,
             sort: false,
           },
       }
    ];

    const customer = [
        {
          value: 1,
          label: 'John Billy',
        },
        {
          value: 2,
          label: 'Alex Hunter',
        }
      ];
      const salesperson = [
        {
          value: 1,
          label: 'Thomas Aparty',
        },
        {
          value: 2,
          label: 'Mable Chigbe',
        }
      ];
      const handleDateChange = (date, name) => {
        //setValues({...values, [name]: date })
      }

    return ( 
        <div>
            <Paper elevation={1} className={classes.paperBase}>
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <Paper className={classes.pap} elevation={3}>
                <div>
                    <Typography gutterBottom variant="h5" component="h1">
                      New Sales Orders
                     </Typography>
                   </div>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.pap} elevation={2}>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                        <Autocomplete
                    id="customer"
                    options={customer}
                    size={'small'}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => { 
                    //accContext.accDispatch({type:'PAYLOAD',payload:{label:'startDay',value:value.value}})
                      // setFinancialYearDate();
                    }}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={'Customer'}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  /> 
                        </Grid> 

                      <Grid item xs={6}>
                      <TextField style={{ width: '100%' }} id="filled-basic" size={'small'} label="Sales Order number" variant="outlined" />
                      </Grid>

                      <Grid item xs={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    margin="normal"
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Sales Order Date"
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

                      <Grid item xs={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    margin="normal"
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Date Due"
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

                      <Grid item xs={6}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableFuture
                    margin="normal"
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    label="Warehouse"
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

                      <Grid item xs={6}>
                        <Autocomplete
                    id="customer"
                    options={salesperson}
                    size={'small'}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) => { 
                    //accContext.accDispatch({type:'PAYLOAD',payload:{label:'startDay',value:value.value}})
                      // setFinancialYearDate();
                    }}
                    style={{ width: '100%' }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label={'Sales person'}
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  /> 
                        </Grid>

                        <Grid item xs={8}>
                        <TextField
                         style={{ width: '100%' }}
                      id="note"
                     label="Note"
                     multiline
                     rows={5}
                      variant="outlined"
                     />
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>

            <Grid xs={12}>
              <Paper elevation={2}>
              <div className={classes.pap}>
                <div>
                <React.Fragment>
                  <div className={classes.root}>
                    <Grid container>
                      <Grid item xs={12}>
                        <MUIDataTable
                          className={classes.datatable}
                          data={salesorders}
                          columns={columns}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </React.Fragment>
                </div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <div className={classes.controlButtons}>
              <Grid container spacing={10}>
                <Grid item xs={6}>
                  <Grid item xs={12}>
                  <div className={classes.controlButton}>
                    <Button
                    color="primary"
                    size={'small'}
                     variant="contained">
                      Add New Line
                      </Button>
                      </div> 
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
                </Grid>

                <Grid item xs={6}>
                 <div>
                   <div className={classes.totals}>
                     <Grid container spacing={2}>
                       <Grid item xs={12}>
                         <Paper className={classes.pap} elevation={1}>
                           <Grid container spacing={1}>
                             <Grid item xs={3}>
                             <Typography variant="h6" gutterBottom>
                             Discount
                            </Typography>
                             </Grid>
                             <Grid item xs={9}>
                             <TextField
                             label=""
                             style={{width:'100%'}}
                             type="number"
                            id="outlined-size-small"
                            defaultValue="Small"
                           variant="outlined"
                         size="small"
                          />
                             </Grid>
                             <Grid item xs={3}>
                             <Typography variant="h6" gutterBottom>
                             Shipping fee
                            </Typography>
                             </Grid>
                             <Grid item xs={9}>
                             <TextField
                             label=""
                             style={{width:'100%'}}
                             type="number"
                            id="outlined-size-small"
                            defaultValue="Small"
                           variant="outlined"
                         size="small"
                          />
                             </Grid>
                             <Grid item xs={12}>
                               <div>
                                 <div style={{float:'right',margin:'5px'}}>
                                 <div className={classes.controlButton}>
                                <Button
                                size={'small'}
                                variant="contained">
                                  Add Charges
                                </Button>
                                 </div>
                                 </div>
                               </div>
                             </Grid>
                           </Grid>
                         </Paper>
                       </Grid>

                       <Grid item xs={12}>
                         <Paper className={classes.pap} elevation={1}>
                               <Grid container spacing={1}>
                               <Grid item xs={3}>
                             <Typography variant="h6" gutterBottom>
                             Sub Total
                            </Typography>
                             </Grid>
                             <Grid item xs={9}>
                             <TextField
                             label=""
                             style={{width:'100%'}}
                             id="sub-total"
                              InputProps={{
                           startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          variant="filled"
                              />
                             </Grid>

                             <Grid item xs={3}>
                             <Typography variant="h6" gutterBottom>
                             Total
                            </Typography>
                             </Grid>
                             <Grid item xs={9}>
                             <TextField
                             label=""
                             style={{width:'100%'}}
                             id="total"
                              InputProps={{
                           startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                          variant="filled"
                              />
                             </Grid>
                               </Grid>
                         </Paper>
                       </Grid>

                       <Grid item xs={12}>
                         <div>
                           <div style={{float:'right'}}>
                         <Grid container spacing={1}>
                           <Grid item>
                           <div className={classes.controlButton}>
                                <Button
                                size={'small'}
                                onClick={()=>{salesContext.salesDispatch({type:'NAVIGATION',page:'salesorder'})}}
                                variant="contained">
                                 Cancel
                                </Button>
                                 </div>
                           </Grid>
                           <Grid item>
                           <div className={classes.controlButton}>
                                <Button
                                size={'small'}
                                color="primary"
                                variant="contained">
                                 Save
                                </Button>
                                 </div>
                           </Grid>
                           <Grid item>
                           <div className={classes.controlButton}>
                                <Button
                                size={'small'}
                                color="primary"
                                onClick={()=>{salesContext.salesDispatch({type:'NAVIGATION',page:'shippment'})}}
                                variant="contained">
                                 Save and Sumbit
                                </Button>
                                 </div>
                           </Grid>
                         </Grid>
                         </div>
                         </div>
                       </Grid>
                     </Grid>

                   </div>
                 </div>
                </Grid>

              </Grid>
              </div>
            </Grid>
           
        </Grid>
        </Paper>
        </div>
     );
}
 
export default NewSaleOrder;