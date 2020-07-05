import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import { AppBar, Box, Button, Container, Divider, Grid, Link, MenuItem, TextField, Toolbar, Typography, CardContent, CardActions, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../../../../utils/countries'
import EmployeeTypeDialog from './../../Employees/components/EmployeeTypeDialog'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
}));

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

export const JobInfoForm = props => {
    const { handleChange, handleDateChange, openNewEmployeeTypeDialog, handleCountryChange, handleSelectChange, departments, enrollmentTypes, locations, form } = props
    const classes = useStyles()
    const canSubmitForm = () => {
        const { departmentId, enrollmentTypeId, submissionDeadline, noOfVancancies, address, country } = form
        return departmentId && enrollmentTypeId && noOfVancancies && address.length > 0
    }
    return (
        <Paper>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h6" gutterBottom>More information</Typography>
                </Toolbar>
            </AppBar>

            <Container>
                <Box p={3} className={classes.root}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    id="job-department"
                                    name="departmentId"
                                    placeholder="Select department"
                                    select
                                    fullWidth
                                    variant="outlined"
                                    margin="normal"
                                    size="small"
                                    label="Department"
                                    value={form.departmentId}
                                    onChange={handleSelectChange}
                                >
                                    {departments && departments.map((dept) => (
                                        <MenuItem key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="enrollment-type"
                                    name="enrollmentTypeId"
                                    placeholder="Select enrolment type"
                                    select
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    label="Enrollment Type"
                                    value={form.enrollmentTypeId}
                                    onChange={handleSelectChange}
                                    helperText={
                                        <Link href='#' onClick={event => (
                                            event.preventDefault(), openNewEmployeeTypeDialog("ENROLLMENTTYPE")
                                        )}>
                                            Add Enrollment Type
                                        </Link>
                                    }
                                >
                                    {enrollmentTypes &&
                                        <MenuItem key="" value="" disabled>
                                            Select Enrollment Type
                                        </MenuItem>
                                    }
                                    {enrollmentTypes && enrollmentTypes.length === 0 &&
                                        <MenuItem key="0" value={null}>
                                            No Record
                                        </MenuItem>
                                    }
                                    {enrollmentTypes && enrollmentTypes.map((enrollmentType) => (
                                        <MenuItem key={enrollmentType.id} value={enrollmentType.id}>
                                            {enrollmentType.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {/*
                            <Grid item xs={6}>
                                <TextField
                                id="experience"
                                name="experience"
                                placeholder="Select experience"
                                select
                                fullWidth
                                className={classes.textField}
                                variant="outlined"
                                size="small"
                                label="Experience"
                                value={form.experience}
                                onChange={handleChange}
                                >
                                <MenuItem key={0} value="1">
                                    No record
                                </MenuItem>
                                </TextField>
                            </Grid>
                            */}
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        autoOk
                                        disableToolbar
                                        disablePast
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        name="startDate"
                                        id="date-picker-startDate"
                                        label="Submission Deadline"
                                        value={form.submissionDeadline}
                                        onChange={handleDateChange('submissionDeadline')}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="location"
                                    name="locationId"
                                    placeholder="Select location"
                                    select
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    label="Location"
                                    value={form.locationId}
                                    onChange={handleSelectChange}
                                    helperText={
                                        <Link href='#' onClick={event => (
                                            event.preventDefault(), openNewEmployeeTypeDialog("LOCATION")
                                        )}>
                                            Add Location
                                        </Link>
                                    }
                                >
                                    {locations &&
                                        <MenuItem key="" value="" disabled>
                                            Select Location
                                        </MenuItem>
                                    }
                                    {locations && locations.length === 0 &&
                                        <MenuItem key="0" value={null}>
                                            No Record
                                        </MenuItem>
                                    }
                                    {locations && locations.map((location) => (
                                        <MenuItem key={location.id} value={location.id}>
                                            {location.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    id="no-of-vacation"
                                    name="noOfVancancies"
                                    placeholder="Select number of vacancy"
                                    select
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    label="Number of vacancy"
                                    value={form.noOfVancancies}
                                    onChange={handleChange}
                                >
                                    {_.range(1, 11).map(i =>
                                        <MenuItem key={i} value={i}>
                                            {i}
                                        </MenuItem>
                                    )}
                                </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    id="country-select-demo"
                                    size="small"
                                    options={countries}
                                    classes={{
                                        option: classes.option,
                                    }}
                                    value={form.country ? countries.find(country => country.label === form.country) : null}
                                    onChange={handleCountryChange('country')}
                                    autoHighlight
                                    getOptionLabel={option => option.label}
                                    renderOption={option => (
                                        <React.Fragment>
                                            <span>{countryToFlag(option.code)}</span>
                                            {option.label} ({option.code}) +{option.phone}
                                        </React.Fragment>
                                    )}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Choose a country"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    name="address"
                                    label="Address"
                                    id="outlined-title"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    size="small"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Container>
            {/*
        <AppBar position='relative' color="inherit" elevation={0}>
          <Toolbar variant="dense">
            <Typography variant="h6" gutterBottom>Job Schema Information ( Optional )</Typography>
          </Toolbar>
        </AppBar>

        <Container>
            <Box p={3} className={classes.root}>
            <Grid container spacing={1}>     
                <Grid item xs={12}>
                    <TextField
                    name="street-address"
                    label="Street Address"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.streetAddress}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="state"
                    name="state"
                    placeholder="Select state"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="State"
                    value={form.state}
                    onChange={handleChange}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem key={0} value="1">
                        No record
                    </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="country"
                    name="country"
                    placeholder="Select country"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Country"
                    value={form.country}
                    onChange={handleChange}
                    >
                    <MenuItem key={0} value="1">
                        No record
                    </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                <Autocomplete
                id="country-select-demo"
                style={{ width: '100%' }}
                options={countries}
                classes={{
                    option: classes.option,
                }}
                autoHighlight
                getOptionLabel={option => option.label}
                renderOption={option => (
                    <React.Fragment>
                    <span>{countryToFlag(option.code)}</span>
                    {option.label} ({option.code}) +{option.phone}
                    </React.Fragment>
                )}
                renderInput={params => (
                    <TextField
                    {...params}
                    label="Choose a country"
                    variant="outlined"
                    size="small"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                    />
                )}
                />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    name="salary"
                    label="Salary"
                    id="outlined-title"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={form.salary}
                    onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="salary-type"
                    name="salaryType"
                    placeholder="Select Salary Type"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Salary Type"
                    value={form.salaryType}
                    onChange={handleChange}
                    >
                    <MenuItem key={0} value="2">
                        No record
                    </MenuItem>
                    </TextField>
                </Grid>
            </Grid>
            </Box>
        </Container> */}
            <EmployeeTypeDialog />
        </Paper>
    )
}