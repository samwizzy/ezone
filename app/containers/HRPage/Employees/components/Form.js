import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  Button,
  Grid,
  MenuItem,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
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
    const { firstName, lastName, mobileNo, email, nickName } = form;
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      mobileNo.length > 0 &&
      email.length > 0
    );
  };

  return (
    <div>
      <DialogTitle id="alert-dialog-slide-title">Basic Information</DialogTitle>
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
                name="mobileNo"
                label="Mobile Number"
                id="outlined-title"
                fullWidth
                variant="outlined"
                size="small"
                value={form.mobileNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="email"
                label="Email"
                id="outlined-title"
                fullWidth
                variant="outlined"
                size="small"
                value={form.email}
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
