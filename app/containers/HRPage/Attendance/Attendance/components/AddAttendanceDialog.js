import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule'
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {},
  },
  table: {
    "& td": {
      border: "0 !important"
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const status = [
  { id: 1, label: "PRESENT" },
  { id: 2, label: "ABSENT" },
]

function AddAttendanceDialog(props) {
  const classes = useStyles();
  const { createAttendance, employees, closeNewAttendanceDialog, dialog } = props;
  const [form, setForm] = React.useState({
    userId: '',
    date: moment.utc(new Date).format(),
    status: 'PRESENT',
    loginTime: moment.utc(new Date).format(),
    logOutTime: moment.utc(new Date).format(),
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
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
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <Autocomplete
                    id="combo-box-demo"
                    name="userId"
                    size="small"
                    options={employees ? employees : []}
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
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="Date"
                      size="small"
                      format="MM/dd/yyyy"
                      name="date"
                      value={form.date}
                      onChange={handleDateChange('date')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>

                <TableCell>
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
                      <MenuItem key={i} value={option.label}>
                        {option.label}
                      </MenuItem>
                    )}
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="time-picker"
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
                </TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="time-picker"
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
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <TextField
                    id="comment"
                    name="comment"
                    placeholder="Comment"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={3}
                    size="small"
                    label="Comment"
                    value={form.comment}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewAttendanceDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
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