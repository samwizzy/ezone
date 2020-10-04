import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
  makeStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Slide,
} from '@material-ui/core';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  disposalDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  reason: '',
  amount: '',
};

const AssetDisposalDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const { loading, dialog, closeAssetDisposalDialog, disposeAsset } = props;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data]);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? '' : '';
  };

  const canSubmitForm = () => {
    const { disposalDate, amount, reason } = form;
    return (
      disposalDate && amount && (reason && reason.length > 0)
    );
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeAssetDisposalDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Disposal' : ''}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="asset-disposal-amount"
            name="amount"
            label="Disposal Amount"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="disposal-date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              fullWidth
              margin="normal"
              size="small"
              label="Disposal Date"
              required
              value={form.disposalDate}
              onChange={handleDateChange('disposalDate')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <TextField
            name="reason"
            label="Reason for disposal"
            id="asset-disposal-reason"
            fullWidth
            margin="normal"
            size="small"
            variant="outlined"
            multiline
            rows={3}
            rowsMax={4}
            value={form.reason}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disableElevation
            disabled={loading || !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button variant="contained" onClick={closeAssetDisposalDialog} disableElevation>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AssetDisposalDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAssetDisposalDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAssetDisposalDialog: () => dispatch(Actions.closeAssetDisposalDialog()),
    disposeAsset: data => dispatch(Actions.disposeAsset(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssetDisposalDialog);
