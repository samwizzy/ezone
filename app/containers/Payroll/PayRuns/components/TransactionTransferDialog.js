import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  CircularProgress,
  TextField,
  makeStyles,
  Button,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  FormHelperText,
  Slide,
  Grid,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import _ from 'lodash';
import EzoneUtils from '../../../../utils/EzoneUtils';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as PayrollSelectors from '../../selectors';
import * as Actions from '../actions';
import { IsoCodeToFlag } from '../../components/IsoCodeFormatter'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  flag: {
    width: 20,
    marginRight: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const transferTypes = [
  { label: 'Transfer In', id: 'TRANSFERIN' },
  { label: 'Transfer Out', id: 'TRANSFEROUT' },
];

const TransactionTransferDialog = props => {
  const classes = useStyles();

  const {
    loading,
    accountSetupData,
    bankAccounts,
    currencies,
    accountTypes,
    dialog,
    closeAccountTransferToDialog,
    createBankTransfer,
  } = props;

  const [values, setValues] = useState({
    amount: '',
    attachments: [],
    bankId: '',
    currentBankId: '',
    currencyId: 0,
    rate: 0,
    description: '',
    referenceNumber: '',
    transferDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
    transferType: 'TRANSFERIN',
  });

  useEffect(() => {
    if (dialog.type === 'to' && dialog.data) {
      setValues({ ...values, currentBankId: dialog.data.id, transferType: 'TRANSFEROUT' });
    } else if (dialog.type === 'from' && dialog.data) {
      setValues({ ...values, currentBankId: dialog.data.id, transferType: 'TRANSFERIN' });
    }
  }, [dialog.data]);

  const flag = src => <img className={classes.flag} src={src} />;

  const handleChange = event => {
    const { name, value } = event.target
    name === 'amount'
      ? setValues({ ...values, [name]: value.replace(/[^0-9]/g, '') })
      : setValues({ ...values, [name]: value });
  };

  const handleSelectChange = name => (event, object) => {
    setValues({ ...values, [name]: object ? object.id : object });
  };

  const handleDateChange = name => date => {
    setValues({
      ...values,
      [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
    });
  };

  const handleImageChange = async event => {
    const { files } = event.target;
    const attachments = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = EzoneUtils.formatFileName(files[i].name);
      await EzoneUtils.toBase64(files[i]).then(file => {
        attachments.push(Object.assign({}, { fileName, file }));
        setValues({ ...values, attachments });
      });
    }
  };

  const handleSubmit = () => {
    createBankTransfer(values);
  };

  const canSubmitForm = () => {
    const { amount, bankId, currentBankId, referenceNumber, transferType } = values;
    return (amount && bankId && transferType && currentBankId && referenceNumber.length > 0);
  };

  console.log('values before submit ', values);
  console.log('dialog ', dialog);
  console.log('accountTypes ', accountTypes);
  console.log('bankAccounts ', bankAccounts);
  console.log('currencies ', currencies);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeAccountTransferToDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {dialog.type === 'to' ? 'Transfer to Another Account' : 'Transfer from Another Account'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Autocomplete
                id="transfer-account-name"
                size="small"
                options={bankAccounts}
                getOptionLabel={option => option.accountName}
                onChange={handleSelectChange('bankId')}
                value={values.bankId ? _.find(bankAccounts, { id: values.bankId }) : null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select bank account"
                    variant="outlined"
                    placeholder="Account"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="transfer-type"
                size="small"
                disabled
                options={transferTypes}
                getOptionLabel={option => option.label}
                onChange={handleSelectChange('transferType')}
                value={values.transferType ? _.find(transferTypes, { id: values.transferType }) : null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select transfer type"
                    variant="outlined"
                    placeholder="Transfer type"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="exchange-rate"
                size="small"
                name="rate"
                label="Exchange Rate"
                placeholder="Exchange Rate"
                value={values.rate}
                onChange={handleChange}
                variant="outlined"
                margin="dense"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {values.currencyId ? `1 ${_.find(currencies, { id: values.currencyId }).name} =` : ""}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">NGN</InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  margin="dense"
                  inputVariant="outlined"
                  size="small"
                  id="transfer-date-dialog"
                  label="Transfer date"
                  format="dd/MM/yyyy"
                  value={values.transferDate}
                  onChange={handleDateChange('transferDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="standard-amount"
                label="Amount"
                name="amount"
                variant="outlined"
                size="small"
                value={values.amount}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-reference-number"
                label="Reference number"
                name="referenceNumber"
                onBlur={() => { }}
                error={
                  !/^[a-z0-9]+$/i.test(values.referenceNumber) &&
                  values.referenceNumber.length > 0
                }
                helperText={
                  !/^[a-z0-9]+$/i.test(values.referenceNumber) &&
                    values.referenceNumber.length > 0
                    ? 'Reference number must be alphanumeric'
                    : ''
                }
                variant="outlined"
                size="small"
                value={values.referenceNumber}
                onChange={handleChange}
                margin="dense"
                fullWidth
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
            <Grid item xs={12}>
              <FormControl margin="normal">
                <Button
                  variant="outlined"
                  color="primary"
                  component="label"
                  startIcon={<AttachFileIcon />}
                  className={classes.label}
                >
                  Attach image
                  <input
                    name="attachments"
                    accept="image/*"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>

                <FormHelperText>
                  {values.attachments &&
                    `${values.attachments.length} files selected`}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading || !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
          </Button>
          <Button
            onClick={closeAccountTransferToDialog}
            color="inherit"
            variant="contained"
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

TransactionTransferDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountSetupData: PayrollSelectors.makeSelectGetPayrollSetupData(),
  bankAccounts: Selectors.makeSelectBankAccountData(),
  dialog: Selectors.makeSelectTransactionTransferDialog(),
  accountTypes: Selectors.makeSelectAccountTypes(),
  currencies: Selectors.makeSelectCurrencies(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAccountTransferToDialog: () => dispatch(Actions.closeAccountTransferToDialog()),
    createBankTransfer: data => dispatch(Actions.createBankTransfer(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TransactionTransferDialog);
