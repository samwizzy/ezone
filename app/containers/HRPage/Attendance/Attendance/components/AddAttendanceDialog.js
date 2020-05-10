import React, {memo} from 'react';
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
    '& .MuiTextField-root': {
      // margin: theme.spacing(1, 0)
    },
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

function AddAttendanceDialog(props) {
  const classes = useStyles();
  const { closeNewAttendanceDialog, dialog } = props;
  const [form, setForm] = React.useState({
    employee: '',
    date: new Date,
    status: '',
    loginTime: new Date,
    logoutTime: new Date,
    comment: '',
  });

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const {employee, date, status, loginTime, logoutTime, comment } = form
    return employee.length > 0 && date.length > 0 && status.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSelectChange = () => {}

  const handleDateChange = () => {}

  const handleSubmit = () => {}

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
                <TableCell>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={[]}
                    getOptionLabel={option => option.label}
                    onChange={(evt, value) => handleSelectChange(evt, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
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
                      value={form.date}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
              </TableRow>
              <TableRow>
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
                    <MenuItem key={0} value="">
                        No record
                    </MenuItem>
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
                      label="Login Time"
                      size="small"
                      value={form.loginTime}
                      onChange={handleDateChange}
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
                      label="Logout Time"
                      size="small"
                      value={form.logoutTime}
                      onChange={handleDateChange}
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
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAttendanceDialog: () => dispatch(Actions.closeNewAttendanceDialog()),
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
)(AddAttendanceDialog);