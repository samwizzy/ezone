import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete'
import {AppBar, Button, Divider, Grid, MenuItem, TextField, Typography, DialogTitle, DialogContent, DialogActions, Toolbar} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
    },
}));

export const PersonalForm = props => {
    const {handleChange, handleDateChange, handleSelectChange, closeNewEmployeeDialog, handleSubmit, handlePrev, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {maritalStatus, gender, address } = form
        return maritalStatus.length > 0 && gender.length > 0 && address.length > 0
    }

    return (
        <div>
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Personal Information
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
        <form className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField
                    id="maritalStatus"
                    name="maritalStatus"
                    placeholder="Select marital status"
                    select
                    fullWidth
                    className={classes.textField}
                    variant="outlined"
                    size="small"
                    label="Marital Status"
                    value={form.maritalStatus}
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
                    className={classes.textField}
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
                            disableToolbar
                            disableFuture
                            format="MM/dd/yyyy"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            margin="normal"
                            size="small"
                            fullWidth
                            name="dateOfBirth"
                            id="date-picker-startDate"
                            label="Date Of Birth"
                            value={form.dob}
                            onChange={(date, formatted) => handleDateChange(date, formatted, 'dob')}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  name="Website"
                  label="Website"
                  id="outlined-website"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.website}
                  onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  name="email"
                  label="Other Email"
                  id="outlined-email"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.otherEmail}
                  onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    size="small"
                    options={[]}
                    getOptionLabel={option => option.label}
                    onChange={(evt, value) => handleSelectChange(evt, value)}
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
                    id="combo-box-demo"
                    size="small"
                    options={[]}
                    getOptionLabel={option => option.label}
                    onChange={(evt, value) => handleSelectChange(evt, value)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="City"
                        variant="outlined"
                        placeholder="Search"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  name="postalCode"
                  label="Postal code"
                  id="outlined-postal-code"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.postalCode}
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
                  rows="4"
                  rowsMax="4"
                  value={form.address}
                  onChange={handleChange}
                  variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-multiline-address2"
                    name="address2"
                    label="Address2"
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    value={form.address2}
                    onChange={handleChange}
                    variant="outlined"
                  />
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
        </div>
    )
}