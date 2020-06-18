import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { AppBar, Button, Checkbox, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormLabel, FormControlLabel, MenuItem, Radio, RadioGroup, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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

const DaysOfTheWeek = [
  { name: 'Sunday' },
  { name: 'Monday' },
  { name: 'Tuesday' },
  { name: 'Wednesday' },
  { name: 'Thursday' },
  { name: 'Friday' },
  { name: 'Saturday' }
];

function AddShiftDialog(props) {
  const classes = useStyles();
  const { closeNewShiftDialog, dialog, days, createShift } = props;
  const [state, setState] = React.useState({ isOffDays: '', isShiftDays: false });
  const [form, setForm] = React.useState({
    resumptionTime: moment(new Date).format('YYYY-MM-DD hh:mm:ss'),
    closeTime: moment(new Date).format('YYYY-MM-DD hh:mm:ss'),
    startDate: moment(new Date).format('YYYY-MM-DD'),
    endDate: moment(new Date).format('YYYY-MM-DD'),
    offDays: [],
    shiftName: '',
    createdBy: 'Admin',

  });

  console.log(form, "shift dialogue");
  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { resumptionTime, closeTime, startDate, endDate, shiftName } = form
    return resumptionTime && closeTime && startDate && endDate && shiftName
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = name => date => {
    setForm(_.set({ ...form }, name, moment(date).format('YYYY-MM-DDTHH:mm:ss')))
  }
  const handleCheckChange = (event) => {
    const { name, value, checked, type } = event.target
    setState(_.set({ ...state }, name, type === 'checkbox' ? checked : value))
  }

  const handleSubmit = () => {
    createShift(form)
  }

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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="shiftName"
                label="Shift name"
                id="outlined-title"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.shiftName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  inputVariant="outlined"
                  id="resumption-time-picker"
                  name="resumptionTime"
                  label="Resumption Time"
                  fullWidth
                  size="small"
                  value={form.resumptionTime}
                  onChange={handleDateChange('resumptionTime')}
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
                  margin="normal"
                  inputVariant="outlined"
                  id="close-time-picker"
                  name="closeTime"
                  label="Close Time"
                  fullWidth
                  size="small"
                  value={form.closeTime}
                  onChange={handleDateChange('closeTime')}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<ScheduleIcon />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="isOffDays" name="isOffDays" value={state.isOffDays} onChange={handleCheckChange} row>
                  <FormControlLabel value="weekends" control={<Radio />} label="Weekends" />
                  <FormControlLabel value="offdays" control={<Radio />} label="Shift Off Days" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {state.isOffDays === 'offdays' &&
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="checkboxes-days-of-week"
                  size="small"
                  options={DaysOfTheWeek}
                  defaultValue={[DaysOfTheWeek[0]]}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(option, { selected }) => (
                    <React.Fragment>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth label="Select Off Days" placeholder="Days" />
                  )}
                />
              </Grid>
            }

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.isShiftDays} onChange={handleCheckChange} name="isShiftDays" />}
                label="Enter Shift Days"
              />
            </Grid>

            {state.isShiftDays &&
              <React.Fragment>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      disablePast
                      inputVariant="outlined"
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      fullWidth
                      size="small"
                      name="startDate"
                      id="date-picker-startDate"
                      label="Start Date"
                      value={form.startDate}
                      onChange={handleDateChange('startDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      disablePast
                      inputVariant="outlined"
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      fullWidth
                      size="small"
                      name="endDate"
                      id="date-picker-endtDate"
                      label="End Date"
                      value={form.endDate}
                      onChange={handleDateChange('endDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </React.Fragment>
            }

          </Grid>
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
  days: Selectors.makeSelectDays(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewShiftDialog: () => dispatch(Actions.closeNewShiftDialog()),
    createShift: (data) => dispatch(Actions.createShift(data)),
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