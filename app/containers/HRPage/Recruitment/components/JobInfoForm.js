import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {AppBar, Box, Button, Container, Divider, Grid, MenuItem, TextField, Toolbar, Typography, CardContent, CardActions, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import countries from '../../../../utils/countries'

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
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
    const {handleChange, handleDateChange, form } = props
    const classes = useStyles()

    return (
        <Paper>
        <AppBar position='relative'>
          <Toolbar>
            <Typography variant="h6" gutterBottom>Hiring Workflow</Typography>
          </Toolbar>
        </AppBar>

        <Container>
        <Box p={3} className={classes.root}>
            <div>
            <Grid container spacing={1}>
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
                    id="enrolment-type"
                    name="enrolmentType"
                    placeholder="Select enrolment type"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Enrolment Type"
                    value={form.enrolmentType}
                    onChange={handleChange}
                    >
                    <MenuItem key={0} value="1">
                        No record
                    </MenuItem>
                    </TextField>
                </Grid>
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
                <Grid item xs={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            fullWidth
                            name="startDate"
                            id="date-picker-startDate"
                            label="Submission Deadline"
                            value={form.deadline}
                            onChange={(date, formatted) => handleDateChange(date, formatted, 'deadline')}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="location"
                    name="location"
                    placeholder="Select location"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Location"
                    value={form.location}
                    onChange={handleChange}
                    >
                    <MenuItem key={0} value="1">
                        No record
                    </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="no-of-vacation"
                    name="vacancyNum"
                    placeholder="Select number of vacancy"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Number of vacancy"
                    value={form.vacancyNum}
                    onChange={handleChange}
                    >
                    {[...Array(20).keys()].map(i => 
                    <MenuItem key={i} value={i}>
                        {i}
                    </MenuItem>
                    )}
                    </TextField>
                </Grid>
            </Grid>
            </div>
        </Box>
        </Container>

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
        </Container>
        </Paper>
    )
}