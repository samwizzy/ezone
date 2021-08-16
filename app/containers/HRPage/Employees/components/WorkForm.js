import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {
  AppBar,
  Button,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
  DialogContent,
  DialogActions,
  Toolbar,
} from '@material-ui/core';
import EmployeeTypeDialog from './EmployeeTypeDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const statuses = ['ACTIVE', 'RESIGNED', 'TERMINATED', 'DECEASED'];

export const WorkForm = props => {
  const {
    handleChange,
    openNewEmployeeTypeDialog,
    handleDateChange,
    closeNewEmployeeDialog,
    handleNext,
    handlePrev,
    form,
    employees,
    departments,
    positions,
    branches,
    employeeTypes,
    sourcesOfHire,
    payRates,
    payTypes,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const {
      departmentId,
      branchId,
      employeeType,
      employeeStatus,
      payRate,
      payType,
      positionId,
      reportingTo,
    } = form;
    return (
      departmentId &&
      branchId &&
      employeeType &&
      employeeStatus &&
      payRate &&
      payType &&
      positionId &&
      reportingTo
    );
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Work Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="branch"
              name="branchId"
              required
              placeholder="Select branch"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Branch"
              value={form.branchId}
              onChange={handleChange}
            >
              <MenuItem value={null}>Select branch</MenuItem>
              {branches &&
                branches.map(branch => (
                  <MenuItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="department"
              name="departmentId"
              required
              placeholder="Select department"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Department"
              value={form.departmentId}
              onChange={handleChange}
            >
              <MenuItem value="">Select department</MenuItem>
              {departments &&
                departments.map(dept => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="employment-status"
              name="employeeStatus"
              required
              placeholder="Select employment status"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Employment status"
              value={form.employeeStatus}
              onChange={handleChange}
            >
              <MenuItem value="">Select employment status</MenuItem>
              {statuses.map((status, i) => (
                <MenuItem key={i} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="position-id"
              name="positionId"
              placeholder="Select position"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Position"
              value={form.positionId}
              onChange={handleChange}
            >
              <MenuItem value="">Select position</MenuItem>
              {positions.map(position => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="employment-type"
              name="employeeType"
              placeholder="Select employee type"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Employee type"
              value={form.employeeType}
              onChange={handleChange}
              helperText={
                <Link
                  href="#"
                  onClick={event => (
                    event.preventDefault(),
                    openNewEmployeeTypeDialog('EMPLOYEETYPE')
                  )}
                >
                  Add employee type
                </Link>
              }
            >
              <MenuItem value="">Select employee type</MenuItem>
              {employeeTypes &&
                employeeTypes.map((empType, i) => (
                  <MenuItem key={i} value={empType.id}>
                    {empType.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="source-of-hire"
              name="sourceOfHire"
              placeholder="Select source of hire"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Source of hire"
              value={form.sourceOfHire}
              onChange={handleChange}
              helperText={
                <Link
                  href="#"
                  onClick={event => {
                    event.preventDefault(),
                      openNewEmployeeTypeDialog('SOURCEOFHIRE');
                  }}
                >
                  Add source of hire
                </Link>
              }
            >
              <MenuItem value="">Select source of hire</MenuItem>
              {sourcesOfHire &&
                sourcesOfHire.map((source, i) => (
                  <MenuItem key={i} value={source.id}>
                    {source.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="pay-rate"
              name="payRate"
              placeholder="Enter pay rate"
              required
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Pay rate"
              value={form.payRate}
              onChange={handleChange}
              helperText={
                <Link
                  href="#"
                  onClick={event => {
                    event.preventDefault(),
                      openNewEmployeeTypeDialog('PAYRATE');
                  }}
                >
                  Add pay rate
                </Link>
              }
            >
              <MenuItem value="">Select pay rate</MenuItem>
              {payRates &&
                payRates.map((payType, i) => (
                  <MenuItem key={i} value={payType.id}>
                    {payType.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="pay-type"
              name="payType"
              required
              placeholder="Select pay type"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Pay type"
              value={form.payType}
              onChange={handleChange}
              helperText={
                <Link
                  href="#"
                  onClick={event => {
                    event.preventDefault(),
                      openNewEmployeeTypeDialog('PAYTYPE');
                  }}
                >
                  Add pay type
                </Link>
              }
            >
              <MenuItem value="">Select pay type</MenuItem>
              {payTypes &&
                payTypes.map((payType, i) => (
                  <MenuItem key={i} value={payType.id}>
                    {payType.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                required
                variant="inline"
                format="dd/MM/yyyy"
                margin="dense"
                size="small"
                inputVariant="outlined"
                fullWidth
                id="employment-date"
                label="Employment date"
                value={form.employmentDate}
                onChange={date => handleDateChange(date, 'employmentDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="reporting-to"
              name="reportingTo"
              placeholder="Select employee you report to"
              select
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Reporting to"
              value={form.reportingTo}
              onChange={handleChange}
            >
              <MenuItem value="">Select employee to report to</MenuItem>
              {employees &&
                employees.map(employee => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="work-phone"
              name="workPhone"
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              label="Office contact"
              value={form.workPhone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-job-desc"
              name="jobDesc"
              label="Job description"
              multiline
              fullWidth
              margin="dense"
              rows="4"
              rowsMax="4"
              value={form.jobDesc}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewEmployeeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canSubmitForm()}
          color="primary"
        >
          Next
        </Button>
      </DialogActions>

      <EmployeeTypeDialog />
    </React.Fragment>
  );
};
