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
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
}));

export const OtherInfo = props => {
  const {
    handleDateChange,
    handleChange,
    handleSelectCountry,
    closeNewCompanyDialog,
    handleNext,
    handlePrev,
    form,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { fax, website, address1, mobileNo } = form;
    return fax !== '' && website !== '' && address1 !== '' && mobileNo !== '';
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            Other Information
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
              variant="outlined"
              size="small"
              type="number"
              value={form.mobileNo}
              onChange={handleChange}
            />
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
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewCompanyDialog} color="primary">
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
