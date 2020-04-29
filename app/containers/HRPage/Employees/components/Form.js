import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  AppBar,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Toolbar,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));

export const Form = props => {
  const { handleChange, closeNewEmployeeDialog, handleSubmit, form } = props;
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
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Basic Information
          </Typography>
        </Toolbar>
      </AppBar>

      <Divider />

      <DialogContent>
        <form className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="Firstname"
                id="outlined-title"
                fullWidth
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
                id="outlined-title"
                fullWidth
                variant="outlined"
                size="small"
                value={form.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="phoneNumber"
                label="Mobile Number"
                id="outlined-title"
                fullWidth
                variant="outlined"
                size="small"
                value={form.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="emailAddress"
                label="Email"
                id="outlined-title"
                fullWidth
                variant="outlined"
                size="small"
                value={form.emailAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-desc"
                name="nickName"
                label="Nickname"
                multiline
                fullWidth
                size="small"
                value={form.nickName}
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
        <Button
          onClick={handleSubmit}
          disabled={!canSubmitForm()}
          color="primary"
        >
          Next
        </Button>
      </DialogActions>
    </div>
  );
};
