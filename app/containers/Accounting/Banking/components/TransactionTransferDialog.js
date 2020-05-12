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
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransactionTransferDialog = props => {
  const classes = useStyles();

  const { 
    loading,
    currentUser,
    bankAccountData,
    transactionTransferDialog, 
    closeAccountTransferDialogAction,
    dispatchCreateBankTransferAction
  } = props;

  const [values, setValues] = React.useState({
    amount: "",
    attachments: [ ],
    bankId: "",
    description: "",
    orgId: currentUser.organisation.orgId,
    referenceNumber: "",
    transferDate: new Date(),
    transferType: ""
  });

  console.log('bankAccountData from dialog -> ', bankAccountData);
  
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, bankId: value.id });
  };

  const handleDateChange = date => {
    setValues({
      ...values,
      transferDate: moment(date).format('YYYY-MM-DD'),
      transferType: transactionTransferDialog.data == 1 ? "TRANSFERIN" : "TRANSFEROUT"
    });
    setSelectedDate(date);
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleImageChange = (ev) => { 
    let fileNode = []
    Object.keys(ev.target.files).map(index => {
      const { name } = ev.target.files[index]
      const result = toBase64(ev.target.files[index]);
      result.then(rs => {
        const file = Object.assign({}, { fileName: name, file: rs })
        fileNode.push(file)
      })   
    })
    setValues(_.set({ ...values }, event.target.name, fileNode))
  }

  console.log('transactionTransferDialog values: ', values);


  return (
    <div>
      <Dialog
        {...transactionTransferDialog.props}
        onClose={closeAccountTransferDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          { transactionTransferDialog.data == 1 ? 'Transfer from Another Account' : 'Transfer to Another Account' } 
        </DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Autocomplete
                  id="combo-box-demo"
                  size="small"
                  options={bankAccountData}
                  getOptionLabel={option => option.accountName}
                  onChange={(evt, value) => handleSelectChange(evt, value)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Account"
                      variant="outlined"
                      placeholder="Date"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    inputVariant="outlined"
                    size="small"
                    id="date-picker-dialog"
                    label="Transfer Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
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
                  type="number"
                  variant="outlined"
                  size="small"
                  value={values.amount}
                  onChange={handleChange('amount')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-referenceNumber"
                  label="Reference Number"
                  type="number"
                  variant="outlined"
                  size="small"
                  value={values.referenceNumber}
                  onChange={handleChange('referenceNumber')}
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
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchCreateBankTransferAction(values);
              }}
              color="primary"
              // variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save
            </Button>
          )}
          <Button
            onClick={closeAccountTransferDialogAction}
            color="inherit"
            // variant="contained"
          >
            Cancel
          </Button>
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
        </DialogActions>
      </Dialog>
    </div>
  );
};

TransactionTransferDialog.propTypes = {
  loading: PropTypes.bool,
  transactionTransferDialog: PropTypes.object,
//   accountTypeData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  bankAccountData: Selectors.makeSelectBankAccountData(),
  transactionTransferDialog: Selectors.makeSelectTransactionTransferDialog(),
//   accountTypeData: Selectors.makeSelectAccountTypeData(),
//   accountTypeData: Selectors.makeSelectAccountTypeData(),
//   parentAccountTypeData: Selectors.makeSelectParentAccountTypeData(),
});



function mapDispatchToProps(dispatch) {
  return {
    closeAccountTransferDialogAction: () => dispatch(Actions.closeAccountTransferDialog()),
    dispatchCreateBankTransferAction: evt => dispatch(Actions.createBankTransferAction(evt)),
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
)(TransactionTransferDialog);