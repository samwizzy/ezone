import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import { assetClasses } from '../../enums'

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  assetClass: 'TANGIBLE',
  code: '',
  description: '',
  name: '',
  orgId: '',
};

const AssetTypeDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    closeNewAssetTypeDialog,
    createAssetType,
    updateAssetType,
  } = props;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  const handleSelectChange = name => (event, object) => {
    setForm({ ...form, [name]: object ? object.value : object });
  };

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createAssetType(form) : updateAssetType(form)
  };

  const canSubmitForm = () => {
    const { name, code, assetClass, description } = form;
    return (
      name.length > 0 &&
      code.length > 0 &&
      assetClass.length > 0 &&
      description.length > 0
    );
  };

  console.log(loading, "loading")
  console.log(form, "form")
  console.log(dialog, "edit asset type form dialog")

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewAssetTypeDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Create Asset type' : 'Edit Asset type'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="asset-type-name"
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
            id="asset-type-code"
            name="code"
            label="Code"
            variant="outlined"
            value={form.code}
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <Autocomplete
            id="asset-class"
            options={assetClasses}
            getOptionLabel={option => option.label}
            onChange={handleSelectChange('assetClass')}
            value={
              form.assetClass
                ? _.find(assetClasses, { value: form.assetClass })
                : null
            }
            getOptionSelected={(option, value) => _.some(option, { value })}
            renderInput={params => (
              <TextField
                {...params}
                label="Select Asset Class"
                size="small"
                variant="outlined"
                margin="normal"
                placeholder="Asset Class"
                fullWidth
              />
            )}
          />

          <TextField
            name="description"
            label="Description"
            id="asset-type-description"
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
            disableElevation
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button
            variant="contained"
            onClick={closeNewAssetTypeDialog}
            disableElevation
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AssetTypeDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAssetTypeDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAssetTypeDialog: () => dispatch(Actions.closeNewAssetTypeDialog()),
    createAssetType: data => dispatch(Actions.createAssetType(data)),
    updateAssetType: data => dispatch(Actions.updateAssetType(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssetTypeDialog);
