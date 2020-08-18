import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Slide, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

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

function AddFileDialog(props) {
  const classes = useStyles();
  const { closeNewTaskDialog, dialog } = props;
  const [form, setForm] = React.useState({ task: '', description: '', startTime: new Date(), endTime: new Date(), emails: [] });

  const handleChange = () => { }
  const handleDateChange = date => {
    setForm({ form: { ...form, startTime: date } })
  }

  console.log(dialog, 'checking file dialog...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewTaskDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add File</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Task name"
                id="task-name-small"
                fullWidth
                defaultValue="Small"
                variant="outlined"
                margin="normal"
                size="small"
                value={form.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="task-description-static"
                label="Description"
                multiline
                fullWidth
                rows="4"
                rowsMax="4"
                value={form.comment}
                onChange={handleChange}
                defaultValue="Default Value"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-start-time"
                      label="Start time"
                      value={form.startTime}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-end-time"
                      label="End time"
                      value={form.endTime}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Assign task"
                placeholder="Enter email address or usernames"
                id="email-address-username"
                fullWidth
                defaultValue="Small"
                variant="outlined"
                size="small"
                value={form.email}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewTaskDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={closeNewTaskDialog} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddFileDialog.propTypes = {
  openNewTaskDialog: PropTypes.func,
  closeNewTaskDialog: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectNewFileDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
    closeNewTaskDialog: () => dispatch(Actions.closeNewTaskDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddFileDialog);
