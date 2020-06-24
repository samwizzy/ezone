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

const durations = ['Days', 'Weeks', 'Months', 'Years'];

function AddShiftDialog(props) {
  const classes = useStyles();
  const { closeNewShiftDialog, dialog, employees } = props;
  const [option, setOption] = React.useState({ shiftDays: false })
  const [form, setForm] = React.useState({
    name: '',
    type: 'PAID',
    description: '',
    eligibleEmployees: [
      { id: 0 }
    ],
    gender: "MALE",
    leaveAllowancePercent: 0,
    numberOfDaysFromHire: 0,
    orgId: "",
    validFrom: moment().format('YYYY-MM-DD'),
    validTill: moment().format('YYYY-MM-DD')
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { name, type, validity, from, to, description } = form
    return name.length > 0 && type.length > 0 && validity.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj })
  }

  const handleDateChange = (name, date) => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') })
  }

  const handleSubmit = () => { }

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
              Add Leave Type
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <TextField
                    id="name"
                    name="name"
                    placeholder="Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <Autocomplete
                    id="combo-box-name"
                    size="small"
                    options={employees ? employees : []}
                    getOptionLabel={option => option.firstName + ' ' + option.lastName}
                    onChange={handleSelectChange('eligibleEmployees')}
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
                <TableCell colSpan={2}>
                  <TextField
                    id="type"
                    name="type"
                    placeholder="Type"
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    label="Type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <MenuItem key="" value="" disabled>
                      Select type
                    </MenuItem>
                    {['PAID', 'UNPAID'].map((type, i) =>
                      <MenuItem key={i} value={type}>
                        {type}
                      </MenuItem>
                    )}
                  </TextField>
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell colSpan={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Validity</FormLabel>
                    <RadioGroup row aria-label="position" name="position" value={form.validity}>
                      <FormControlLabel value="validity" control={<Radio color="primary" />} label="Validity Date" />
                      <FormControlLabel value="off-days" control={<Radio color="primary" />} label="Shift off days" />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell colSpan={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup row aria-label="gender" name="gender" value={form.gender} row>
                      <FormControlLabel value="Male" control={<Radio color="primary" />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio color="primary" />} label="Female" />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      inputVariant="outlined"
                      id="valid-from"
                      label="Valid From"
                      size="small"
                      value={form.validFrom}
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
                      id="valid-till"
                      label="Valid Till"
                      size="small"
                      value={form.validTill}
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
                    id="description"
                    name="description"
                    placeholder="Description"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                    size="small"
                    label="Description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.policy}
                        onChange={handleChange}
                        name="policy"
                        color="primary"
                      />
                    }
                    label="Policy"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Entitlement</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Activate</FormLabel>
                    <RadioGroup row aria-label="position" name="position" value={form.validity}>
                      <FormControlLabel value="validity" control={<Radio color="primary" />} label="Based on date after hiring" />
                    </RadioGroup>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <FormLabel component="legend">From</FormLabel>
                  <TextField
                    id="days"
                    name="days"
                    placeholder="0"
                    margin="dense"
                    variant="outlined"
                    size="small"
                    label="Day"
                    value={form.description}
                    onChange={handleChange}
                  />
                  <TextField
                    id="type"
                    name="type"
                    placeholder="Type"
                    select
                    variant="outlined"
                    margin="dense"
                    style={{ width: 180 }}
                    size="small"
                    label="Days"
                    value={form.duration}
                    onChange={handleChange}
                  >
                    {durations.map((duration, i) =>
                      <MenuItem key={i} value={duration}>
                        {duration}
                      </MenuItem>
                    )}
                  </TextField>
                  <FormControl component="legend">
                    <FormControlLabel value="validity" control={<Radio color="primary" />} label="Manually" />
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormLabel component="legend">Applicable To</FormLabel>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    id="type"
                    name="type"
                    placeholder="Type"
                    select
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Gender"
                    value={form.type}
                    onChange={handleChange}
                  >
                    {durations.map((duration, i) =>
                      <MenuItem key={i} value={duration}>
                        {duration}
                      </MenuItem>
                    )}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    id="type"
                    name="type"
                    placeholder="Type"
                    select
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Marital Status"
                    value={form.type}
                    onChange={handleChange}
                  >
                    {durations.map((duration, i) =>
                      <MenuItem key={i} value={duration}>
                        {duration}
                      </MenuItem>
                    )}
                  </TextField>
                </TableCell>
              </TableRow> 
              <TableRow>
                <TableCell colSpan={2}>
                  <TextField
                    id="userId"
                    name="userId"
                    placeholder="Employee"
                    select
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    label="Employee"
                    value={form.userId}
                    onChange={handleChange}
                  >
                    {employees && employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.firstName} {employee.lastName}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
              </TableRow>*/}
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
  dialog: Selectors.makeSelectLeaveTypeDialog(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewShiftDialog: () => dispatch(Actions.closeNewLeaveTypeDialog()),
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