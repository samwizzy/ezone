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
  } = props;

  console.log('accountTypeData from chart module: ', accountTypeData);
  console.log('parentAccountTypeData from chart module: ', parentAccountTypeData);

  const [checkBox, setCheckBox] = React.useState({
    checkedG: false,
  });

  const [values, setValues] = React.useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    accountType: "",
    accountTypeId: "",
    bankBalance: "",
    description: "",
    ezoneBalance: "",
    orgId: "",
    // parentAccountId: 0,
    subAccount: false // This prop will be removed before payload is sent
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ 
      ...values, 
      accountType: value.accountType, 
      accountTypeId: value.id,
      subAccount: value.subAccount, 
      // parentAccountId: value.id
    });
  };

  const handleCheckBoxChange = (event) => {
    setCheckBox({ ...checkBox, [event.target.name]: event.target.checked });

    // Call parent type api if checked
    if (!checkBox.checkedG) {
      dispatchGetParentAccountTypeAction(values);
    }
  };

  console.log('values: ', values);
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
          {accountDialog.type === 'new' ? (
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
                    id="standard-ezoneBalance"
                    label="E-Zone Balance"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.ezoneBalance}
                    onChange={handleChange('ezoneBalance')}
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
                ): null}

                {values.subAccount ? (
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
                    rows={2}
                    multiline
                  />
                </Grid>
              </Grid>
            </form>
          ) : (
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
                    id="standard-ezoneBalance"
                    label="E-Zone Balance"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.ezoneBalance}
                    onChange={handleChange('ezoneBalance')}
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
                ): null}

                {values.subAccount ? (
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
                    rows={2}
                    multiline
                  />
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                // accountDialog.type === 'new' ? createChartOfAccountAction(values) : updateChartOfAccountAction(values);
                createChartOfAccountAction(values);
              }}
              color="primary"
              // variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save Account
            </Button>
          )}
          <Button
            onClick={closeNewAccountDialogAction}
            color="inherit"
            // variant="contained"
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