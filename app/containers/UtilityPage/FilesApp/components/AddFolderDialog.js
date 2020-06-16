import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Slide, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddFolderDialog(props) {
  const classes = useStyles();
  const { closeNewFolderDialog, addFolderToFolder, dialog, match } = props;
  const { params } = match
  const [form, setForm] = React.useState({ folderId: 1, folderName: '', description: '' });

  React.useEffect(() => {
    if (params.folderId) { setForm({ ...form, folderId: params.folderId }) }
  }, [])

  const handleChange = event => {
    setForm(_.set({ ...form }, event.target.name, event.target.value))
  }
  const handleSubmit = () => {
    addFolderToFolder(form)
  }

  const canSubmitForm = () => {
    const { folderName, description } = form
    return folderName.length > 0 && description.length > 0
  }

  console.log(dialog, 'checking dialog...')
  console.log(form, 'checking form...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewFolderDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add Folder</DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.root}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  name="folderName"
                  label="Folder name"
                  id="outlined-size-small"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.folderName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-description"
                  name="description"
                  label="Description"
                  multiline
                  fullWidth
                  rows="4"
                  rowsMax="4"
                  value={form.description}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewFolderDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddFolderDialog.propTypes = {
  openNewTaskDialog: PropTypes.func,
  closeNewTaskDialog: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectNewFolderDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewFolderDialog: data => dispatch(Actions.openNewFolderDialog(data)),
    closeNewFolderDialog: () => dispatch(Actions.closeNewFolderDialog()),
    addFolderToFolder: (data) => dispatch(Actions.addFolderToFolder(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AddFolderDialog);