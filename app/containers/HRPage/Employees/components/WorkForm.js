import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import { AppBar, Button, Grid, Link, MenuItem, TextField, Typography, DialogContent, DialogActions, Toolbar } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../App/selectors';
import EmployeeTypeDialog from './EmployeeTypeDialog'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
}));

const statuses = ['ACTIVE', 'RESIGNED', 'TERMINATED', 'DECEASED']

export const WorkForm = props => {
    const { handleChange, openNewEmployeeTypeDialog, handleDateChange, closeNewEmployeeDialog, handleNext, handleItemChange, handlePrev, form, employees, departments, roles, branches, employeeTypes, sourcesOfHire, payRates, payTypes } = props
    const classes = useStyles()
    const canSubmitForm = () => {
        const { employeeId, department, branch, employeeType, status, payRate, payType } = form
        return employeeId && department && branch && employeeType && status && payRate && payType
    }

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
                            name="employeeId"
                            label="Employee ID"
                            id="outlined-title"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            value={form.employeeId}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="branch"
                            name="branch"
                            placeholder="Select branch"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Branch"
                            value={form.branch ? form.branch.id : ''}
                            onChange={handleItemChange}
                        >
                            {branches && branches.length === 0 &&
                                <MenuItem key="" value={null}>
                                    No record
                                </MenuItem>
                            }
                            {branches && branches.map((branch) => (
                                <MenuItem key={branch.id} value={branch.id}>
                                    {branch.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            id="department"
                            name="department"
                            placeholder="Select department"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Department"
                            value={form.department ? form.department.id : ''}
                            onChange={handleItemChange}
                        >
                            {departments && departments.length === 0 &&
                                <MenuItem key="" value={null}>
                                    No record
                                </MenuItem>
                            }
                            {departments && departments.map((dept) => (
                                <MenuItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="employment-status"
                            name="status"
                            placeholder="Select Employment Status"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Employment Status"
                            value={form.status ? form.status : ''}
                            onChange={handleChange}
                        >
                            {statuses.map((status, i) =>
                                <MenuItem key={i} value={status}>
                                    {status}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="employment-type"
                            name="employeeType"
                            placeholder="Select Employee Type"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Employee Type"
                            value={form.employeeType ? form.employeeType.id : ''}
                            onChange={handleItemChange}
                            helperText={
                                <Link href='#' onClick={event => (
                                    event.preventDefault(), openNewEmployeeTypeDialog("EMPLOYEETYPE")
                                )}>
                                    Add Employee Type
                                </Link>
                            }
                        >
                            {employeeTypes &&
                                <MenuItem key="" value="" disabled>
                                    Select Employee Type
                                </MenuItem>
                            }
                            {employeeTypes && employeeTypes.length === 0 &&
                                <MenuItem key="0" value={null}>
                                    No Record
                                </MenuItem>
                            }
                            {employeeTypes && employeeTypes.map((empType, i) => (
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
                            placeholder="Select Source Of Hire"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Source Of Hire"
                            value={form.sourceOfHire ? form.sourceOfHire.id : ''}
                            onChange={handleItemChange}
                            helperText={
                                <Link href='#' onClick={event => (
                                    event.preventDefault(), openNewEmployeeTypeDialog("SOURCEOFHIRE")
                                )}>
                                    Add Source Of Hire
                                </Link>
                            }
                        >
                            {sourcesOfHire &&
                                <MenuItem key="" value="" disabled>
                                    Select Sources Of Hire
                                </MenuItem>
                            }
                            {sourcesOfHire && sourcesOfHire.length === 0 &&
                                <MenuItem key="0" value={null}>
                                    No Record
                                </MenuItem>
                            }
                            {sourcesOfHire && sourcesOfHire.map((source, i) => (
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
                            placeholder="Enter Pay Rate"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Pay Rate"
                            value={form.payRate ? form.payRate.id : ''}
                            onChange={handleItemChange}
                            helperText={
                                <Link href='#' onClick={event => (
                                    event.preventDefault(), openNewEmployeeTypeDialog("PAYRATE")
                                )}>
                                    Add Pay Rate
                                </Link>
                            }
                        >
                            {payRates &&
                                <MenuItem key="" value="" disabled>
                                    Select Pay Rate
                                </MenuItem>
                            }
                            {payRates && payRates.length === 0 &&
                                <MenuItem key="0" value={null}>
                                    No record
                                </MenuItem>
                            }
                            {payRates && payRates.map((payType, i) =>
                                <MenuItem key={i} value={payType.id}>
                                    {payType.name}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="pay-type"
                            name="payType"
                            placeholder="Select Pay Type"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Pay Type"
                            value={form.payType ? form.payType.id : ''}
                            onChange={handleItemChange}
                            helperText={
                                <Link href='#' onClick={event => (
                                    event.preventDefault(), openNewEmployeeTypeDialog("PAYTYPE")
                                )}>
                                    Add Pay Type
                                </Link>
                            }
                        >
                            {payTypes &&
                                <MenuItem key="0" value="" disabled>
                                    Select Pay Type
                                </MenuItem>
                            }
                            {payTypes && payTypes.length === 0 &&
                                <MenuItem key="" value={null}>
                                    No record
                                </MenuItem>
                            }
                            {payTypes && payTypes.map((payType, i) =>
                                <MenuItem key={i} value={payType.id}>
                                    {payType.name}
                                </MenuItem>
                            )}
                        </TextField>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            name="seatingLocation"
                            label="Seating Location"
                            id="outlined-seating-location"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            value={form.seatingLocation}
                            onChange={handleChange}
                        />
                    </Grid>

                    {/* <Grid item xs={6}>
                        <TextField
                            id="role"
                            name="role"
                            placeholder="Select Role"
                            select
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Role"
                        // value={form.role}
                        // onChange={handleChange}
                        >
                            {roles && roles.length === 0 &&
                                <MenuItem key="" value="">
                                    No record
                                </MenuItem>
                            }
                        </TextField>
                    </Grid> */}
                    <Grid item xs={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                autoOk
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                size="small"
                                inputVariant="outlined"
                                fullWidth
                                name="dateOfJoining"
                                id="date-picker-startDate"
                                label="Hired Date"
                                value={form.dateOfJoining}
                                onChange={(date) => handleDateChange(date, 'dateOfJoining')}
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
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Reporting To"
                            value={form.reportingTo ? form.reportingTo.id : ''}
                            onChange={handleItemChange}
                        >
                            <MenuItem key="" value="" disabled>
                                Select Employee to report to
                            </MenuItem>

                            {employees && employees.length === 0 &&
                                <MenuItem key="0" value={null}>
                                    No record
                                </MenuItem>
                            }
                            {employees && employees.map((employee) => (
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
                            margin="normal"
                            variant="outlined"
                            size="small"
                            label="Office Contact"
                            value={form.workPhone}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-job-desc"
                            name="jobDesc"
                            label="Job Description"
                            multiline
                            fullWidth
                            margin="normal"
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
                <Button onClick={handleNext} disabled={!canSubmitForm()} color="primary">
                    Next
                </Button>
            </DialogActions>

            <EmployeeTypeDialog />
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