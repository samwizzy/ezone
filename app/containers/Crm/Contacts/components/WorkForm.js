import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {Button, Grid, MenuItem, TextField, DialogTitle, DialogContent, DialogActions, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
    },
}));

export const WorkForm = props => {
    const {handleChange, handleDateChange, closeNewEmployeeDialog, handleSubmit, handlePrev, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const { employeeId, role, department, branch, employmentType, employmentStatus, payRate, payType } = form
        return employeeId.length > 0 && role.length > 0 && department.length > 0 && branch.length > 0 && employmentType.length > 0
        && employmentStatus.length > 0 && payRate.length > 0 && payType.length > 0  
    }

    return (
        <React.Fragment>
            <DialogTitle id="alert-dialog-slide-title">
                Work Information
            </DialogTitle>
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
                        value={form.department}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="1">
                            No record
                        </MenuItem>
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
                        <MenuItem key={0} value="2">
                            No record
                        </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        id="employment-type"
                        name="employmentType"
                        placeholder="Select Employment Type"
                        select
                        fullWidth
                        className={classes.textField}
                        variant="outlined"
                        size="small"
                        label="Employment Type"
                        value={form.employmentType}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="3">
                            No record
                        </MenuItem>
                        </TextField>
                    </Grid>
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
                        value={form.role}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="2">
                            No record
                        </MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
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
                        value={form.reportTo}
                        onChange={handleChange}
                        >
                        <MenuItem key={0} value="1">
                            No record
                        </MenuItem>
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