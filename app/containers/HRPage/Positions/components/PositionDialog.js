import React, { useEffect, useState, memo } from 'react';
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
  description: '',
  party_id: ''
}

function PositionDialog(props) {
  const classes = useStyles();
  const { closeNewPositionDialog, dialog, createPosition } = props;
  const [form, setForm] = useState({ ...initialState });

  console.log(dialog, "dialog checking")

  useEffect(() => {
    dialog.type === 'edit' && dialog.data ?
      setForm({ ...dialog.data }) :
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
    createPosition(form)
    handleReset()
  }

  console.log(form, 'checking form role...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewPositionDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add position
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            name="name"
            label="Name"
            id="outlined-title"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            name="description"
            label="Description"
            id="outlined-description"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            value={form.description}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewPositionDialog} color="primary">
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


PositionDialog.propTypes = {
  closeNewPositionDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectPositionDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewPositionDialog: () => dispatch(Actions.closeNewPositionDialog()),
    createPosition: (data) => dispatch(Actions.createPosition(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PositionDialog);
