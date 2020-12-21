import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  withStyles,
  CircularProgress,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Slide,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import _ from 'lodash';
import { financialStatements } from './../enums';

const useStyles = makeStyles(theme => ({
  root: {},
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

const types = [
  { label: 'Credit', id: 'CREDIT' },
  { label: 'Debit', id: 'DEBIT' },
];

export const initialState = {
  accountCode: '',
  accountName: '',
  accountNumber: '',
  accountTypeId: 0,
  bankBalance: 0,
  bankName: '',
  description: '',
  financialStatement: '',
  openingBalance: '',
  parentId: null,
  rate: 0,
  status: true,
  type: '',
};

const AccountDialog = props => {
  const classes = useStyles(props);

  const {
    loading,
    dialog,
    closeNewAccountDialog,
    accountSetupData,
    chartOfAccounts,
    accountTypes,
    createChartOfAccount,
    updateChartOfAccount,
  } = props;

  const currency = accountSetupData ? accountSetupData.currency : null;
  const [options, setOptions] = useState({ makeSubAccount: false });
  const [errors, setErrors] = useState({ accountCode: '' });
  const [values, setValues] = useState({ ...initialState });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    name === 'openingBalance'
      ? setValues({ ...values, [name]: value.replace(/[^0-9\.]/g, '') })
      : setValues({ ...values, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, object) => {
    setValues({ ...values, [name]: object ? object.id : object });
  };

  const handleOptionsChange = event => {
    setOptions({ ...options, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    dialog.type === 'new'
      ? createChartOfAccount(values)
      : updateChartOfAccount(values);
  };

  const handleCodeValidateOnBlur = event => {
    const { name, value } = event.target;
    if (_.some(chartOfAccounts, { [name]: value })) {
      setErrors({ [name]: `${value} already exist` });
    } else {
      setErrors({ [name]: '' });
    }
  };

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      const {
        accountCode,
        accountName,
        accountNumber,
        accountType,
        bankBalance,
        financialStatement,
        description,
        openingBalance,
        id,
        type,
      } = dialog.data;
      setValues({
        ...values,
        accountCode,
        accountName,
        accountNumber,
        accountTypeId: accountType ? accountType.id : accountType,
        bankBalance,
        financialStatement,
        description,
        openingBalance,
        id,
        type,
      });
    } else {
      setValues({ ...initialState });
    }
  }, [dialog.data]);

  const canSubmitValues = () => {
    const {
      accountCode,
      accountName,
      accountTypeId,
      openingBalance,
      type,
    } = values;
    return (
      !errors.accountCode &&
      accountCode.length > 0 &&
      accountName.length > 0 &&
      accountTypeId &&
      openingBalance &&
      type
    );
  };

  console.log(`values  got it b4 post  -> `, values);
  console.log(`dialog -> `, dialog);
  console.log('accountTypes', accountTypes);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewAccountDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-account-title">
          {dialog.type === 'new' ? 'New Account' : 'Edit Account'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                id="standard-account-name"
                label="Account name"
                name="accountName"
                variant="outlined"
                size="small"
                value={values.accountName}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-account-code"
                label="Account code"
                name="accountCode"
                variant="outlined"
                onBlur={handleCodeValidateOnBlur}
                error={Boolean(errors.accountCode)}
                helperText={errors.accountCode}
                size="small"
                value={values.accountCode}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="accounting-entry-type"
                size="small"
                options={types}
                getOptionLabel={option => option.label}
                onChange={handleSelectChange('type')}
                value={values.type ? _.find(types, { id: values.type }) : null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select debit/credit"
                    variant="outlined"
                    placeholder="DEBIT/CREDIT"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-opening-balance"
                label="Opening balance"
                name="openingBalance"
                variant="outlined"
                size="small"
                value={values.openingBalance ? values.openingBalance : ''}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-account-type"
                size="small"
                options={accountTypes}
                getOptionLabel={option => option.accountType}
                onChange={handleSelectChange('accountTypeId')}
                value={
                  values.accountTypeId
                    ? _.find(accountTypes, { id: values.accountTypeId })
                    : null
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select account type"
                    variant="outlined"
                    margin="dense"
                    placeholder="Account type"
                    fullWidth
                  />
                )}
              />
            </Grid>

            {_.find(accountTypes, { id: values.accountTypeId }) &&
              _.find(accountTypes, {
                id: values.accountTypeId,
              }).accountType.toLowerCase() === 'bank' &&
              _.find(accountTypes, { id: values.accountTypeId }).subAccount && (
                <>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-bank-name"
                      label="Bank name"
                      name="bankName"
                      variant="outlined"
                      size="small"
                      value={values.bankName}
                      onChange={handleChange}
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-account-number"
                      label="Account number"
                      name="accountNumber"
                      type="number"
                      variant="outlined"
                      size="small"
                      value={values.accountNumber}
                      onChange={handleChange}
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                </>
              )}

            {_.find(accountTypes, { id: values.accountTypeId }) &&
              _.find(accountTypes, { id: values.accountTypeId }).subAccount && (
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <GreenCheckbox
                        checked={options.makeSubAccount}
                        onChange={handleOptionsChange}
                        name="makeSubAccount"
                      />
                    }
                    label="Make sub account"
                  />
                </Grid>
              )}

            {options.makeSubAccount && (
              <Grid item xs={12}>
                <Autocomplete
                  id="combo-account-chart"
                  size="small"
                  options={chartOfAccounts.filter(
                    account =>
                      account.accountType &&
                      account.accountType.id === values.accountTypeId,
                  )}
                  getOptionLabel={option => option.accountName}
                  onChange={handleSelectChange('parentId')}
                  value={
                    values.parentId
                      ? _.find(chartOfAccounts, { id: values.parentId })
                      : null
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select parent account"
                      variant="outlined"
                      placeholder="Search"
                      margin="dense"
                      fullWidth
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Autocomplete
                id="account-financial-statement"
                size="small"
                options={financialStatements}
                getOptionLabel={option => option.label}
                onChange={handleSelectChange('financialStatement')}
                value={
                  values.financialStatement
                    ? _.find(financialStatements, {
                        id: values.financialStatement,
                      })
                    : null
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select financial statement"
                    variant="outlined"
                    margin="dense"
                    placeholder="Financial Statement"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="standard-description"
                label="Description"
                name="description"
                variant="outlined"
                size="small"
                value={values.description ? values.description : ''}
                onChange={handleChange}
                margin="dense"
                fullWidth
                rows={2}
                rowsMax={3}
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
            disableElevation
            disabled={loading ? loading : !canSubmitValues()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? 'Save Account' : 'Update Account'}
          </Button>

          <Button
            variant="contained"
            onClick={closeNewAccountDialog}
            color="inherit"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AccountDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  accountTypes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectNewAccountDialog(),
  accountTypes: Selectors.makeSelectAccountTypeData(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
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
)(AccountDialog);
