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
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
  appBar: {
    position: 'relative',
  },
}));

export const BasicInfo = props => {
  const { handleChange, closeNewContactDialog, handleNext, form } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { firstName, lastName, phoneNumber, emailAddress } = form;
    return (
      firstName.length > 0 &&
      lastName.length > 0 &&
      phoneNumber.length > 0 &&
      emailAddress.length > 0
    );
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
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
            <Grid item xs={6}>
              <TextField
                id="lifeStage"
                name="lifeStage"
                placeholder="Select life Stage"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                label="life Stage"
                value={form.lifeStage}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lifeStage"
                name="lifeStage"
                placeholder="Select life Stage"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                label="life Stage"
                value={form.lifeStage}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lifeStage"
                name="lifeStage"
                placeholder="Select life Stage"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                label="life Stage"
                value={form.lifeStage}
                onChange={handleChange}
              >
                <MenuItem key={0} value="3">
                  No record
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewContactDialog} color="primary">
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
