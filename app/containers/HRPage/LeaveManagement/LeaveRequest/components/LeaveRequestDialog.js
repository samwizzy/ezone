import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import EzoneUtils from '../../../../../utils/EzoneUtils'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AttachFileIcon from '@material-ui/icons/AttachFile'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppBar, Box, Button, IconButton, Dialog, DialogActions, DialogContent, Divider, Grid, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import momentBD from "moment-business-days";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  input: {
    display: 'none',
  },
  divider: {
    margin: theme.spacing(1, 0)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const model = {
  fromDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  tillDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  status: "TAKEN",
}

function LeaveRequestDialog(props) {
  const classes = useStyles();
  const { closeNewLeaveRequestDialog, dialog, leaveTypes, employees, createLeaveRequest } = props;
  const [leaveType, setLeaveType] = useState({})
  const [form, setForm] = useState({
    leaveTypeId: '',
    base64doc: '',
    description: '',
    documentName: '',
    employeeId: 0,
    from: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    leaveAllowance: 0,
    leaveSchedules: [
      {
        fromDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
        status: "TAKEN",
        tillDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
      }
    ],
    noOfDays: 0,
    status: 'APPROVED',
    till: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
  });

  function dateDifference(date2, date1) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...form })
    }
  }, [dialog])

  console.log(moment().isoWeekday(6)._d, "moment().isoWeekday(7)")

  useEffect(() => {
    // var diff = momentBD('05-15-2017', 'MM-DD-YYYY').businessDiff(momentBD('05-08-2017','MM-DD-YYYY'));
    console.log(dateDifference(momentBD('05-15-2017').format(), momentBD('05-08-2017').format()))
  
    if(form.leaveTypeId){
      setForm(state => ({...state, noOfDays: moment(leaveType.validTill).diff(leaveType.validFrom, 'days', true)}))
    }
  }, [form.leaveTypeId])

  const addRow = () => {
    setForm({ ...form, leaveSchedules: [...form.leaveSchedules, model] })
  }
  const removeRow = index => {
    const { leaveSchedules } = form
    leaveSchedules.splice(index, 1);
    setForm({ ...form, leaveSchedules });
  }

  console.log(employees, "employees leave request")

  const canSubmitForm = () => {
    const { employeeId, documentName, status, leaveAllowance, from, till, description } = form
    return employeeId && documentName.length > 0 && description.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, obj) => {
    name === 'employeeId' &&
      setForm({ ...form, [name]: obj ? obj.id : obj });
    name === 'leaveTypeId' && (
      setForm({ ...form, [name]: obj ? obj.id : obj }),
      setLeaveType(obj)
    )
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') })
  }

  const handleScheduleDateChange = (name, i) => date => {
    const { leaveSchedules } = form
    leaveSchedules[i][name] = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS')
    setForm({ ...form, leaveSchedules })
  }

  const handleImageChange = (event) => {
    const { name, files } = event.target
    const result = EzoneUtils.toBase64(files[0]);
    result.then(file =>
      setForm({ ...form, [name]: file, documentName: files[0].name.substr(0, 5).concat(moment().format('YYYY-MM-DDTHH:mm:ss')) })
    )
  }

  const handleSubmit = () => {
    createLeaveRequest(form)
  }

  console.log(form, "form check")
  console.log(leaveTypes, "leaveTypes check")
  console.log(leaveType, "leaveType single")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewLeaveRequestDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Leave Request
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container alignItems="center" justify="flex-start" spacing={1}>
            <Grid item xs={12}>
              <Autocomplete
                id="leave-type-id"
                size="small"
                options={leaveTypes ? leaveTypes : []}
                getOptionLabel={(option) => option.name}
                onChange={handleSelectChange('leaveTypeId')}
                value={form.leaveTypeId ? _.find(leaveTypes, { id: form.leaveTypeId }) : null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Leave Type"
                    variant="outlined"
                    placeholder="Search"
                    margin="dense"
                    fullWidth
                    helperText={
                      form.leaveTypeId ? 'You have selected a ' + moment(leaveType.validTill).
                        diff(leaveType.validFrom, 'days', true) + ' days leave type' : ''
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="leave-employee"
                size="small"
                options={employees ? employees : []}
                getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                onChange={handleSelectChange('employeeId')}
                value={form.employeeId ? _.find(employees, { id: form.employeeId }) : null}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Employee"
                    variant="outlined"
                    placeholder="Search"
                    margin="dense"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="leave-allowance"
                name="leaveAllowance"
                placeholder="Leave Allowance"
                margin="dense"
                variant="outlined"
                size="small"
                label="Leave Allowance"
                value={form.leaveAllowance}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="no-of-days"
                name="noOfDays"
                placeholder="Number of Days"
                margin="dense"
                variant="outlined"
                size="small"
                label="Number of Days"
                value={form.noOfDays}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="dense"
                  fullWidth
                  size="small"
                  name="from"
                  id="from-date"
                  label="From"
                  value={form.from}
                  onChange={handleDateChange('from')}
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
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="dense"
                  fullWidth
                  size="small"
                  name="till"
                  id="till-date"
                  label="Till"
                  value={form.till}
                  onChange={handleDateChange('till')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  helperText={
                    form.leaveTypeId ? 'You have ' + _.round(moment(leaveType.validTill).
                      diff(leaveType.validFrom, 'days', true) - moment(form.till).
                        diff(form.from, 'days', true)) + ' days left' : ''
                  }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="subtitle1">
                Schedule List (You have {_.round(moment(form.till).diff(form.from, 'days', true))} days)
              </Typography>
            </Grid>

            {form.leaveSchedules.map((row, i) => (
              <React.Fragment key={i}>
                <Grid item xs={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      fullWidth
                      size="small"
                      name="fromDate"
                      id="date-from"
                      label="Date From"
                      value={row.fromDate}
                      onChange={handleScheduleDateChange('fromDate', i)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={5}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      fullWidth
                      size="small"
                      name="tillDate"
                      id="date-till"
                      label="Date Till"
                      value={row.tillDate}
                      onChange={handleScheduleDateChange('tillDate', i)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="primary" onClick={() => removeRow(i)}><DeleteIcon /></IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button color='inherit' size="small" onClick={addRow}>Add Another</Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="description"
                name="description"
                placeholder="Description"
                fullWidth
                margin="dense"
                variant="outlined"
                multiline
                rows={2}
                rowsMax={3}
                size="small"
                label="Reason"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                color="default"
                className={classes.button}
                startIcon={<AttachFileIcon />}
                disableElevation
              >
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  name="base64doc"
                  multiple
                  type="file"
                  onChange={handleImageChange}
                />
                Attach a file
              </Button>
              {form.base64doc && <Box my={1}><img height='120px' src={`data:image/jpg;base64, ${form.base64doc}`} /></Box>}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewLeaveRequestDialog} variant="contained" disableElevation>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} variant="contained" color="primary" disableElevation>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


LeaveRequestDialog.propTypes = {
  closeNewLeaveRequestDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectLeaveRequestDialog(),
  employees: Selectors.makeSelectEmployees(),
  leaveTypes: Selectors.makeSelectLeaveTypes(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewLeaveRequestDialog: () => dispatch(Actions.closeNewLeaveRequestDialog()),
    createLeaveRequest: (data) => dispatch(Actions.createLeaveRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LeaveRequestDialog);
