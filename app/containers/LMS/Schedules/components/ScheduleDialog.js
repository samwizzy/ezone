/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Checkbox,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
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
  Radio,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import { Add, DeleteOutlined } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    whiteSpace: "nowrap",
    "& .MuiTableCell-root": {
      border: "0 !important"
    },
    "& .MuiTableRow-root": {
      "& .MuiTableCell-root:first-child": {
        backgroundColor: theme.palette.grey[50],
        width: 158,
        fontWeight: theme.typography.h6.fontWeight
      }
    }
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleDialog = props => {
  const classes = useStyles();
  const { loading, scheduleDialog, closeNewScheduleDialog } = props;
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    mobileNo: '',
    lifeStage: '',
    contactGroup: '',
    contactGroupId: '',
    contactSource: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    fax: '',
    dob: '',
    image: '',
    notes: '',
    ownerId: '',
    type: '',
    website: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {}
  const canSubmitForm = () => {}

  return (
    <div className={classes.root}>
      <Dialog
        fullWidth={true}
        maxWidth = {'md'}        
        {...scheduleDialog.props}
        onClose={closeNewScheduleDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          <Typography variant="h6">
            Add New Schedule
          </Typography>
        </DialogTitle>
        <Divider />

        <CardContent>
          <Table className={classes.table}>
            <TableBody>
              <TableRow>
                <TableCell>Schedule type</TableCell>
                <TableCell>
                  <TextField
                    name="firstName"
                    label="Schedule type"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>
                  <TextField
                    name="lastName"
                    label="Location"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.lastName}
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
                    <KeyboardDatePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="Date"
                      size="small"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="time-picker"
                      label="Time"
                      size="small"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={<Checkbox checked={form.all} onChange={handleChange} name="all" />}
                    label="All days"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">To</TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="date-picker-dialog"
                      label="Date"
                      size="small"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="time-picker"
                      label="Time"
                      size="small"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="right">Host</TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    id="Host"
                    name="Host"
                    placeholder="Select Host"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Host"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Participant Employees</TableCell>
                <TableCell>
                  <TextField
                    id="lifeStage"
                    name="lifeStage"
                    placeholder="Select life Stage"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Participant Employees"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
                  <IconButton><DeleteOutlined /></IconButton>
                </TableCell>
                <TableCell align="right">Participant Contacts</TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    id="lifeStage"
                    name="lifeStage"
                    placeholder="Select life Stage"
                    select
                    fullWidth
                    style={{width: '200px'}}
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Contact"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    id="lifeStage"
                    name="lifeStage"
                    placeholder="Select life Stage"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Employee"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
                  <IconButton><Add /></IconButton>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Related to</TableCell>
                <TableCell>
                  <TextField
                    id="lifeStage"
                    name="lifeStage"
                    placeholder="Select life Stage"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Related to"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Repeat Reminder</TableCell>
                <TableCell>
                  <TextField
                    id="lifeStage"
                    name="lifeStage"
                    placeholder="Select life Stage"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Repeat Reminder"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell></TableCell>
                <TableCell colSpan={3}>
                  <TextField
                    name="phoneNumber"
                    label="Description"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                    value={form.phoneNumber}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Reminder</TableCell>
                <TableCell>
                  <TextField
                    id="lifeStage"
                    name="lifeStage"
                    placeholder="Select life Stage"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Reminder"
                    value={form.lifeStage}
                    onChange={handleChange}
                  >
                    <MenuItem key={0} value="3">
                      No record
                    </MenuItem>
                  </TextField>
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
            disabled={!canSubmitForm()}
            color="primary"
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
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewScheduleDialog: () => dispatch(Actions.closeNewScheduleDialog()),
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
