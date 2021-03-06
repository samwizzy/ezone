import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import ColorPicker from 'material-ui-color-picker';
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import PaperDropzone from './PaperDropzone';

const ColorDialog = props => {
  const { colorDialog, closeEditColorDialog, updateCompanyInfoAction } = props;

  const [values, setValues] = useState({ ...colorDialog.data });

  const handleChange = name => color => {
    console.log(color, 'event fr color');
    setValues({ ...colorDialog.data, [name]: color });
  };

  const uploadFileAction = file => {
    setValues({
      ...colorDialog.data,
      logo: file,
    });
  };

  const closeComposeDialog = () => {
    colorDialog.type === 'new' ? '' : closeEditColorDialog();
  };

  console.log(values, 'update values');

  return (
    <div>
      {colorDialog && (
        <Dialog
          {...colorDialog.props}
          onClose={closeComposeDialog}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="sm"
        >
          <AppBar position="static" elevation={1}>
            <Toolbar>
              <Typography variant="h6">
                {colorDialog.type === 'new' ? '' : 'Edit logo & color'}
              </Typography>
            </Toolbar>
          </AppBar>

          <DialogContent dividers>
            {colorDialog.type === 'new' ? (
              <div />
            ) : (
              <React.Fragment>
                <ColorPicker
                  name="color"
                  defaultValue="#000000"
                  value={values.color || ''}
                  variant="outlined"
                  onChange={handleChange('color')}
                  label="Choose Company Color"
                  margin="dense"
                  fullWidth
                  helperText={`Color selected: ${values.color || ''}`}
                />
                <PaperDropzone uploadFileAction={uploadFileAction} />
              </React.Fragment>
            )}
          </DialogContent>

          <DialogActions>
            {colorDialog.type === 'new' ? (
              <div />
            ) : (
              <Button
                onClick={() => {
                  updateCompanyInfoAction(values);
                  closeComposeDialog();
                }}
                color="primary"
                variant="contained"
              >
                Upload
              </Button>
            )}
            <Button
              onClick={() => closeComposeDialog()}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

ColorDialog.propTypes = {
  closeEditColorDialog: PropTypes.func,
  colorDialog: PropTypes.object,
  updateCompanyInfoAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  colorDialog: Selectors.makeSelectEditColorDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
    closeEditColorDialog: () => dispatch(Actions.closeEditColorDialog()),
    updateCompanyInfoAction: evt => dispatch(Actions.updateCompanyInfo(evt)),
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
)(ColorDialog);
