/* eslint-disable no-nested-ternary */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

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

import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../components/LoadingIndicator';

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
  return <Slide direction="right" ref={ref} {...props} />;
});

const NewAccountDialog = props => {
  const { 
    loading, 
    accountDialog, 
    closeNewAccountDialogAction,
    accountTypeData,
    detailTypeData,
    dispatchGetDetailTypeAction,
    createChartOfAccountAction,
    updateChartOfAccountAction 
  } = props;

  console.log('accountDialog -> ', accountDialog);

  const classes = useStyles();

  const [values, setValues] = React.useState({
    accountName: "",
    accountNumber: "",
    accountType: "",
    detailType: "",
    description: "",
    ezoneBalance: "",
    orgId: "",
    ref: ""
  });

  React.useEffect(() => {
    if (accountDialog.type === 'edit') {
      const {accountName, accountNumber, accountType, detailType, description, ezoneBalance, orgId, ref} = accountDialog.data;
      setValues({...values, id: accountDialog.data.id, accountName, accountNumber, accountType, detailType, description, ezoneBalance, orgId, ref});
    }
  }, [accountDialog])

  console.log('Selected value: ', values);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    console.log('value is -0-> ', value);
    setValues({ ...values, accountType: value.type });
  };

  const handleDetailTypeSelectChange = (name, value) => {
    // Call detail type api
    // dispatchGetDetailTypeAction(value);
    setValues({ ...values, detailType: value.name });
  };


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
                  id="standard-accountNumber"
                  label="Account Code"
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
                <TextField
                  id="standard-ref"
                  label="Reference Code"
                  type="name"
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  value={values.ref}
                  onChange={handleChange('ref')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={accountTypeData}
                  getOptionLabel={option => option.type}
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
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={detailTypeData}
                  getOptionLabel={option => option.name}
                  onChange={(evt, value) => handleDetailTypeSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Detail Type"
                      className={classes.textField}
                      variant="outlined"
                      placeholder="Search"
                      fullWidth
                    />
                  )}
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
                  id="standard-accountNumber"
                  label="Account Code"
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
                <TextField
                  id="standard-ref"
                  label="Reference Code"
                  type="name"
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  value={values.ref}
                  onChange={handleChange('ref')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={accountTypeData}
                  getOptionLabel={option => option.type}
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
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={detailTypeData}
                  getOptionLabel={option => option.name}
                  onChange={(evt, value) => handleDetailTypeSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Detail Type"
                      className={classes.textField}
                      variant="outlined"
                      placeholder="Search"
                      fullWidth
                    />
                  )}
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
                accountDialog.type === 'new' ? createChartOfAccountAction(values) : updateChartOfAccountAction(values);
                // createChartOfAccountAction(values);
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
  // detailTypeData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountDialog: Selectors.makeSelectNewAccountDialog(),
  accountTypeData: Selectors.makeSelectAccountTypeData(),
  detailTypeData: Selectors.makeSelectDetailTypeData(),
  chartOfAccountPostData: Selectors.makeSelectChartOfAccountPostData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    closeNewAccountDialogAction: () => dispatch(Actions.closeNewAccountDialog()),
    dispatchGetDetailTypeAction: evt => dispatch(Actions.getDetailTypeAction(evt)),
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
