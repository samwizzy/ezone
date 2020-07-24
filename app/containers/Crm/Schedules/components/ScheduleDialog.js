/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  CircularProgress,
  Checkbox,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Slide,
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
  FormControlLabel,
} from '@material-ui/core';
import { Add, DeleteOutlined } from '@material-ui/icons';
import moment from 'moment';
import _ from 'lodash';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    whiteSpace: "nowrap",
    "& td": {
      border: "0 !important"
    },
    "& .MuiTableRow-root": {
      "& .MuiTableCell-root:first-child": {
        backgroundColor: theme.palette.grey[50],
        width: 158,
        fontWeight: theme.typography.h6.fontWeight
      }
    }
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleDialog = props => {
  const classes = useStyles();
  const { loading, scheduleDialog, closeNewScheduleDialog, employees, contacts, createSchedule } = props;
  const [options, setOptions] = React.useState({ repeatReminderUnit: 'MINUTES', all: false })
  const [form, setForm] = React.useState({
    title: "",
    location: "",
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    startTime: moment().format('HH:mm:ss'),
    endTime: moment().format('HH:mm:ss'),
    hostId: 1,
    repeatReminder: "15",
    description: "",
    userParticipants: [],
    contactParticipants: []
  });

  console.log(employees, "employees")
  console.log(contacts, "contacts")

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleOptionsChange = event => {
    const { name, value } = event.target;
    setOptions({ ...options, [name]: value });
  };

  const handleSelectChange = name => (event, val) => {
    name === 'hostId' ?
      setForm({ ...form, [name]: val.id }) :
      setForm({ ...form, [name]: val.map(a => a.id) });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') })
  }

  const handleTimeChange = (event) => {
    const { name, value } = event.target
    console.log(name, "name")
    console.log(value, "value")
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    createSchedule(form)
  }

  const canSubmitForm = () => {
    const {
      title,
      location,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
      hostId,
      userParticipants,
      contactParticipants,
    } = form
    return (
      title.length > 0 && location.length > 0 && description.length > 0 &&
      startDate.length > 0 && startTime.length > 0 && endDate.length > 0 &&
      endTime.length > 0 && hostId &&
      userParticipants.length > 0 && contactParticipants.length > 0
    )
  }

  console.log(form, "form schedules")

  return (
    <div className={classes.root}>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        {...scheduleDialog.props}
        onClose={closeNewScheduleDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          <Typography variant="h6" component="p">
            Add New Schedule
          </Typography>
        </DialogTitle>
        <Divider />

        <CardContent>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>Schedule title</TableCell>
                <TableCell>
                  <TextField
                    name="title"
                    label="Schedule title"
                    id="outlined-schedule-title"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={form.title}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>
                  <TextField
                    name="location"
                    label="Location"
                    id="outlined-location"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value={form.location}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <Divider />

        <CardContent>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell align="right">From</TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      autoOk
                      margin="normal"
                      inputVariant="outlined"
                      id="start-date"
                      label="Start Date"
                      size="small"
                      format="dd/MM/yyyy hh:mm:ss"
                      value={form.startDate}
                      onChange={handleDateChange('startDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <div className={classes.container}>
                    <TextField
                      id="time"
                      name="startTime"
                      label="Start Time"
                      type="time"
                      className={classes.textField}
                      size="small"
                      variant="outlined"
                      margin="normal"
                      value={form.startTime}
                      onChange={handleTimeChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={<Checkbox checked={options.all} onChange={handleOptionsChange} name="all" />}
                    label="All days"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">To</TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      autoOk
                      margin="normal"
                      inputVariant="outlined"
                      id="end-date-picker"
                      label="End Date"
                      size="small"
                      format="dd/MM/yyyy hh:mm:ss"
                      value={form.endDate}
                      onChange={handleDateChange('endDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <div className={classes.container}>
                    <TextField
                      id="time"
                      name="endTime"
                      label="End Time"
                      type="time"
                      className={classes.textField}
                      size="small"
                      variant="outlined"
                      margin="normal"
                      value={form.endTime}
                      onChange={handleTimeChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300,
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">Host</TableCell>
                <TableCell colSpan={2}>
                  <Autocomplete
                    id="host-employees"
                    size="small"
                    options={employees ? employees : []}
                    getOptionLabel={option => option.firstName + ' ' + option.lastName}
                    onChange={handleSelectChange('hostId')}
                    value={form.hostId ? _.find(employees, { id: form.hostId }) : null}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Host"
                        variant="outlined"
                        placeholder="Select Host"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Participant Employees</TableCell>
                <TableCell colSpan={2}>
                  <Autocomplete
                    multiple
                    id="user-participants"
                    size="small"
                    options={employees ? employees : []}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    onChange={handleSelectChange('userParticipants')}
                    value={
                      form.userParticipants ?
                        _.filter(employees, function (o) {
                          return _.includes(form.userParticipants, o.id)
                        }) : null
                    }
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.firstName + ' ' + option.lastName}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Participants" placeholder="Employees" margin="normal" />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Participant Contacts</TableCell>
                <TableCell colSpan={2}>
                  <Autocomplete
                    multiple
                    id="contact-participants"
                    size="small"
                    options={contacts ? contacts : []}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    onChange={handleSelectChange('contactParticipants')}
                    value={
                      form.contactParticipants ?
                        _.filter(contacts, function (o) {
                          return _.includes(form.contactParticipants, o.id)
                        }) : null
                    }
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.firstName + ' ' + option.lastName}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} variant="outlined" label="Contact Participants" placeholder="Contacts" margin="normal" />
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Repeat Reminder</TableCell>
                <TableCell>
                  <TextField
                    id="repeat-reminder"
                    name="repeatReminder"
                    placeholder="Repeat Reminder"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Repeat Reminder"
                    value={form.repeatReminder}
                    onChange={handleChange}
                  >
                    {_.range(5, 65, 5).map((time, i) =>
                      <MenuItem key={i} value={time}>
                        {time}
                      </MenuItem>
                    )}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    id="repeat-reminder-unit"
                    name="repeatReminderUnit"
                    placeholder="Repeat Reminder Unit"
                    select
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Repeat Reminder Unit"
                    value={options.repeatReminderUnit}
                    onChange={handleOptionsChange}
                  >
                    {['MINUTES', 'HOURS', 'DAYS'].map((unit, i) =>
                      <MenuItem key={i} value={unit}>
                        {unit}
                      </MenuItem>
                    )}
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    name="description"
                    label="Description"
                    id="outlined-description"
                    fullWidth
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                    rowsMax={5}
                    value={form.description}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <DialogActions>
          <Button onClick={closeNewScheduleDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ScheduleDialog.propTypes = {
  loading: PropTypes.bool,
  scheduleDialog: PropTypes.object,
  closeNewScheduleDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  scheduleDialog: Selectors.makeSelectScheduleDialog(),
  employees: Selectors.makeSelectEmployees(),
  contacts: Selectors.makeSelectContacts(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewScheduleDialog: () => dispatch(Actions.closeNewScheduleDialog()),
    createSchedule: (data) => dispatch(Actions.createSchedule(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ScheduleDialog);
