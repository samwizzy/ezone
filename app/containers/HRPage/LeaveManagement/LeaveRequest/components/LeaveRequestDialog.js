import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import EzoneUtils from '../../../../../utils/EzoneUtils'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, FormLabel, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

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
  const [rows, setRows] = React.useState([{ ...model }])
  const [form, setForm] = React.useState({
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
    status: 'APPROVED',
    till: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...dialog.data })
    }
  }, [dialog])

  const addRow = () => {
    setForm({ ...form, leaveSchedules: [...form.leaveSchedules, model] })
  }
  const removeRow = index => {
    form.leaveSchedules.splice(index, 1)
    setForm(form)
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
      setForm({ ...form, [name]: obj.id });
    name === 'leaveTypeId' &&
      setForm({ ...form, [name]: obj.id });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') })
  }

  const handleImageChange = (event) => {
    const { name, files } = event.target
    const result = EzoneUtils.toBase64(files[0]);
    result.then(file =>
      setForm({ ...form, [name]: file, documentName: files[0].name })
    )
  }

  const handleSubmit = () => {
    createLeaveRequest(form)
  }

  console.log(form, "form check")
  console.log(leaveTypes, "leaveTypes check")

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
          <Grid container spacing={1}>
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
                    margin="normal"
                    fullWidth
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
                    margin="normal"
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
                margin="normal"
                variant="outlined"
                size="small"
                label="Leave Allowance"
                value={form.leaveAllowance}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  disableFuture
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="normal"
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
                  disableFuture
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="normal"
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
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography color="textPrimary" variant="subtitle1">Schedule List</Typography>
            </Grid>

            {form.leaveSchedules.map((row, i) => (
              <React.Fragment key={i}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableFuture
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      fullWidth
                      size="small"
                      name="fromDate"
                      id="date-from"
                      label="Date From"
                      value={row.fromDate}
                      onChange={handleDateChange('fromDate', i)}
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
                      disableFuture
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      margin="normal"
                      fullWidth
                      size="small"
                      name="tillDate"
                      id="date-till"
                      label="Date Till"
                      value={row.tillDate}
                      onChange={handleDateChange('tillDate', i)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid xs={12}><Divider /></Grid>
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
                margin="normal"
                variant="outlined"
                multiline
                rows={4}
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
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewLeaveRequestDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
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