import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {Button, Divider, Grid, MenuItem, TextField, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

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
        const {jobDesc, about } = form
        return jobDesc.length > 0 && about.length > 0
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
                    name="jobDesc"
                    label="Job Description"
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    value={form.jobDesc}
                    onChange={handleChange}
                    variant="outlined"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-desc"
                    name="about"
                    label="Bio"
                    multiline
                    fullWidth
                    rows="4"
                    rowsMax="4"
                    value={form.about}
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