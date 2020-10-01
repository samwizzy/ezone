import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
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
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  description: '',
  name: '',
  rate: '',
  taxType: '',
};

const TaxDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const { loading, dialog, closeNewTaxDialog, createTax } = props;

  useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...initialState });
    } else {
      setForm({ ...initialState });
    }
  }, []);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    name === 'rate'
      ? setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value.replace(/[^0-9]/g, ''),
      })
      : setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createTax(form) : '';
  };

  const canSubmitForm = () => {
    const { name, rate, taxType, description } = form;
    return (
      name.length > 0 &&
      rate.length > 0 &&
      taxType.length > 0 &&
      description.length > 0
    );
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewTaxDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Create Tax' : 'Edit Tax'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="tax-name"
            name="name"
            label="Name"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="tax-rate"
            name="rate"
            label="Rate"
            variant="outlined"
            value={form.rate}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="tax-tax-type"
            name="taxType"
            label="Tax Type"
            variant="outlined"
            value={form.taxType}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            name="description"
            label="Description"
            id="tax-description"
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

          <Button variant="contained" onClick={closeNewTaxDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

TaxDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectTaxDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewTaxDialog: () => dispatch(Actions.closeNewTaxDialog()),
    createTax: data => dispatch(Actions.createTax(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TaxDialog);
