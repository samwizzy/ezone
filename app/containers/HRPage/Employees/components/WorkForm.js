import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {AppBar, Button, Grid, MenuItem, TextField, Typography, DialogTitle, DialogContent, DialogActions, Divider, Toolbar} from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
    },
}));

export const WorkForm = props => {
    const {handleChange, handleSelectChange, handleDateChange, closeNewEmployeeDialog, handleSubmit, handlePrev, form, employees, departments, roles, employeeTypes} = props
    const classes = useStyles()
    const canSubmitForm = () => {
        const { employeeId, role, department, /*branch,*/ employeeType, employmentStatus,/* payRate, payType*/ } = form
        return employeeId && role && department /*&& branch.length > 0 */&& employeeType
        && employmentStatus.length > 0 /*&& payRate.length > 0 && payType.length > 0  */
    }
    return (
        <React.Fragment>
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Work Information
                    </Typography>
                </Toolbar>
            </AppBar>

            <Divider />   

            <DialogContent>
            <form className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField
                        name="employeeId"
                        label="Employee ID"
                        id="outlined-title"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={form.employeeId}
                        onChange={handleChange}
                        />
                    </Grid>
                    {/*
                    <Grid item xs={6}>
                        <TextField
                        id="branch"
                        name="branch"
                        placeholder="Select branch"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Branch"
                        value={form.branch}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="1">
                            No record
                        </MenuItem>
                        </TextField>
                    </Grid>
                    */}
                    <Grid item xs={6}>
                        <TextField
                        id="department"
                        name="department"
                        placeholder="Select department"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Department"
                        value={form.department.id}
                        onChange={handleSelectChange}
                        >
                        {departments && departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                        </MenuItem>
                        ))};
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        id="employment-status"
                        name="employmentStatus"
                        placeholder="Select Employment Status"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Employment Status"
                        value={form.employmentStatus}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="Active">
                            Active
                        </MenuItem>
                        <MenuItem key={1} value="Inactive">
                            Inactive
                        </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        id="employment-type"
                        name="employeeType"
                        placeholder="Select Employee Type"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Employee Type"
                        value={form.employeeType.id}
                        onChange={handleSelectChange}
                        >
                        {employeeTypes && employeeTypes.map((employeeType) => (
                        <MenuItem key={employeeType.id} value={employeeType.id}>
                            {employeeType.name}
                        </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    {/*
                    <Grid item xs={6}>
                        <TextField
                        id="pay-rate"
                        name="payRate"
                        placeholder="Select Pay Rate"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Pay Rate"
                        value={form.payRate}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="1">
                            No record
                        </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        id="pay-type"
                        name="payType"
                        placeholder="Select Pay Type"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Pay Type"
                        value={form.payType}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="1">
                            No record
                        </MenuItem>
                        </TextField>
                    </Grid>
                    */}
                    <Grid item xs={6}>
                        <TextField
                        id="role"
                        name="role"
                        placeholder="Select Role"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Role"
                        value={form.role.id}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="">
                            No record found
                        </MenuItem>
                        {roles && roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                            {role.name}
                        </MenuItem>
                        ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                size="small"
                                inputVariant="outlined"
                                fullWidth
                                name="dateOfJoining"
                                id="date-picker-startDate"
                                label="Hired Date"
                                value={form.dateOfJoining}
                                onChange={(date, formatted) => handleDateChange(date, formatted, 'dateOfJoining')}
                                KeyboardButtonProps={{
                                'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                        id="reportTo"
                        name="reportTo"
                        placeholder="Select employee you report to"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Reporting To"
                        value={form.reportTo.id}
                        onChange={handleSelectChange}
                        >
                        {employees && employees.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                        </MenuItem>
                        ))}
                        </TextField>
                    </Grid>

                </Grid>
            </form>
            </DialogContent>

            <DialogActions>
            <Button onClick={closeNewEmployeeDialog} color="primary">
                Cancel
            </Button>
            <Button onClick={handlePrev} color="primary">
                Prev
            </Button>
            <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
                Next
            </Button>
            </DialogActions>
        </React.Fragment>
    )
}
/*
const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
  employee: Selectors.makeSelectEmployee(),
  user: AppSelectors.makeSelectCurrentUser(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  employeeTypes: Selectors.makeSelectEmployeeTypes(),
  roles: Selectors.makeSelectRoles(),
});
*/