import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {Button, Grid, MenuItem, TextField, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 0)
      },
    },
}));

export const PersonalForm = props => {
    const {handleChange, handleDateChange, closeNewEmployeeDialog, handleSubmit, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {maritalStatus, gender, address } = form
        return maritalStatus.length > 0 && gender.length > 0 && address.length > 0
    }

    return (
        <div>
         <DialogTitle id="alert-dialog-slide-title">
          Personal Information
        </DialogTitle>
        <Divider />   

        <DialogContent>
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
                    <MenuItem key={0} value="2">
                        No record
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
                    <MenuItem key={0} value="1">
                        No record
                    </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-desc"
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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
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
            </Grid>
        </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewEmployeeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Next
          </Button>
        </DialogActions>
        </div>
    )
}