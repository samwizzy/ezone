import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule'
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const status = [
  { id: 1, value: "PRESENT", label: "Present" },
  { id: 2, value: "ABSENT", label: "Absent" },
  { id: 3, value: "WEEKEND", label: "Weekend" },
  { id: 4, value: "HOLIDAY", label: "Holiday" },
  { id: 5, value: "SICK LEAVE", label: "Sick Leave" },
  { id: 6, value: "PAID LEAVE", label: "Paid Leave" },
  { id: 7, value: "UNPAID LEAVE", label: "Unpaid Leave" },
]

function AddAttendanceDialog(props) {
  const classes = useStyles();
  const { loading, createAttendance, employees, closeNewAttendanceDialog, dialog } = props;
  const [form, setForm] = useState({
    userId: '',
    date: moment.utc(new Date).format(),
    status: 'PRESENT',
    loginTime: moment.utc(new Date).format(),
    logOutTime: moment.utc(new Date).format(),
  });

  React.useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { userId, date, status, loginTime, logOutTime } = form
    return userId && loginTime && logOutTime && date && status.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj.id });
  }

  const handleDateChange = name => (date, value) => {
    setForm({ ...form, [name]: moment.utc(date).format() });
  }

  const handleSubmit = () => {
    createAttendance(form)
  }

  console.log(form, "form")
  console.log(employees, "employees")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewAttendanceDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add attendance
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Autocomplete
                id="attendance-shifted-employee"
                name="userId"
                size="small"
                options={_.filter(employees, { workShift: new Object })}
                getOptionLabel={option => option.firstName + ' ' + option.lastName}
                onChange={handleSelectChange('userId')}
                renderInput={params => (
                  <TextField
                    {...params}
                    name="userId"
                    label="Employee"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  label="Date"
                  size="small"
                  format="dd/MM/yyyy"
                  name="date"
                  value={form.date}
                  onChange={handleDateChange('date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={6}>
              <TextField
                id="status"
                name="status"
                placeholder="Status"
                select
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                label="Status"
                value={form.status}
                onChange={handleChange}
              >
                {status.map((option, i) =>
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                )}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  autoOk
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="login-time-picker"
                  name="loginTime"
                  label="Login Time"
                  size="small"
                  value={form.loginTime}
                  onChange={handleDateChange('loginTime')}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<ScheduleIcon />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  autoOk
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="logout-time-picker"
                  name="logOutTime"
                  label="Logout Time"
                  size="small"
                  value={form.logOutTime}
                  onChange={handleDateChange('logOutTime')}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<ScheduleIcon />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="comment"
                name="comment"
                placeholder="Comment"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={2}
                rowsMax={3}
                size="small"
                label="Comment"
                value={form.comment}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAttendanceDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading ? loading : !canSubmitForm()} color="primary" endIcon={loading && <CircularProgress size={20} />}>
            Mark
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddAttendanceDialog.propTypes = {
  closeNewAttendanceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAttendanceDialog(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    createAttendance: data => dispatch(Actions.createAttendance(data)),
    closeNewAttendanceDialog: () => dispatch(Actions.closeNewAttendanceDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddAttendanceDialog);
