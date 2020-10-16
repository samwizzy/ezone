import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  AppBar,
  Button,
  Grid,
  TextField,
  Typography,
  DialogContent,
  DialogActions,
  Toolbar,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

export const Form = props => {
  const { handleChange, closeNewEmployeeDialog, handleNext, form } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { firstName, lastName, phoneNumber, emailAddress, nickName } = form;
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phoneNumber.length > 0 &&
      emailAddress.length > 0
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Basic Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="Firstname"
              id="outlined-firstname"
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              value={form.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Lastname"
              id="outlined-lastname"
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              value={form.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              id="outlined-phonenumber"
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="emailAddress"
              label="Company Email"
              id="outlined-email-address"
              fullWidth
              margin="dense"
              variant="outlined"
              size="small"
              value={form.emailAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-nickname"
              name="nickName"
              label="Nickname"
              multiline
              fullWidth
              margin="dense"
              size="small"
              value={form.nickName}
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
        <Button
          onClick={handleNext}
          disabled={!canSubmitForm()}
          color="primary"
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};
