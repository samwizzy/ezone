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
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
  appBar: {
    position: 'relative',
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
    const {
      dob,
      fax,
      website,
      address1,
      address2,
      mobileNo,
      country,
      state,
      city,
    } = form;
    return (
      dob !== null &&
      fax.length > 0 &&
      website.length > 0 &&
      address1.length > 0 &&
      address2.length > 0 &&
      mobileNo.length > 0 &&
      country !== null &&
      state.length > 0 &&
      city.length > 0
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
      <Divider />

      <DialogContent>
        <form className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                name="mobileNo"
                label="mobile Number"
                id="outlined-mobileNo"
                fullWidth
                variant="outlined"
                size="small"
                type="number"
                value={form.mobileNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  // inputVariant="outlined"
                  label="Date"
                  size="small"
                  format="dd/MM/yyyy"
                  value={form.dob ? form.dob : ''}
                  // InputAdornmentProps={{ position: 'end' }}
                  onChange={date => handleDateChange(date)}
                  className={classes.textField}
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
                variant="outlined"
                size="small"
                value={form.fax}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="website"
                label="Website"
                id="outlined-website"
                fullWidth
                variant="outlined"
                size="small"
                value={form.website}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="address1"
                label="Address 1"
                id="outlined-address1"
                fullWidth
                variant="outlined"
                size="small"
                multiline
                row={2}
                value={form.address1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="address2"
                label="Address2"
                id="outlined-address2"
                fullWidth
                variant="outlined"
                size="small"
                multiline
                row={2}
                value={form.address2}
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
                    label="Life Stage"
                    variant="outlined"
                    placeholder="Select Country"
                    fullWidth
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
                variant="outlined"
                size="small"
                multiline
                row={2}
                value={form.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="city"
                label="City"
                id="outlined-city"
                fullWidth
                variant="outlined"
                size="small"
                multiline
                row={2}
                value={form.city}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
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
