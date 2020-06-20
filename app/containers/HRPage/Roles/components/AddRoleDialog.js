import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  name: '',
  type: 'ROLE'
}

function AddRoleDialog(props) {
  const classes = useStyles();
  const { closeNewRoleDialog, dialog, createRole } = props;
  const [form, setForm] = React.useState({ ...initialState });

  console.log(dialog, "dialog checking")

  React.useEffect(() => {
    dialog.type == 'edit' ?
      setForm({ ...form }) :
      setForm({ ...initialState })
  }, [dialog])

  const canSubmitForm = () => {
    const { name } = form
    return name.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleReset = () => setForm({ ...initialState })

  const handleSubmit = () => {
    createRole(form)
    handleReset()
  }

  console.log(form, 'checking form role...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewRoleDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add role
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            name="name"
            label="Role name"
            id="outlined-title"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.name}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewRoleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!canSubmitForm()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddRoleDialog.propTypes = {
  closeNewRoleDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectRoleDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewRoleDialog: () => dispatch(Actions.closeNewRoleDialog()),
    createRole: (data) => dispatch(Actions.createRole(data)),
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
)(AddRoleDialog);