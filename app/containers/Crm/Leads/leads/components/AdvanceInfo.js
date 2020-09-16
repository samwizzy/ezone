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
import CountriesAndStates from '../../../../../utils/countries_states.json';

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
    handleSelectCountry,
    closeNewContactDialog,
    handleNext,
    handlePrev,
    form,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { dob, fax, website, address1, address2, mobileNo, country, state, city } = form;
    return (
      dob !== null && fax !== null && website !== null &&
      address1 !== null && address2 !== null && mobileNo !== null &&
      country !== null && state !== null && city !== null
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
              name="mobileNo"
              label="Mobile Number"
              id="outlined-mobile-no"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              type="number"
              value={form.mobileNo ? form.mobileNo : ""}
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
                onChange={date => handleDateChange(date)}
                fullWidth
              />
            </MuiPickersUtilsProvider>
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
          <Grid item xs={6}>
            <TextField
              name="address1"
              label="Address 1"
              id="outlined-address1"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              multiline
              row={2}
              value={form.address1 ? form.address1 : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="address2"
              label="Address2"
              id="outlined-address2"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              multiline
              row={2}
              value={form.address2 ? form.address2 : ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="combo-country"
              options={CountriesAndStates}
              getOptionLabel={option => option.name}
              onChange={(evt, value) => handleSelectCountry(evt, value)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  placeholder="Select Country"
                  fullWidth
                  margin="normal"
                  name="country"
                  size="small"
                  value={form.country}
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
