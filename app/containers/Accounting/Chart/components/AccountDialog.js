import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
import _ from 'lodash';

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

const initialState = {
  id: '',
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
    chartOfAccounts,
    accountTypes,
    createChartOfAccount,
    updateChartOfAccount,
  } = props;

  const [options, setOptions] = useState({
    isParent: false,
    isBank: false,
    canHaveParent: false,
  });

  const [values, setValues] = useState({ ...initialState });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
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
      accountNumber,
      accountTypeId,
      bankBalance,
      description,
      type,
    } = values;
    return (
      accountCode.length > 0 &&
      accountName.length > 0 &&
      accountTypeId &&
      bankBalance &&
      description.length > 0 &&
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
                label="Account Name"
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
                label="Account Code"
                name="accountCode"
                variant="outlined"
                onBlur={() => { }}
                error={
                  !/^[a-z0-9]+$/i.test(values.accountCode) &&
                  values.accountCode.length > 0
                }
                helperText={
                  !/^[a-z0-9]+$/i.test(values.accountCode) &&
                    values.accountCode.length > 0
                    ? 'Account Code must be alphanumeric'
                    : ''
                }
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
                    label="Select Debit/Credit"
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
                label='Opening Balance'
                name="openingBalance"
                variant="outlined"
                size="small"
                value={values.openingBalance ? values.openingBalance : ""}
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
                    label="Select Account Type"
                    variant="outlined"
                    margin="dense"
                    placeholder="Account Types"
                    fullWidth
                  />
                )}
              />
            </Grid>

            {(_.find(accountTypes, { id: values.accountTypeId }) && _.find(accountTypes, { id: values.accountTypeId }).accountType.toLowerCase() === 'bank') &&
              <>
                <Grid item xs={6}>
                  <TextField
                    id="standard-bank-name"
                    label="Bank Name"
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
                    label="Account Number"
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
            }

            {_.find(accountTypes, { id: values.accountTypeId }) &&
              _.find(accountTypes, { id: values.accountTypeId }).subAccount ? (
                <>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <GreenCheckbox
                          checked={options.isParent}
                          onChange={handleOptionsChange}
                          name="isParent"
                        />
                      }
                      label="Make parent account."
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      id="combo-account-chart"
                      size="small"
                      options={chartOfAccounts}
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
                          label="Select Parent Type"
                          variant="outlined"
                          placeholder="Search"
                          margin="dense"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                </>
              ) : null}

            <Grid item xs={12}>
              <TextField
                id="standard-financial-statement"
                label="Financial Statement"
                name="financialStatement"
                variant="outlined"
                size="small"
                value={values.financialStatement}
                onChange={handleChange}
                margin="dense"
                fullWidth
                rows={3}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-description"
                label="Description"
                name="description"
                variant="outlined"
                size="small"
                value={values.description}
                onChange={handleChange}
                margin="dense"
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
