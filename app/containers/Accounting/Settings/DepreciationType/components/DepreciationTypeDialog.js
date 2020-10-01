import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  InputAdornment,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Slide,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const methods = [{ label: 'Straight Line', value: 'STRAIGHT_LINE' }];
const calculationBases = [
  { label: 'Monthly', value: 'MONTHLY' },
  { label: 'Quarterly', value: 'QUARTERLY' },
  { label: 'Yearly', value: 'YEARLY' },
];

const initialState = {
  calculationBase: 'MONTHLY',
  code: '',
  depreciatedValue: 0,
  depreciationRate: 0,
  description: '',
  method: 'STRAIGHT_LINE',
  percentageValue: 0,
  validFrom: moment().format('YYYY-MM-DDTHH:mm:ss'),
  validTo: moment().format('YYYY-MM-DDTHH:mm:ss'),
};

const DepreciationTypeDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    closeNewDepreciationTypeDialog,
    createDepreciationType,
  } = props;

  useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...initialState });
    } else {
      setForm({ ...initialState });
    }
  }, []);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    if (
      name === 'depreciatedValue' ||
      name === 'depreciationRate' ||
      name === 'percentageValue'
    ) {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value.replace(/[^0-9]/g, ''),
      });
    } else {
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSelectChange = name => (event, object) => {
    setForm({ ...form, [name]: object ? object.value : object });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createDepreciationType(form) : '';
  };

  const canSubmitForm = () => {
    const {
      code,
      calculationBase,
      method,
      percentageValue,
      depreciatedValue,
      depreciationRate,
      description,
    } = form;
    return (
      code.length > 0 && calculationBase.length > 0 && description.length > 0
    );
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewDepreciationTypeDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-depreciation-title">
          {dialog.type === 'new'
            ? 'Create Depreciation Type'
            : 'Edit Depreciation Type'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="depreciation-type-code"
            name="code"
            label="Code"
            variant="outlined"
            onChange={handleChange}
            value={form.code}
            margin="normal"
            fullWidth
          />

          <TextField
            id="depreciated-value"
            name="depreciatedValue"
            label="Depreciated Value"
            variant="outlined"
            onChange={handleChange}
            value={form.depreciatedValue}
            margin="normal"
            fullWidth
          />

          <TextField
            id="depreciated-rate"
            name="depreciationRate"
            label="Depreciation Rate"
            variant="outlined"
            onChange={handleChange}
            value={form.depreciationRate}
            margin="normal"
            fullWidth
          />

          <TextField
            id="percentage-value"
            name="percentageValue"
            label="Percentage Value"
            variant="outlined"
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            onChange={handleChange}
            value={form.percentageValue}
            margin="normal"
            fullWidth
          />

          <Autocomplete
            id="calculation-base"
            options={calculationBases}
            getOptionLabel={option => option.label}
            onChange={handleSelectChange('calculationBase')}
            value={
              form.calculationBase
                ? _.find(calculationBases, { value: form.calculationBase })
                : null
            }
            getOptionSelected={(option, value) => _.some(option, { value })}
            renderInput={params => (
              <TextField
                {...params}
                label="Select Calculation Base"
                variant="outlined"
                margin="normal"
                placeholder="Calculation Base"
                fullWidth
              />
            )}
          />

          <Autocomplete
            id="method"
            options={methods}
            getOptionLabel={option => option.label}
            onChange={handleSelectChange('method')}
            value={form.method ? _.find(methods, { value: form.method }) : null}
            getOptionSelected={(option, value) => _.some(option, { value })}
            renderInput={params => (
              <TextField
                {...params}
                label="Select method"
                variant="outlined"
                margin="normal"
                placeholder="Method"
                fullWidth
              />
            )}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="valid-from-date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              fullWidth
              margin="normal"
              label="Valid From"
              value={form.validFrom}
              onChange={handleDateChange('validFrom')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              id="valid-to-date"
              inputVariant="outlined"
              format="dd/MM/yyyy"
              fullWidth
              margin="normal"
              label="valid To"
              value={form.validTo}
              onChange={handleDateChange('validTo')}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <TextField
            name="description"
            label="Description"
            id="depreciation-type-description"
            fullWidth
            margin="normal"
            size="small"
            variant="outlined"
            multiline
            rows={3}
            rowsMax={4}
            value={form.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disabled={loading || !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button variant="contained" onClick={closeNewDepreciationTypeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DepreciationTypeDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectDepreciationTypeDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewDepreciationTypeDialog: () =>
      dispatch(Actions.closeNewDepreciationTypeDialog()),
    createDepreciationType: data =>
      dispatch(Actions.createDepreciationType(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DepreciationTypeDialog);
