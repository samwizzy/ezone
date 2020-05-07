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
import ScheduleIcon from '@material-ui/icons/Schedule';
import { AppBar, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormLabel, FormControlLabel, MenuItem, Radio, RadioGroup, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function AddShiftDialog(props) {
  const classes = useStyles();
  const { closeNewShiftDialog, dialog } = props;
  const [option, setOption] = React.useState({shiftDays: false})
  const [form, setForm] = React.useState({
    employee: '',
    date: new Date,
    startTime: new Date,
    endTime: new Date,
    startDate: new Date,
    endDate: new Date,
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
        onClose={closeNewShiftDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Shift
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
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="time-picker"
                      label="Start Time"
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
                      label="End Time"
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
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Shift Period</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                      <FormControlLabel value="weekends" control={<Radio color="primary" />} label="Weekends" />
                      <FormControlLabel value="off-days" control={<Radio color="primary" />} label="Shift off days" />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={days}
                    size="small"
                    disableCloseOnSelect
                    getOptionLabel={(option) => option}
                    defaultValue={[days[0]]}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Off Days" placeholder="Off Days" margin="none" />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={option.shiftDays}
                        onChange={handleChange}
                        name="shiftDays"
                        color="primary"
                      />
                    }
                    label="Enter Shift Days"
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
                      label="Start Date"
                      size="small"
                      format="MM/dd/yyyy"
                      value={form.startDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="End Date"
                      size="small"
                      format="MM/dd/yyyy"
                      value={form.endDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewShiftDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddShiftDialog.propTypes = {
  closeNewShiftDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectShiftDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewShiftDialog: () => dispatch(Actions.closeNewShiftDialog()),
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
)(AddShiftDialog);