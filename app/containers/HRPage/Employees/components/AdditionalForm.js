import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import _ from 'lodash';
import { AppBar, Button, CircularProgress, Grid, TextField, Typography, DialogContent, DialogActions, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

export const AdditionalForm = props => {
  const { loading, handleChange, closeNewEmployeeDialog, handleSubmit, handlePrev, form } = props
  const classes = useStyles()

  const canSubmitForm = () => {
    const { about } = form
    return about
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Additional Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-about"
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
          <Grid item xs={12}></Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewEmployeeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading ? loading : !canSubmitForm()}
          color="primary"
          endIcon={loading && <CircularProgress size={20} />}
        >
          Save
        </Button>
      </DialogActions>
    </div>
  )
}