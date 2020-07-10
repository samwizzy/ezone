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
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
  dialogPaper: {
    minHeight: '100%',
    maxHeight: '100%',
  },
}));

export const BasicInfo = props => {
  const {
    handleChange,
    handleSelectLifeStage,
    handleSelectOwnerId,
    handleSelectAssociateId,
    closeNewContactDialog,
    handleNext,
    form,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { firstName, lastName, phoneNumber, emailAddress } = form;
    return (
      firstName !== null &&
      lastName !== null &&
      phoneNumber !== null &&
      emailAddress !== null
    );
  };

  const lifeStages = [
    { id: '1', name: 'SUBSCRIBER' },
    { id: '2', name: 'LEAD' },
    { id: '3', name: 'OPPORTUNITY' },
  ];

  const contactType = [
    { id: '1', name: 'CUSTOMER' },
    { id: '2', name: 'VENDOR' },
  ];

  // console.log(form, 'form');
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
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
              margin="normal"
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
              margin="normal"
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
              id="outlined-phone-number"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              type="number"
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
              margin="normal"
              variant="outlined"
              size="small"
              type="email"
              value={form.emailAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-life-stage"
              size="small"
              options={lifeStages}
              getOptionLabel={option => option.name}
              onChange={(evt, value) => handleSelectLifeStage(evt, value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Life Stage"
                  variant="outlined"
                  placeholder="Select Life Stage"
                  fullWidth
                  margin="normal"
                  name="lifeStage"
                  value={form.lifeStage}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-owner-id"
              size="small"
              options={contactType}
              getOptionLabel={option => option.name}
              onChange={(evt, value) => handleSelectOwnerId(evt, value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Contact Owner"
                  variant="outlined"
                  placeholder="Select Contact Owner"
                  fullWidth
                  margin="normal"
                  name="ownerId"
                  value={form.ownerId}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="combo-association-type"
              size="small"
              options={contactType}
              getOptionLabel={option => option.name}
              onChange={(evt, value) => handleSelectAssociateId(evt, value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Select Association Type"
                  variant="outlined"
                  placeholder="Select Association Type"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
        </Grid>
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
