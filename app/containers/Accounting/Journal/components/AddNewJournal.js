import React, { memo, useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableFooter,
  FormGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { positions } from '@material-ui/system';
import DateFnsUtils from '@date-io/date-fns';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddIcon from '@material-ui/icons/Add';
import { Autocomplete } from '@material-ui/lab';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {alphaNumeric} from "../validator.js";
import * as Actions from '../actions';
import FileContainer from '../filecontainer';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
// import LoadingIndicator from '../../../../components/LoadingIndicator';
import ModuleLayout from '../../components/ModuleLayout';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.grey[100],
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textField:{
    width:'100%'
  },
  grid: {
    justifyContent: "space-between",
    '& .MuiGrid-item': {
      flex: 1,
      margin: theme.spacing(2, 0),
    }
  },
  
  gridMargin: { marginBottom: theme.spacing(2) },
  label: { marginLeft: theme.spacing(1) },
  table: {
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
    '& .MuiTableFooter-root': {},
    '& .MuiTableCell-root': {
      '& button:nth-child(n+2)': {
        marginLeft: theme.spacing(1),
      },
    },
  },
}));

const AddNewJournal = props => {
  const classes = useStyles();
  const [display,setDisplay] = useState(null);

  function generateCode(){
    let credentials = JSON.parse(localStorage.getItem('user'))
    let company = (`${(credentials.organisation.companyName)}`); 
    let timestamp = (`${(new Date).getTime()}`).substr(0,4);
    return `${company.substr(0,3)}${timestamp}`;
  }

  const [referenceNo] = useState(generateCode())
  const [taxApplicable,setTaxApplicable] = useState(false);
  const [tax,seTax] = useState([
   {
     value:20,
     label:'Dollar tax 20%'
   }, 
   {
    value:7,
    label:'Vat 7%'
  }, 
  ])
  

  

  const {
    history,
    currentUser,
    dispatchGetAccountPeriodAction,
    dispatchGetAllChartOfAccountTypeAction,
    chartOfAccountData,
    accountPeriodData,
    createNewAccountJournalAction
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAccountPeriodAction();
    dispatchGetAllChartOfAccountTypeAction();
  }, []);

  // Select current financial year
  
  const currentAccountPeriod = accountPeriodData.find((item) => item.status && item.activeYear);
  let xuv = 0;
  xuv = accountPeriodData.length;
    // Filter all periods with status -> true
    const filteredAccountPeriodData = accountPeriodData.filter((item) => item.status);
    //console.log('accountPeriodData is -> ', JSON.stringify(accountPeriodData));

  const [values, setValues] = React.useState({
    entries: [],
    note: "",
    orgId: currentUser.organisation.orgId,
    periodId: "",
    transactionDate:"",
    reference: ""
  });

  const addRow = () => {
    const item = {
      accountId: "",
      credit: 0,
      debit: 0,
      description: "",
    };
    setValues({ ...values, "entries": [ ...values.entries, item ] });
  };

  const removeRow = index => {
    values.entries.splice(index, 1);
    setValues({ ...values });
  };

  const handleChange = name => event => {
    const textValue = event.target.value; 
        setValues({ ...values, [name]: textValue });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, periodId: value.id, transactionDate: value.startDate });
  };

  const handleRowChange = (event, index) => {
    const entries = [...values.entries];
    entries[index][event.target.name] = event.target.value;
    setValues({ ...values, entries });
  }
  const handleDateChange = (date, name) => {
    setValues({...values, [name]: date })
  }

  const handleSelectChangeRows = (event, value, index) => {
    const { entries } = values;
    entries[index]["accountId"] = value.id;
    setValues({ ...values, entries });
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  function checkDebitandCredit(){
    if(values.entries.length > 1){
     let debit = 0;
     let credit = 0;
     for(let i=0;i<values.entries.length;i++){
       debit = Number(values.entries[i].debit) +Number(debit);
       credit = Number(values.entries[i].credit) + Number(credit);
     }
     console.log(`credit ${Number(credit)} Debit ${Number(debit)}`)
     if(Number(debit) === Number(credit)){
       /*if(xuv < 2){
        setValues({ ...values, periodId: currentAccountPeriod.id, transactionDate: currentAccountPeriod.startDate });
       }*/
       return true;
     }
     return false;
    }
    else
    return false;
  }

  function filtered(value){
    console.log(JSON.stringify(value[0]))
  let result = [];
  for(let i=0;i<value.length;i++){
    console.log(`filtered ${value[i].status}`)
    if(value[i].status){
      result = [...result,value[i]];
    }
  }
  return result;
  }

  const isDisabled = () => {
    
    return  isAphaNumeric && checkDebitandCredit()
    //return (values.entries.reduce((a, b) => a + Number(b.credit), 0) != values.entries.reduce((a, b) => a + Number(b.debit), 0) || (values.entries.reduce((a, b) => a + Number(b.credit), 0) + values.entries.reduce((a, b) => a + Number(b.debit), 0)) === 0) && isAphaNumeric;
  }

  const handleImageChange = (ev) => { 
    let fileNode = []
    Object.keys(ev.target.files).map(index => {
      const { name } = ev.target.files[index]
      const result = toBase64(ev.target.files[index]);
      result.then(rs => {
        const file = Object.assign({}, { fileName: name, file: rs })
        fileNode.push(file)
        let k = (`${name}`).lastIndexOf(".");
        let extension = (`${name}`).substr(k+1);
        setDisplay({name:name,icon:extension})
        
      })   
    })
    setValues(_.set({ ...values }, event.target.name, fileNode))
  }


  const [isAphaNumeric,setIsAphaNumeric] = useState(true)

  const checkAlphaNumeric = event =>{
    let value= event.target.value;
    let txt = alphaNumeric(value)
    if(txt){
      setIsAphaNumeric(true)
    }
    else
    setIsAphaNumeric(false)
  }

  function submitValue(){
    let date = (new Date).toISOString();
    let k = date.lastIndexOf(".");
    date =`${date.substr(0,k+1)}000+0000`;
    setValues({ ...values, periodId: currentAccountPeriod.id, transactionDate:date });
    createNewAccountJournalAction(values);
      history.push({
      pathname: '/account/journal'})
  }

  const currencies = [
    {
      value: 'DOLLAR',
      label: 'Dollar',
    },
    {
      value: 'EURO',
      label: 'Euro',
    },
    {
      value: 'NAIRA',
      label: 'Naira',
    }
  ]


  function OnlyCurrencyLabel(value) {
    switch (value) {
      case 'DOLLAR':
        return 'Dollar'
      case 'EURO':
      return 'Euro'
      case 'NAIRA':
      return 'Naira'    
    }
  }

  console.log('values -> ', values);
  //console.log('currentAccountPeriod is -> ', currentAccountPeriod);
  console.log('chartOfAccountData from Journal is -> ',chartOfAccountData[0]);

  return (
    <ModuleLayout>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classNames(classes.gridMargin)}>
            <div className={classes.flex}>
              <Typography variant="h5">New Journal</Typography>
         
              {currentAccountPeriod === undefined ?
              (<div/>)
              :
              (
              xuv === 0 ?
              
              <Autocomplete
                id="combo-box-demo"
                options={filteredAccountPeriodData}
                style={{width: 300}}
                getOptionLabel={option => `${moment(option.startDate).format('dddd do-MMM-YYYY')} - ${moment(option.endDate).format('dddd do-MMM-YYYY')}`}
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Financial Year"
                    size="small"
                    placeholder="Date"
                    margin="normal"
                  />
                )}
              />
              
              :
              
              <Typography variant="subtitle1" color="textSecondary">{`${moment(currentAccountPeriod.startDate).format('dddd do-MMM-YYYY')} - ${moment(currentAccountPeriod.endDate).format('dddd do-MMM-YYYY')}`}</Typography>
              
              )
              }
            
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
                    label="Transaction Date"
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


              <Grid item xs={5}>
                <div>
                  <div style={{position:'relative',left:'40%'}}>
                {isAphaNumeric ?
                  <TextField
                  id="standard-accountCode"
                  label="Reference Number"
                  type="name"
                  onBlur={checkAlphaNumeric}
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  value={referenceNo}
                  onChange={e=>{
                    handleChange('reference')
                    setReferenceNo(e.target.value)}
                  }
                  margin="normal"
                  fullWidth
                />
                  :
                  <TextField
                    id="standard-accountCode"
                    label="Reference Number"
                    type="name"
                    onBlur={checkAlphaNumeric}
                    error
                    helperText="value must be alpha numeric"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.reference}
                    onChange={handleChange('reference')}
                    margin="normal"
                    fullWidth
                  />
                }
                </div>
                </div>
              </Grid>

              <Grid item xs={5}>
            <Autocomplete
                id="currency"
                options={currencies}
                getOptionLabel={option => option.label}
                //onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Currency"
                    size="small"
                    variant="outlined"
                    placeholder="Currency"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>


            <Grid item xs={5}>
            <div>
              <div style={{position:'relative',left:'40%'}}>
              <Grid container spacing={3} style={{position:'relative',top:'-5px'}}>
                <Grid item xs={12}>
                  <div>
                  <Typography variant="subtitle1" color="textSecondary">Exchange rate</Typography>
                  </div>
                </Grid>

              <Grid item xs={12}>
              <div className="input-group mb-3" style={{position:'relative',top:'-2em'}}>
           <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">1 Dollar =</span>
          </div>
        <input type="number" className="form-control" 
          aria-describedby="basic-addon1"/>
          <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">NGN</span>
          </div>
        </div>
              </Grid>
           
        </Grid>
        </div>
        </div>
            </Grid>

            <Grid item xs={12}>
              <div>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="end"
                      checked={taxApplicable === true}
                      onChange ={()=>setTaxApplicable(!taxApplicable) }
                      control={<Checkbox color="primary" />}
                      label="Tax applicable"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </FormControl>
              </div>
            </Grid>

            
            <Grid item xs={5}>
             <div>
               {taxApplicable ?
             <Autocomplete
                id="tax"
                options={tax}
                getOptionLabel={option => option.label}
                //onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Applicable rates"
                    size="small"
                    placeholder="tax applicable"
                    margin="normal"
                  />
                )}
              />
              :
              <div/>
              }
             </div>
            </Grid>
           
        
            <Grid item xs={12}>
              <TextField
                id="standard-note"
                label="Notes"
                size="small"
                variant="outlined"
                className={classes.textField}
                value={values.note}
                onChange={handleChange('note')}
                margin="normal"
                fullWidth
                rows={4}
                multiline
              />
            </Grid>

            
          
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell component="th">Account</TableCell>
                  <TableCell component="th">Description</TableCell>
                  <TableCell component="th">Debit</TableCell>
                  <TableCell component="th">Credit</TableCell>
                  <TableCell component="th" />
                </TableRow>
              </TableHead>
              <TableBody>
              {values.entries.map((row, id) => (
                <TableRow key={id}>
                  <TableCell align="center">
                    <Autocomplete
                      id={`${id}`}
                      options={filtered(chartOfAccountData)}
                      getOptionLabel={option => `${option.accountCode} ${option.accountName}`}
                      onChange={(evt, value) => handleSelectChangeRows(evt, value, id)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Account"
                          size="small"
                          className={classes.textField}
                          variant="outlined"
                          placeholder="Search"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-description"
                      label="Description"
                      size="small"
                      type="name"
                      variant="outlined"
                      className={classes.textField}
                      name="description"
                      value={row.description}
                      onChange={(event) => handleRowChange(event, id)}
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-accountName"
                      label="Debit"
                      size="small"
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      name="debit"
                      value={row.debit}
                      disabled={row.credit}
                      onChange={(event) => handleRowChange(event, id)}
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      id="standard-accountName"
                      label="Credit"
                      size="small"
                      type="number"
                      variant="outlined"
                      className={classes.textField}
                      name="credit"
                      value={row.credit}
                      disabled={row.debit}
                      onChange={(event) => handleRowChange(event, id)}
                      margin="normal"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" onClick={() => removeRow(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">
                        { values.entries.reduce((a, b) => a + Number(b.debit), 0) }
                      </Typography>
                    </Paper>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">
                        { values.entries.reduce((a, b) => a + Number(b.credit), 0) }
                      </Typography>
                    </Paper>
                  </TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                <TableCell colSpan={2} align="right">
                    <Typography variant="h6">Tax rate</Typography>
                  </TableCell>
                  <TableCell>
                    <Paper elevation={0} square className={classes.paper}>
                      <Typography variant="h6">
                        0
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Table className={classes.table}>
              <TableFooter>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addRow()}
                      startIcon={<AddIcon />}
                    >
                      Add Another Line
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="label"
                      startIcon={<AttachFileIcon />}
                      className={classes.label}
                    >
                      Attach a file
                      <input
                        name="attachments"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        multiple
                      />
                    </Button>
                  </TableCell>
                  
                </TableRow>
                <TableRow>
                  <TableCell colSpan={12}>
                    <div>
                      {display === null ?
                      <div/>
                      :
                      <div>
                        <FileContainer name={display.name} icon={display.icon} />
                      </div>
                      
                      }
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Save Draft
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      disabled={!isDisabled()}
                      onClick={() => {
                        submitValue()
                      }}
                      
                    >
                      Save and Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Grid>
        </Grid>
      </div>
    </ModuleLayout>
  );
};

AddNewJournal.propTypes = {
  //   loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  //   loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  chartOfAccountData: Selectors.makeSelectGetChartOfAccountData(),
  accountPeriodData: Selectors.makeSelectGetAccountPeriodData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    dispatchGetAccountPeriodAction: () => dispatch(Actions.getAccountPeriodAction()),
    createNewAccountJournalAction: evt => dispatch(Actions.createNewAccountJournalAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddNewJournal);
