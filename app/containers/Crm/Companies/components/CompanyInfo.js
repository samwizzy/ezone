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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
}));

export const CompanyInfo = props => {
  const {
    handleChange,
    handleSelectChange,
    handleDateChange,
    handleSelectNameChange,
    closeNewCompanyDialog,
    handleNext,
    form,
    employees,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { firstName, lastName, phoneNumber, emailAddress } = form;
    return (
      firstName !== '' &&
      lastName !== '' &&
      phoneNumber !== '' &&
      emailAddress !== ''
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

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            Company Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name="firstName"
              label="Company Name"
              id="company-name"
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
              name="emailAddress"
              label="Email"
              id="email-address"
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
            <TextField
              name="phoneNumber"
              label="Phone Number"
              id="phone-number"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="companyNumber"
              label="Company Number"
              id="company-number"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.companyNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                views={["year"]}
                disableFuture
                variant="inline"
                inputVariant="outlined"
                margin="normal"
                label="Year Registered"
                size="small"
                format="yyyy"
                value={form.regYear}
                InputAdornmentProps={{ position: 'end' }}
                onChange={handleDateChange('regYear')}
                fullWidth
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-life-stage"
              size="small"
              options={lifeStages}
              getOptionLabel={option => option.name}
              onChange={handleSelectNameChange('lifeStage')}
              value={form.lifeStage ? _.find(lifeStages, { name: form.lifeStage }) : null}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Life Stage"
                  variant="outlined"
                  placeholder="Select Life Stage"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-owner-id"
              size="small"
              options={employees ? employees : []}
              getOptionLabel={option => option.firstName + ' ' + option.lastName}
              onChange={handleSelectChange('ownerId')}
              value={form.ownerId ? _.find(employees, { id: form.ownerId }) : null}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Contact Owner"
                  variant="outlined"
                  placeholder="Select Contact Owner"
                  fullWidth
                  margin="normal"
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
              onChange={handleSelectNameChange('associationType')}
              value={form.associationType ? _.find(contactType, { name: form.associationType }) : null}
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
        <Button onClick={closeNewCompanyDialog} color="primary">
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
