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

export const AdditionalForm = props => {
    const {handleChange, closeNewEmployeeDialog, handleSubmit, form} = props
    const classes = useStyles()

    const canSubmitForm = () => {
        const {jobDescription, bio } = form
        return jobDescription.length > 0 && bio.length > 0
    }

    return (
        <div>
        <DialogTitle id="alert-dialog-slide-title">
          Additional Information
        </DialogTitle>
        <Divider />  
        
        <DialogContent>
        <form className={classes.root}>
            <Grid container spacing={1}>
                
                <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-desc"
                    name="jobDescription"
                    label="Job Description"
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    value={form.jobDescription}
                    onChange={handleChange}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-desc"
                    name="bio"
                    label="Bio"
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    value={form.bio}
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
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Save
          </Button>
        </DialogActions>
        </div>
    )
}