import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
    flexGrow: 1
  },
  appBar: {
    position: 'static',
  },
}));

export const CampaignInfo = props => {
  const {
    employees,
    handleChange,
    handleDateChange,
    handleSelectChange,
    closeNewCampaignDialog,
    handleNext,
    form,
  } = props;
  const classes = useStyles();

  const canSubmitForm = () => {
    const { campaignOwnerName, campaignName, status, startDate, endDate, expectedRevenue, budgetCost, annualCost, supportStartDate } = form;
    return (
      campaignName !== '' &&
      campaignOwnerName !== '' &&
      startDate !== '' &&
      endDate !== ''
    );
  };

  const statuses = [
    { value: 'PLANNING', label: 'Planning' },
    { value: 'PLANNING', label: 'Planning' },
    { value: 'PLANNING', label: 'Planning' },
  ];

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">
            Campaign Information
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Autocomplete
              id="campaign-owner"
              size="small"
              options={employees ? employees : []}
              getOptionLabel={option => option.firstName + ' ' + option.lastName}
              onChange={handleSelectChange('campaignOwnerName')}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Campaign Owner"
                  variant="outlined"
                  placeholder="Select Campaign Owner"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="Type"
              label="Type"
              id="type"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.type}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="campaignName"
              label="Campaign Name"
              id="campaign-name"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.campaignName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="status"
              name="status"
              placeholder="Status"
              select
              fullWidth
              variant="outlined"
              margin="normal"
              size="small"
              label="Status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem key="" value="" disabled>
                Select status
              </MenuItem>
              {statuses.map((status, i) =>
                <MenuItem key={i} value={status.value}>
                  {status.label}
                </MenuItem>
              )}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disablePast
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                fullWidth
                size="small"
                name="startDate"
                id="start-date"
                label="Start Date"
                value={form.startDate}
                onChange={handleDateChange('startDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disablePast
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                fullWidth
                size="small"
                name="endDate"
                id="end-date"
                label="End Date"
                value={form.endDate}
                onChange={handleDateChange('endDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="expectedRevenue"
              label="Expected Revenue"
              id="expected-revenue"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.expectedRevenue}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="budgetCost"
              label="Budget Cost"
              id="budget-cost"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.budgetCost}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="annualCost"
              label="Annual Cost"
              id="annual-cost"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              value={form.annualCost}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                disablePast
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                fullWidth
                size="small"
                name="supportStartDate"
                id="support-start-date"
                label="Support Start Date"
                value={form.supportStartDate}
                onChange={handleDateChange('supportStartDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewCampaignDialog} color="primary">
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
