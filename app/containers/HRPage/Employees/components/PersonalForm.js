import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete'
import { AppBar, Button, Grid, MenuItem, TextField, Typography, DialogContent, DialogActions, Toolbar } from '@material-ui/core';
import Countries from '../../../../utils/countries_states.json'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

export const PersonalForm = props => {
  const { handleChange, handleDateChange, handleSelectChange, closeNewEmployeeDialog, handleNext, handlePrev, form } = props
  const classes = useStyles()

  const canSubmitForm = () => {
    const { maritalStatus, gender, address } = form
    return maritalStatus && gender.length > 0 && address.length > 0
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Personal Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              id="marital-status"
              name="maritalStatus"
              placeholder="Select marital status"
              select
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              label="Marital Status"
              value={form.maritalStatus ? form.maritalStatus : ''}
              onChange={handleChange}
            >
              <MenuItem key={0} value="Single">
                Single
              </MenuItem>
              <MenuItem key={1} value="Married">
                Married
              </MenuItem>
              <MenuItem key={2} value="Divorced">
                Divorced
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="gender"
              name="gender"
              placeholder="Select your gender"
              select
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              label="Gender"
              value={form.gender}
              onChange={handleChange}
            >
              <MenuItem key={0} value="Male">
                Male
              </MenuItem>
              <MenuItem key={1} value="Female">
                Female
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disableFuture
                format="MM/dd/yyyy"
                inputVariant="outlined"
                format="MM/dd/yyyy"
                margin="normal"
                size="small"
                fullWidth
                name="dateOfBirth"
                id="date-picker-startDate2"
                label="Date Of Birth"
                value={form.dob}
                onChange={(date) => handleDateChange(date, 'dob')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="mobileNo"
              label="Mobile Number"
              id="outlined-mobile-no"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.mobileNo}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="combo-box-countries"
              size="small"
              options={Countries}
              getOptionLabel={option => option.name}
              getOptionSelected={option => option.name === form.country}
              value={form.country ? _.find(Countries, { name: form.country }) : null}
              onChange={handleSelectChange('country')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Countries"
                  variant="outlined"
                  placeholder="Search"
                  margin="normal"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-box-state"
              size="small"
              options={form.country ? _.find(Countries, { name: form.country }).states : []}
              getOptionLabel={option => option}
              onChange={handleSelectChange('state')}
              value={form.state}
              renderInput={params => (
                <TextField
                  {...params}
                  label="State"
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
              name="city"
              label="City"
              id="outlined-city"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.city}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-address"
              name="address"
              label="Address"
              multiline
              fullWidth
              margin="normal"
              rows="2"
              rowsMax="3"
              value={form.address}
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
    </div>
  )
}