import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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
  code: "",
  description: "",
  name: "",
  symbol: ""
}

const CurrencyDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    closeNewCurrencyDialog,
    createCurrency,
  } = props;

  useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...initialState })
    } else {
      setForm({ ...initialState })
    }
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createCurrency(form) : ""
  };

  const canSubmitForm = () => {
    const { code, name, description, symbol } = form
    return code.length > 0 && name.length > 0 && description.length > 0 && symbol.length > 0
  }

  console.log(loading, "loading")
  console.log(form, "form")
  console.log(dialog, "form dialog")

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewCurrencyDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-depreciation-title">
          {dialog.type === 'new' ? 'Create Currency' : 'Edit Currency'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="currency-code"
            name="code"
            label="Code"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="currency-name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="currency-symbol"
            name="symbol"
            label="Symbol"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="currency-description"
            name="description"
            label="Description"
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
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button
            variant="contained"
            onClick={closeNewCurrencyDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CurrencyDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectCurrencyDialog(),
});


function mapDispatchToProps(dispatch) {
  return {
    closeNewCurrencyDialog: () => dispatch(Actions.closeNewCurrencyDialog()),
    createCurrency: data => dispatch(Actions.createCurrency(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CurrencyDialog);