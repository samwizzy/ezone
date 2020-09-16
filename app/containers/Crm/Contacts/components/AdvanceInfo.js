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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Autocomplete } from '@material-ui/lab';
import CountriesAndStates from '../../../../utils/countries_states.json';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
}));

export const AdvanceInfo = props => {
  const {
    handleDateChange,
    handleChange,
    handleSelectNameChange,
    closeNewContactDialog,
    handleNext,
    handlePrev,
    form,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { dob, fax, website, address, companyNumber, country, state, city } = form;
    return (
      dob !== null && fax !== null && website !== null &&
      country !== null && state !== null
    );
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Advance Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              name="companyNumber"
              label="Company Number"
              id="outlined-company-no"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              type="number"
              value={form.companyNumber ? form.companyNumber : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disableFuture
                variant="inline"
                inputVariant="outlined"
                margin="normal"
                label="Date of Birth"
                size="small"
                format="dd/MM/yyyy"
                value={form.dob ? form.dob : ''}
                InputAdornmentProps={{ position: 'end' }}
                onChange={handleDateChange('dob')}
                fullWidth
              />
            </MuiPickersUtilsProvider>
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
            <TextField
              name="noOfEmployees"
              label="No of Employees"
              id="outlined-no-of-employees"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.noOfEmployees ? form.noOfEmployees : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="fax"
              label="Fax Number"
              id="outlined-fax"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.fax ? form.fax : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="website"
              label="Website"
              id="outlined-website"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.website ? form.website : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address"
              id="outlined-company-address"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              multiline
              row={2}
              value={form.address ? form.address : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-country"
              options={CountriesAndStates}
              getOptionLabel={option => option.name}
              value={form.country ? _.find(CountriesAndStates, { name: form.country }) : null}
              onChange={handleSelectNameChange('country')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  placeholder="Select Country"
                  fullWidth
                  margin="normal"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="state"
              label="State"
              id="outlined-state"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              multiline
              row={2}
              value={form.state ? form.state : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="city"
              label="City"
              id="outlined-city"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              multiline
              row={2}
              value={form.city ? form.city : ""}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewContactDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handlePrev} color="primary">
          Prev
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
