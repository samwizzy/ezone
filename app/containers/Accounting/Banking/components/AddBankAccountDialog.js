import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
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
  Typography
} from '@material-ui/core';

import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddBankAccountDialog = props => {
  const classes = useStyles();

  const {
    loading,
    currentUser, 
    accountTypeData,
    bankAccountDialog, 
    closeNewBankAccountDialogAction,
    dispatchCreateNewBankAction,
    dispatchUpdateBankAccountAction,
    dispatchDeleteBankAccountAction,
    dispatchActivateBankAccountAction,
    dispatchDeactivateBankAccountAction
  } = props;

  const [values, setValues] = React.useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    bankBalance: "",
    bankName: "",
    description: "",
    orgId: currentUser.organisation.orgId,
  });

  const canSubmitValues = () => {
    const { accountCode, accountName, accountNumber, bankBalance, bankName, description } = values;
    return accountCode.length > 0 && accountName.length > 0 && accountNumber.length > 0 && bankBalance.length > 0 && bankName.length > 0 && description.length > 0;
  }
 //
  React.useEffect(() => {
    if (bankAccountDialog.type == 'edit') {
      const { accountCode, accountName, accountNumber, bankBalance, bankName, description } = bankAccountDialog.data;
      setValues({ ...values, accountCode, accountName, accountNumber, bankBalance, bankName, description });
    }
  }, [bankAccountDialog.data]);
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  console.log('values is: ', values);
  console.log('selected account is: ', bankAccountDialog.data);

  return (
    <div>
      <Dialog
        {...bankAccountDialog.props}
        onClose={closeNewBankAccountDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          { bankAccountDialog.type === 'new' ? "Add Bank Account" : bankAccountDialog.type === 'edit' ? "Edit Bank Account" : bankAccountDialog.type === 'delete' ? "Delete Account" : bankAccountDialog.type === "activate" ? "Activate Account" : bankAccountDialog.type === "deactivate" ? "De-activate Account" : "" }
        </DialogTitle>

        <DialogContent dividers>
          {bankAccountDialog.type === 'new' ? (
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
                    id="standard-accountNumber"
                    label="Bank Account Number"
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
          ) : bankAccountDialog.type === 'edit' ? (
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
                      id="standard-accountNumber"
                      label="Bank Account Number"
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
            ) : bankAccountDialog.type === 'delete' ? (
              <Typography>Are you sure you want to delete this item?</Typography>
            ) : bankAccountDialog.type === 'activate' ? (
              <Typography>Are you sure you want to activate this account?</Typography>
            ) : bankAccountDialog.type === 'deactivate' ? (
              <Typography>Are you sure you want to de-activate this account?</Typography>
            ) : null }
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => { 
                switch (bankAccountDialog.type) {
                  case 'new':
                    dispatchCreateNewBankAction(values);
                    break;
                  case 'edit':
                    values.id = bankAccountDialog.data.id // Assign id to values object
                    dispatchUpdateBankAccountAction(values);
                    break;
                  case 'delete':
                    dispatchDeleteBankAccountAction(bankAccountDialog.data)
                    break;
                  case 'activate':
                    dispatchActivateBankAccountAction(`id=${bankAccountDialog.data.id}&status=true`)
                    break;
                  case 'deactivate':
                    dispatchDeactivateBankAccountAction(`id=${bankAccountDialog.data.id}&status=false`)
                    break;
                  default:
                    console.log("Not a valid type");
                }
              }}
              color="primary"
              disabled={ bankAccountDialog.type === 'new' ? !canSubmitValues() : "" }
            >
              { bankAccountDialog.type === "new" ? "Save" : bankAccountDialog.type === "edit" ? "Update" : bankAccountDialog.type === "delete" ? "Delete" : bankAccountDialog.type === "activate" ? "Activate" : bankAccountDialog.type === "deactivate" ? "De-activate" : "" }
            </Button>
          )}
          <Button
            onClick={ closeNewBankAccountDialogAction }
            color="inherit"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddBankAccountDialog.propTypes = {
  loading: PropTypes.bool,
  bankAccountDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  bankAccountDialog: Selectors.makeSelectBankAccountDialog(),
  accountTypeData: Selectors.makeSelectAccountTypeData(),
});



function mapDispatchToProps(dispatch) {
  return {
    closeNewBankAccountDialogAction: () => dispatch(Actions.closeNewBankAccountDialog()),
    dispatchCreateNewBankAction: evt => dispatch(Actions.createNewBankAction(evt)),
    dispatchUpdateBankAccountAction: evt => dispatch(Actions.updateBankAccountAction(evt)),
    dispatchDeleteBankAccountAction: evt => dispatch(Actions.deleteBankAccountAction(evt)),
    dispatchActivateBankAccountAction: evt => dispatch(Actions.activateBankAccountAction(evt)),
    dispatchDeactivateBankAccountAction: evt => dispatch(Actions.deactivateBankAccountAction(evt)),
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
)(AddBankAccountDialog);