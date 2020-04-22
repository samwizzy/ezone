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
import { Autocomplete } from '@material-ui/lab';

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
      firstName.length > 0 &&
      lastName.length > 0 &&
      phoneNumber.length > 0 &&
      emailAddress.length > 0
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

  console.log(form, 'form');
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
                variant="outlined"
                size="small"
                type="email"
                value={form.emailAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-lifeStage"
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
                    name="lifeStage"
                    value={form.lifeStage}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="combo-ownerId"
                options={contactType}
                getOptionLabel={option => `${option.name} ${option.name}`}
                onChange={(evt, value) => handleSelectOwnerId(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Contact Owner"
                    variant="outlined"
                    placeholder="Select Contact Owner"
                    fullWidth
                    name="ownerId"
                    value={form.ownerId}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                id="combo-associationType"
                options={contactType}
                getOptionLabel={option => `${option.name}`}
                onChange={(evt, value) => handleSelectAssociateId(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Association Type"
                    variant="outlined"
                    placeholder="Select Association Type"
                    fullWidth
                  />
                )}
              />
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
