import React, { memo } from 'react';
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
} from '@material-ui/core';

import * as AppSelectors from '../../../App/selectors';
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
    dispatchUpdateBankAccountAction
  } = props;

  const [values, setValues] = React.useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    accountTypeId: 4, // working on changing this
    bankBalance: "",
    bankName: "",
    description: "",
    orgId: currentUser.organisation.orgId,
  });
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // console.log('values: ', values);
  // console.log('dialog data --> ', accountTypeData);

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
          {bankAccountDialog.type === 'new' ? 'Add Bank Account' : 'Edit Bank Account'}
        </DialogTitle>
        <Divider />
        <DialogContent>
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
                bankAccountDialog.type === 'new' ? dispatchCreateNewBankAction(values) : dispatchUpdateBankAccountAction(values);
              }}
              color="primary"
              // variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={closeNewBankAccountDialogAction}
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

AddBankAccountDialog.propTypes = {
  loading: PropTypes.bool,
  bankAccountDialog: PropTypes.object,
//   accountTypeData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  bankAccountDialog: Selectors.makeSelectBankAccountDialog(),
  accountTypeData: Selectors.makeSelectAccountTypeData(),
//   accountTypeData: Selectors.makeSelectAccountTypeData(),
//   parentAccountTypeData: Selectors.makeSelectParentAccountTypeData(),
});



function mapDispatchToProps(dispatch) {
  return {
    closeNewBankAccountDialogAction: () => dispatch(Actions.closeNewBankAccountDialog()),
    dispatchCreateNewBankAction: evt => dispatch(Actions.createNewBankAction(evt)),
    dispatchUpdateBankAccountAction: evt => dispatch(Actions.updateBankAccountAction(evt)),
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