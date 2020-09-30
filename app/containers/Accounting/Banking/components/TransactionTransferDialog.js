import React, { memo, useEffect, useState } from 'react';
import EzoneUtils from '../../../../utils/EzoneUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  CircularProgress,
  TextField,
  makeStyles,
  Button,
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
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const transferTypes = [
  { label: 'Transfer In', id: 'TRANSFERIN' },
  { label: 'Transfer Out', id: 'TRANSFEROUT' },
]

const TransactionTransferDialog = props => {
  const classes = useStyles();

  const {
    loading,
    bankAccounts,
    currencies,
    accountTypes,
    dialog,
    closeAccountTransferDialog,
    createBankTransfer
  } = props;

  const [values, setValues] = useState({
    amount: "",
    attachments: [],
    bankId: "",
    currentBankId: "",
    currencyId: 0,
    rate: 0,
    description: "",
    referenceNumber: "",
    transferDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
    transferType: "TRANSFERIN" // TRANSFEROUT
  });

  useEffect(() => {
    if (dialog.type === 'new' && dialog.data) {
      setValues({ ...values, currentBankId: dialog.data.id })
    }
  }, [dialog.data])

  const handleChange = event => {
    event.target.name === 'amount'
      ? setValues({ ...values, [event.target.name]: event.target.value.replace(/[^0-9]/g, '') })
      : setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSelectChange = name => (event, object) => {
    setValues({ ...values, [name]: object ? object.id : object });
  };

  const handleDateChange = name => date => {
    setValues({ ...values, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleImageChange = async (event) => {
    const { files } = event.target
    let attachments = []
    for (let i = 0; i < files.length; i++) {
      const fileName = EzoneUtils.formatFileName(files[i].name)
      await EzoneUtils.toBase64(files[i])
        .then(file => {
          attachments.push(Object.assign({}, { fileName, file }))
          setValues({ ...values, attachments })
        })
    }
  }

  const handleSubmit = () => {
    createBankTransfer(values);
  }

  const canSubmitForm = () => {
    const { amount, attachments, bankId, currentBankId, referenceNumber, transferType, description } = values
    return amount && attachments.length > 0 && bankId && currentBankId && referenceNumber.length > 0 && description.length > 0
  }

  console.log("values before submit ", values);
  console.log("dialog ", dialog);
  console.log("accountTypes ", accountTypes);
  console.log("bankAccounts ", bankAccounts);
  console.log("currencies ", currencies);

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeAccountTransferDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Bank Transfer
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
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Bank Account"
                    variant="outlined"
                    placeholder="Account"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="transfer-type"
                size="small"
                options={transferTypes}
                getOptionLabel={option => option.label}
                onChange={handleSelectChange('transferType')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Transfer Type"
                    variant="outlined"
                    placeholder="Transfer Type"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="transfer-currency"
                size="small"
                options={currencies}
                getOptionLabel={option => option.name}
                onChange={handleSelectChange('currencyId')}
                value={values.currencyId ? _.find(currencies, { id: values.currencyId }) : null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Currency"
                    variant="outlined"
                    placeholder="Currencies"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  margin="normal"
                  inputVariant="outlined"
                  size="small"
                  id="transfer-date-dialog"
                  label="Transfer Date"
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
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-reference-number"
                label="Reference Number"
                name="referenceNumber"
                onBlur={() => { }}
                error={!/^[a-z0-9]+$/i.test(values.referenceNumber) && values.referenceNumber.length > 0}
                helperText={!/^[a-z0-9]+$/i.test(values.referenceNumber) && values.referenceNumber.length > 0 ? "Reference number must be alphanumeric" : ""}
                variant="outlined"
                size="small"
                value={values.referenceNumber}
                onChange={handleChange}
                margin="normal"
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
                margin="normal"
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
                  Attach a file
                  <input
                    name="attachments"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>

                <FormHelperText>{values.attachments && `${values.attachments.length} files selected`}</FormHelperText>
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
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
          </Button>
          <Button
            onClick={closeAccountTransferDialog}
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
  bankAccounts: Selectors.makeSelectBankAccountData(),
  dialog: Selectors.makeSelectTransactionTransferDialog(),
  accountTypes: Selectors.makeSelectAccountTypes(),
  currencies: Selectors.makeSelectCurrencies(),
});


function mapDispatchToProps(dispatch) {
  return {
    closeAccountTransferDialog: () => dispatch(Actions.closeAccountTransferDialog()),
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