/**
 *
 * AllPosts
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import ColorPicker from 'material-ui-color-picker';
import {
  TextField,
  makeStyles,
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ColorDialog = props => {
  const { colorDialog, closeEditColorDialog, updateCompanyInfoAction } = props;
  const classes = useStyles();

  const [values, setValues] = useState({ ...colorDialog.data });

  const handleChange = name => color => {
    console.log(color, "event fr color")
    setValues({ ...colorDialog.data, [name]: color });
  };

  const uploadFileAction = file => {
    setValues({
      ...colorDialog.data,
      logo: file,
    });
  };

  const closeComposeDialog = () => {
    // eslint-disable-next-line no-unused-expressions
    colorDialog.type === 'new' ? '' : closeEditColorDialog();
  };

  console.log(values, "update values")

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
                {colorDialog.type === 'new' ? '' : 'Edit Logo And Color'}
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
                    margin="normal"
                    fullWidth
                    helperText={`Color selected: ${values.color}`}
                  />
                  <PaperDropzone uploadFileAction={uploadFileAction} />
                </React.Fragment>
              )}
          </DialogContent>
          {colorDialog.type === 'new' ? (
            <div />
          ) : (
              <DialogActions>
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
                <Button
                  onClick={() => closeComposeDialog()}
                  color="primary"
                  variant="outlined"
                >
                  Cancel
              </Button>
              </DialogActions>
            )}
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
