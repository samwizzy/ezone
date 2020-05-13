import React, { memo } from 'react';
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

  console.log('accountTypeData from chart module: ', accountTypeData);
  console.log('parentAccountTypeData -> : ', parentAccountTypeData);

  const [checkBox, setCheckBox] = React.useState({
    checkedG: false,
  });

  const [values, setValues] = React.useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    accountType: "",
    bankBalance: "",
    description: "",
    openingBalance: "",
    orgId: "",
    subAccount: false // This prop will be removed before payload is sent
  });

  // const canSubmitValues = () => {
  //   const { accountCode, accountName, accountType, openingBalance } = values;
  //   return accountCode.length > 0 && accountName.length > 0 && accountType.length > 0 && openingBalance.length > 0;
  // }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    console.log('selected value -> ', value)
    setValues({ 
      ...values, 
      accountType: value.accountType,
      subAccount: value.subAccount, 
      description: value.description,
      parentAccountId: ""
    });
  };

  const handleSelectParentAccountType = (name, value) => {
    console.log('ParentAcc type -> ', value)
    setValues({ 
      ...values, 
      parentAccountId: value.id
    });
  };
  

  const handleCheckBoxChange = (event) => {
    setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });

    // Call parent type api if checked
    if (!checkBox.checkedG) {
      dispatchGetParentAccountTypeAction(values);
    } else {
      console.log("unchecked");
      setValues({ 
        ...values, 
        parentAccountId: ""
      });
    }
  };

  React.useEffect(() => {
    if (accountDialog.type == 'edit') {
      const { id, orgId, accountName, accountCode, openingBalance, accountType, bankBalance, description } = accountDialog.data
      setValues({ ...values, id, orgId, accountName, accountCode, openingBalance, accountType, bankBalance, description });
    }
  }, [accountDialog.data]);

  console.log('values : ', values);
  console.log('checkBox: ', checkBox);


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
                    type="name"
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
                    options={accountTypeData}
                    getOptionLabel={option => option.accountType}
                    onChange={(evt, value) => handleSelectChange(evt, value)}
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
                {values.accountType == "Bank" ? (
                  <Grid container spacing={1}>
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
                ): values.subAccount ? (
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
                        options={parentAccountTypeData}
                        getOptionLabel={option => option.name}
                        onChange={(evt, value) => handleSelectParentAccountType(evt, value)}
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
                    InputProps={{
                      readOnly: true,
                    }}
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
              onClick={() => { accountDialog.type === 'new' ? createChartOfAccountAction(values) : updateChartOfAccountAction(values) }}
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
  accountTypeData: Selectors.makeSelectAccountTypeData(),
  parentAccountTypeData: Selectors.makeSelectParentAccountTypeData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    closeNewAccountDialogAction: () => dispatch(Actions.closeNewAccountDialog()),
    dispatchGetParentAccountTypeAction: evt => dispatch(Actions.getParentAccountTypeAction(evt)),
    createChartOfAccountAction: evt => dispatch(Actions.createNewChartOfAccountAction(evt)),
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