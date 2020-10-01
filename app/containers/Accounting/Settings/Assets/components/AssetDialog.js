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
  aquisitionDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  aquisitionValue: 0,
  assetCondition: '',
  assetId: '',
  assetName: '',
  assetNumber: '',
  assetStatus: 'GOOD',
  assetTypeId: 0,
  barcode: '',
  description: '',
  id: 0,
  image: {
    file: '',
    fileName: '',
    fileUrl: '',
  },
  length: 0,
  location: '',
  manufacturer: '',
  measurement: 'CM',
  orgId: '',
  quantity: 0,
  taxAccountId: 0,
  taxAmount: 0,
  weigth: 0,
  width: 0,
};

const AssetDialog = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const { loading, dialog, closeNewAssetDialog, createAsset } = props;

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
    dialog.type === 'new' ? createAsset(form) : '';
  };

  const canSubmitForm = () => {
    const {
      assetId,
      assetName,
      assetNumber,
      assetStatus,
      barcode,
      description,
    } = form;
    return (
      assetName.length > 0 && assetNumber.length > 0 && description.length > 0
    );
  };

  console.log(loading, 'loading');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewAssetDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Create Asset' : 'Edit Asset'}
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            id="asset-type-code"
            name="code"
            label="Code"
            variant="outlined"
            onChange={handleChange}
            margin="normal"
            size="small"
            fullWidth
          />

          <TextField
            id="asset-type-type"
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
            disabled={loading || !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button variant="contained" onClick={closeNewAssetDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AssetDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAssetDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAssetDialog: () => dispatch(Actions.closeNewAssetDialog()),
    createAsset: data => dispatch(Actions.createAsset(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssetDialog);
