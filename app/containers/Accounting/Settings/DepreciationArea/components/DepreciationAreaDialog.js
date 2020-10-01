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
  code: '',
  description: '',
  orgId: '',
  type: '',
};

const DepreciationAreaDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    closeNewDepreciationAreaDialog,
    createDepreciationArea,
  } = props;

  useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...initialState });
    } else {
      setForm({ ...initialState });
    }
  }, []);

  const handleChange = event => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createDepreciationArea(form) : '';
  };

  const canSubmitForm = () => {
    const { code, type, description } = form;
    return code.length > 0 && type.length > 0 && description.length > 0;
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewDepreciationAreaDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-depreciation-title">
          {dialog.type === 'new'
            ? 'Create Depreciation Area'
            : 'Edit Depreciation Area'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="depreciation-area-code"
            name="code"
            label="Code"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="depreciation-area-type"
            name="type"
            label="Type"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            name="description"
            label="Description"
            id="depreciation-area-description"
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

          <Button variant="contained" onClick={closeNewDepreciationAreaDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DepreciationAreaDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectDepreciationAreaDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewDepreciationAreaDialog: () =>
      dispatch(Actions.closeNewDepreciationAreaDialog()),
    createDepreciationArea: data =>
      dispatch(Actions.createDepreciationArea(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DepreciationAreaDialog);
