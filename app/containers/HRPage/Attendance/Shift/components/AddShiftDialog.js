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
  const { closeNewAttendanceDialog, dialog, days, createShift } = props;
  const [form, setForm] = React.useState({
    resumptionTime: '',
    closeTime: '',
    startDate: '',
    endDate: '',
    offDays: [],
    shiftName: '',
    createdBy: 'Admin',

  });

  console.log(days, "shift dialogue");
  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { resumptionTime,closeTime,startDate,endDate,shiftName } = form
    return resumptionTime && closeTime && startDate && endDate && shiftName
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const reformattedDate = (date) => {
    var month = date.getMonth() + 1; //months from 1-12
    var day = date.getDate();
    var year = date.getFullYear();
    
    var day = day.length > 0? day : day.toString().padStart(2, '0')
    var month = month.length > 0? month : month.toString().padStart(2, '0')
    
    const newdate = year + "-" + month + "-" + day;
    return newdate;
  }
  const handleDateChange = (date, formatted, name) => { 
    setForm(_.set({...form}, name, reformattedDate(date)))
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
        
        <Divider />

        <DialogContent>
          <Grid container spacing={1}>
              <Grid item xs={12}>
                  <TextField
                  name="shiftName"
                  label="Shift name"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.shiftName}
                  onChange={handleChange}
                  />
              </Grid>
              <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          fullWidth
                          name="startDate"
                          id="date-picker-startDate"
                          label="Start Date"
                          value={form.startDate}
                          onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                          KeyboardButtonProps={{
                          'aria-label': 'change date',
                          }}
                      />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          fullWidth
                          name="endDate"
                          id="date-picker-endtDate"
                          label="End Date"
                          value={form.endDate}
                          onChange={(date, formatted) => handleDateChange(date, formatted, 'endDate')}
                          KeyboardButtonProps={{
                          'aria-label': 'change date',
                          }}
                      />
                  </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="resumptionTime"
                  name="resumptionTime"
                  placeholder="Resumption Time"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="Resumption Time"
                  value={form.resumptionTime}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="2020-05-09T08:00:00.000Z">
                    08:00:00
                  </MenuItem>
                  <MenuItem key={1} value="2020-05-09T09:00:00.000Z">
                    09:00:00
                  </MenuItem>
                  <MenuItem key={2} value="2020-05-09T10:00:00.000Z">
                    10:00:00
                  </MenuItem>
                  <MenuItem key={3} value="2020-05-09T11:00:00.000Z">
                    11:00:00
                  </MenuItem>
                  <MenuItem key={4} value="2020-05-09T12:00:00.000Z">
                    12:00:00
                  </MenuItem>
                  <MenuItem key={5} value="2020-05-09T01:00:00.000Z">
                    01:00:00
                  </MenuItem>
                  <MenuItem key={6} value="2020-05-09T02:00:00.000Z">
                    02:00:00
                  </MenuItem>
                  <MenuItem key={7} value="2020-05-09T03:00:00.000Z">
                    03:00:00
                  </MenuItem>
                  <MenuItem key={8} value="2020-05-09T04:00:00.000Z">
                    04:00:00
                  </MenuItem>
                  <MenuItem key={9} value="2020-05-09T05:00:00.000Z">
                    05:00:00
                  </MenuItem>
                  <MenuItem key={10} value="2020-05-09T06:00:00.000Z">
                    06:00:00
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="closeTime"
                  name="closeTime"
                  placeholder="Close Time"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="Close Time"
                  value={form.closeTime}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="2020-05-09T08:00:00.000Z">
                    08:00:00
                  </MenuItem>
                  <MenuItem key={1} value="2020-05-09T09:00:00.000Z">
                    09:00:00
                  </MenuItem>
                  <MenuItem key={2} value="2020-05-09T10:00:00.000Z">
                    10:00:00
                  </MenuItem>
                  <MenuItem key={3} value="2020-05-09T11:00:00.000Z">
                    11:00:00
                  </MenuItem>
                  <MenuItem key={4} value="2020-05-09T12:00:00.000Z">
                    12:00:00
                  </MenuItem>
                  <MenuItem key={5} value="2020-05-09T01:00:00.000Z">
                    01:00:00
                  </MenuItem>
                  <MenuItem key={6} value="2020-05-09T02:00:00.000Z">
                    02:00:00
                  </MenuItem>
                  <MenuItem key={7} value="2020-05-09T03:00:00.000Z">
                    03:00:00
                  </MenuItem>
                  <MenuItem key={8} value="2020-05-09T04:00:00.000Z">
                    04:00:00
                  </MenuItem>
                  <MenuItem key={9} value="2020-05-09T05:00:00.000Z">
                    05:00:00
                  </MenuItem>
                  <MenuItem key={10} value="2020-05-09T06:00:00.000Z">
                    06:00:00
                  </MenuItem>
                </TextField>
              </Grid>
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
  dialog: Selectors.makeSelectAttendanceDialog(),
  days: Selectors.makeSelectDays(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewAttendanceDialog: () => dispatch(Actions.closeNewAttendanceDialog()),
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