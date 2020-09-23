import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import { alphaNumeric } from '../validator';
import swal from 'sweetalert';

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

const useStyles = makeStyles(theme => ({
  root: {}
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewAccountDialog = props => {
  const classes = useStyles(props);

  const {
    loading,
    accountDialog,
    closeNewAccountDialog,
    accountTypes,
    createChartOfAccount,
    updateChartOfAccount,
  } = props;

  const [options, setOptions] = useState({
    checkedG: false,
    isBank: false,
    canHaveParent: false,
  });

  const [values, setValues] = useState({
    accountCode: '',
    accountName: '',
    accountNumber: '',
    accountTypeId: 0,
    bankBalance: 0,
    bankName: '',
    description: '',
    openingBalance: '',
    parentId: null,
    rate: 0,
    status: true,
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }

  const handleSelectChange = (name, value) => {
    setValues({ ...values, [name]: value.id });
  }
  const handleSubmit = () => {
    accountDialog.type === 'new'
      ? createChartOfAccount(values)
      : updateChartOfAccount(values);
  }

  useEffect(() => {
    if (accountDialog.type == 'edit') {
      const { accountCode, accountName, accountNumber, accountTypeId, bankBalance, bankName, description, openingBalance, id } = accountDialog.data
      setValues({ ...values, accountCode, accountName, accountNumber, accountTypeId, bankBalance, bankName, description, openingBalance, id });
    }

  }, [accountDialog.data]);

  console.log(`values  got it b4 post  -> `, values);
  console.log('accountTypes', accountTypes);

  return (
    <div>
      <Dialog
        {...accountDialog.props}
        onClose={closeNewAccountDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-account-title">
          {accountDialog.type === 'new' ? 'New Account' : 'Edit Account'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="standard-account-name"
                label="Account Name"
                name="accountName"
                type="name"
                variant="outlined"
                size="small"
                value={values.accountName}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-accountCode"
                label="Account Code"
                name="accountCode"
                variant="outlined"
                onBlur={() => { }}
                error={!/^[a-zA-Z0-9]+$/i.test(values.accountCode)}
                helperText="value must be alpha numeric"
                size="small"
                value={values.accountCode}
                onChange={handleChange}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              {!options.isBank &&
                <TextField
                  id="standard-opening-balance"
                  label='Opening Balance'
                  name="openingBalance"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={values.openingBalance}
                  onChange={handleChange}
                  margin="normal"
                  fullWidth
                />
              }
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-account-type"
                size="small"
                options={accountTypes}
                getOptionLabel={option => option.accountType}
                onChange={(evt, value) => {
                  // setOptions({
                  //   ...options,
                  //   isBank: value.accountTypeId === 'Bank' ? true : false,
                  //   canHaveParent: value.subAccount,
                  // });
                  setValues({
                    ...values,
                    accountTypeId: value.id,
                    parentId: null,
                  });
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Select Account Type'
                    variant="outlined"
                    placeholder="Account Types"
                    fullWidth
                  />
                )}
              />
            </Grid>
            {options.isBank &&
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    id="standard-bankName"
                    label="Bank Name"
                    name="bankName"
                    type="name"
                    variant="outlined"
                    size="small"
                    value={values.bankName}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-bank-balance"
                    label="Bank balance"
                    name="bankBalance"
                    type="number"
                    variant="outlined"
                    size="small"
                    value={values.bankBalance}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-account-number"
                    label="Account Number"
                    name="accountNumber"
                    type="number"
                    variant="outlined"
                    size="small"
                    value={values.accountNumber}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
              </Grid>
            }

            {options.canHaveParent &&
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={options.checkedG}
                        onChange={() => { }}
                        name="checkedG"
                      />
                    }
                    label="Make parent account."
                  />
                </Grid>

                <Grid item xs={6}>
                  <Autocomplete
                    id="combo-account-types"
                    size="small"
                    options={parent}
                    getOptionLabel={option => option.accountName}
                    onChange={(evt, value) => {
                      setValues({ ...values, parentId: value.id })
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Parent Type"
                        variant="outlined"
                        placeholder="Search"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
              </Grid>
            }

            <Grid item xs={12}>
              <TextField
                id="standard-description"
                label="Description"
                name="description"
                variant="outlined"
                size="small"
                value={values.description}
                onChange={handleChange}
                margin="normal"
                fullWidth
                rows={3}
                multiline
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
          // disabled={loading ? loading : !canSubmitValues()}
          >
            {accountDialog.type === 'new' ? 'Save Account' : 'Update Account'}
          </Button>

          <Button variant="contained" onClick={closeNewAccountDialog} color="inherit">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

NewAccountDialog.propTypes = {
  loading: PropTypes.bool,
  accountDialog: PropTypes.object,
  accountTypes: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountDialog: Selectors.makeSelectNewAccountDialog(),
  accountTypes: Selectors.makeSelectAccountTypeData(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAccountDialog: () => dispatch(Actions.closeNewAccountDialog()),
    createChartOfAccount: data => dispatch(Actions.createChartOfAccount(data)),
    updateChartOfAccount: data => dispatch(Actions.updateChartOfAccount(data)),
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
