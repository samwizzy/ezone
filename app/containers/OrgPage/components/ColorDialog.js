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
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import ColorDropZone from './DropZone';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));

const ColorDialog = props => {
  const {
    colorDialog,
    closeEditColorDialog,
    // dispatchNewPostAction,
    // dispatchUpdatePostAction,
  } = props;
  const classes = useStyles();

  const [values, setValues] = useState({
    color: '',
    logo: '',
  });

  const handleChange = name => event => {
    console.log(name, event, 'name, event');
    setValues({ ...event });
  };

  // console.log(colorDialog, 'colorDialog');

  // useEffect(() => {
  //   setValues({
  //     ...colorDialog.data,
  //   });
  // }, []);
  // }, [colorDialog.data]);

  const closeComposeDialog = () => {
    // eslint-disable-next-line no-unused-expressions
    colorDialog.type === 'new' ? '' : closeEditColorDialog();
  };

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
          <DialogContent>
            {colorDialog.type === 'new' ? (
              <div />
            ) : (
              <div>
                <ColorDropZone handleChange={handleChange} logo={values.logo} />
                <ColorPicker
                  name="color"
                  defaultValue="#000"
                  value={values.color}
                  onChange={evt => handleChange(evt)}
                  label="Choose Company Color"
                  className={classes.textField}
                  margin="normal"
                  fullWidth
                />
              </div>
            )}
          </DialogContent>
          {colorDialog.type === 'new' ? (
            <div />
          ) : (
            <DialogActions>
              <Button
                onClick={() => {
                  dispatchUpdatePostAction(values);
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
                variant="contained"
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
  dispatchNewPostAction: PropTypes.func,
  closeNewPostDialog: PropTypes.func,
  closeEditColorDialog: PropTypes.func,
  colorDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  colorDialog: Selectors.makeSelectEditColorDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatchNewPostAction: evt => dispatch(Actions.saveNewPost(evt)),
    openEditColorDialog: evt => dispatch(Actions.openEditColorDialog(evt)),
    closeEditColorDialog: () => dispatch(Actions.closeEditColorDialog()),
    // dispatchUpdatePostAction: evt => dispatch(Actions.updatePost(evt)),
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
