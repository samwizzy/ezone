import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  name: '',
  value: '',
  inputType: null,
};

const types = [
  { label: 'Fixed amount', value: 'Fixed amount' },
  { label: 'Amount', value: 'Amount' },
  { label: 'Percentage', value: 'Percentage' },
]

const AllowanceDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const { loading, dialog, closeNewAllowanceDialog, createAllowance } = props;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data]);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj ? obj : obj })
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createAllowance(form) : '';
  };

  const canSubmitForm = () => {
    const { name, value, inputType } = form;
    return (
      name.length > 0 &&
      inputType &&
      value.length > 0
    );
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewAllowanceDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Create Allowance' : 'Edit Allowance'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="allowance-name"
            name="name"
            label="Name"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <Autocomplete
            id="allowance-input-type"
            size="small"
            options={types}
            getOptionLabel={option => option.label}
            onChange={handleSelectChange('inputType')}
            value={form.inputType}
            renderInput={params => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: false,
                }}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />

          <TextField
            id="allowance-value"
            name="value"
            label="Value"
            variant="outlined"
            value={form.value}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disableElevation
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button
            variant="contained"
            onClick={closeNewAllowanceDialog}
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AllowanceDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAllowanceDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAllowanceDialog: () => dispatch(Actions.closeNewAllowanceDialog()),
    createAllowance: data => dispatch(Actions.createAllowance(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AllowanceDialog);
