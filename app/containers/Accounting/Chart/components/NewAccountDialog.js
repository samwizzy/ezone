import React, { memo,useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

import {
  withStyles,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  Slide,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import * as Endpoints from '../../../../components/Endpoints';
import axios from "axios";
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1.5, 0),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 100,
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewAccountDialog = props => {
  const classes = useStyles();

  const { 
    loading, 
    accountDialog, 
    closeNewAccountDialogAction,
    accountTypeData,
    parentAccountTypeData,
    dispatchGetParentAccountTypeAction,
    createChartOfAccountAction,
    updateChartOfAccountAction
  } = props;


  const [checkBox, setCheckBox] = useState({
    checkedG: false,
    isBank:false,
    canHaveParent:false
  });

  const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
  const [accessToken] = useState(localStorage.getItem('access_token'))
  const [accountType,setAccountType] = useState([]);
  const [accountParentType,setAccountParentType] = useState([]);


  const [values, setValues] = useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    accountTypeId: 0,
    bankBalance: 0,
    bankName: "",
    description: "",
    id:credentials.id,
    openingBalance: 0,
    orgId:credentials.organisation && credentials.organisation.orgId,
    parentId: 0,
    rate: 0,
    status: true,
  });

  //Load AccTypes
  useEffect(() => {
    async function getAllAccountTypeFSev() {
      
      const config = {
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', }
    };

    await axios
    .get(`${Endpoints.GetAllAccountTypeApi}`,
    config)
    .then((res) => {
      let accType = res.data;
      //setIsEmpty(chatData.length > 0 ?false :true);
      //setchartOfAccountData(chatData)
      setAccountType(accType);
      setAccountParentType(accType);
      console.log(`All AccoutType ${JSON.stringify(accType)}`)
    })

    .catch((err) => {
      console.log(`error ocurr at NewAccountDialog ${err}`);
    });
    


    }

    getAllAccountTypeFSev() ;

    return () => {
      getAllAccountTypeFSev()
    };

  },[]);


  //Create New Account 

  async function createChartOfAccountHandler() {

    const config = {
      headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', }
  };

    console.log(`before you post ${JSON.stringify(values)} token ${accessToken}`)
   
    await axios.post(`${Endpoints.CreateChartOfAccountApi}`,values,config)
     .then((res) => {
          let chatOfAccResponse = res.data;
          console.log(`from Business response ${chatOfAccResponse}`);
         
        })
  
        .catch((err) => {
          console.log(`error ocurr in Chart of Account ${err}`);
        });

    }

  //Create New Account
  

  // const canSubmitValues = () => {
  //   const { accountCode, accountName, accountType, openingBalance } = values;
  //   return accountCode.length > 0 && accountName.length > 0 && accountType.length > 0 && openingBalance.length > 0;
  // }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  const handleSelectChange = (name, value) => {
    setValues({ 
      ...values, 
      [name] :value.id
    });
  };


  

  const handleCheckBoxChange = (event) => {
    setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });

    // Call parent type api if checked
    if (!checkBox.checkedG) {
      //dispatchGetParentAccountTypeAction(values);
    } else {
      console.log("unchecked");
    }
  };

  useEffect(() => {
    if (accountDialog.type == 'edit') {
      const {accountCode,accountName,accountNumber, accountTypeId,bankBalance,bankName,description,id,openingBalance,orgId,parentId,rate,status} = accountDialog.data
      setValues({ ...values, accountCode,accountName,accountNumber, accountTypeId,bankBalance,bankName,description,id,openingBalance,orgId,parentId,rate,status });
    }
  }, [accountDialog.data])

  console.log(`values  got it b4 post  -> `, values);

  return (
    <div>
      <Dialog
        {...accountDialog.props}
        onClose={closeNewAccountDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {accountDialog.type === 'new' ? 'New Account' : 'Edit Account'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {accountDialog.type === 'new' || accountDialog.type === 'edit' ? (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-accountName"
                    label="Account Name"
                    type="name"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.accountName}
                    onChange={handleChange('accountName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-accountCode"
                    label="Account Code"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.accountCode}
                    onChange={handleChange('accountCode')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-openingBalance"
                    label="Opening Balance"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.openingBalance}
                    onChange={handleChange('openingBalance')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={accountType}
                    getOptionLabel={option => option.accountType}
                    onChange={(evt, value) =>{ 
                      handleSelectChange('accountTypeId', value)
                      if(value.accountType ==='Bank'){
                        setCheckBox({ ...checkBox, isBank: true, canHaveParent: value.subAccount });
                      }
                      else
                      setCheckBox({ ...checkBox,isBank: false, canHaveParent: value.subAccount });
                    }
                  }
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Account Type"
                        className={classes.textField}
                        variant="outlined"
                        placeholder="Search"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                {checkBox.isBank ? (
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-bankName"
                        label="Bank Name"
                        type="name"
                        variant="outlined"
                        size="small"
                        className={classes.textField}
                        value={values.bankName}
                        onChange={handleChange('bankName')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-bankBalance"
                        label="Bank balance"
                        type="number"
                        variant="outlined"
                        size="small"
                        className={classes.textField}
                        value={values.bankBalance}
                        onChange={handleChange('bankBalance')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="standard-accountNumber"
                        label="Account Number"
                        type="number"
                        variant="outlined"
                        size="small"
                        className={classes.textField}
                        value={values.accountNumber}
                        onChange={handleChange('accountNumber')}
                        margin="normal"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                ): checkBox.canHaveParent ? (
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <FormGroup row>
                        <FormControlLabel
                          control={<GreenCheckbox 
                            checked={checkBox.checkedG} 
                            onChange={handleCheckBoxChange} 
                            name="checkedG" 
                          />}
                          label="Make parent account."
                        />
                      </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <Autocomplete
                        id="combo-box-demo"
                        size="small"
                        options={accountParentType}
                        getOptionLabel={option => option.accountType}
                        onChange={(evt, value) => handleSelectChange('parentId', value)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Select Parent Type"
                            className={classes.textField}
                            variant="outlined"
                            placeholder="Search"
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                ): null}

                <Grid item xs={12}>
                  <TextField
                    id="standard-description"
                    label="Description"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="normal"
                    fullWidth
                    rows={3}
                    multiline
                  />
                </Grid>
              </Grid>
            </form>
          ) : null}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => { accountDialog.type === 'new' ? createChartOfAccountHandler() : updateChartOfAccountAction(values) }}
              color="primary"
              // disabled={ accountDialog.type === "new" ? !canSubmitValues() : "" }
            >
              { accountDialog.type === 'new' ? 'Save Account' : 'Update Account' }
            </Button>
          )}
          <Button
            onClick={ closeNewAccountDialogAction }
            color="inherit"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

NewAccountDialog.propTypes = {
  loading: PropTypes.bool,
  accountDialog: PropTypes.object,
  accountTypeData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountDialog: Selectors.makeSelectNewAccountDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    closeNewAccountDialogAction: () => dispatch(Actions.closeNewAccountDialog()),
    updateChartOfAccountAction: evt => dispatch(Actions.updateChartOfAccountAction(evt)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewAccountDialog);