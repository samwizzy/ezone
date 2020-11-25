import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  makeStyles,
  Button,
  Checkbox,
  Divider,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
  Icon,
  Table, TableBody, TableRow, TableCell,
  TextField,
  Typography,
} from '@material-ui/core';
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {},
  table: {
    '& tr': {
      verticalAlign: "top"
    }
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    '& p': {
      marginRight: theme.spacing(2)
    },
    '& hr': {
      margin: theme.spacing(0, 0.5)
    }
  }
}));

const stepTypes = [
  {value: 'approve/reject', label: 'Approve/Reject'},
  {value: 'approve/reject', label: 'Approve/Reject'},
];

const escalations = [
  {value: 'low', label: 'Low'},
  {value: 'high', label: 'High'},
  {value: 'critical', label: 'Critical'},
]

const Form1 = props => {
  const classes = useStyles(props);
  const { loading, dialog, form, handleChange, handleSelectChange, handleDateChange, closeNewStepDialog } = props;

  const canSubmitForm = () => {
    const { stepName, stepType, processOwner } = form;
    return (
      stepName.length > 0 && stepType && processOwner
    );
  };

  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          id="step-name"
          name="stepName"
          label="Step name"
          variant="outlined"
          value={form.stepName}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="step-type"
          size="small"
          options={stepTypes}
          getOptionLabel={option => option.label}
          onChange={handleSelectChange('stepType')}
          value={form.stepType}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
              label="Step Type"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="process-owner"
          size="small"
          options={[]}
          getOptionLabel={option => option.label}
          onChange={handleSelectChange('processOwner')}
          value={form.processOwner}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
              label="Process Owner"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="event"
          name="event"
          label="Event"
          variant="outlined"
          value={form.event}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Actions</Typography>
        <Table className={classes.table}>
          <TableBody>
            <TableRow>
              <TableCell><Icon>calendar_today</Icon></TableCell>
              <TableCell>
                <div className={classes.flex}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      inputVariant="outlined"
                      id="action-time-date"
                      label="Action Time"
                      size="small"
                      format="dd/MM/yyyy"
                      value={form.actionTime}
                      onChange={handleDateChange('actionTime')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>

                  <Divider orientation="vertical" flexItem />

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      inputVariant="outlined"
                      id="action-time-time"
                      label="Time"
                      size="small"
                      style={{width: 120 }}
                      value={form.actionTime}
                      onChange={handleDateChange('actionTime')}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                      keyboardIcon={<ScheduleIcon />}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><Icon>notifications_none</Icon></TableCell>
              <TableCell>
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Delay reminder</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.reminder.oneTime}
                          onChange={handleChange}
                          name="reminder"
                          value="oneTime"
                          color="primary"
                        />
                      }
                      label="One Time"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.reminder.repeat}
                          onChange={handleChange}
                          name="reminder"
                          value="repeat"
                          color="primary"
                        />
                      }
                      label="Repeat"
                    />
                  </FormGroup>
                </FormControl>

                <Grid container component="label" spacing={1} alignItems="center">
                  <Grid item xs><Typography>One-time reminder after</Typography></Grid>
                  <Grid item xs>
                    <TextField
                      id="days"
                      name="days"
                      label={form.days}
                      variant="outlined"
                      value={form.days}
                      onChange={handleChange}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs>
                    <Autocomplete
                      id="unit"
                      size="small"
                      options={['day(s)', 'week(s)', 'month(s)', 'year(s)']}
                      getOptionLabel={option => option}
                      onChange={handleSelectChange('unit')}
                      value={form.unit}
                      renderInput={params => (
                        <TextField
                          {...params}
                          InputLabelProps={{
                            shrink: false,
                          }}
                          variant="outlined"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs><Typography>from the reviewer trigger date.</Typography></Grid>
                </Grid>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography>Select processes to be automatically triggered when action is performed.</Typography>

                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.triggerType.emailAlert}
                          onChange={handleChange}
                          name="triggerType"
                          value="emailAlert"
                          color="primary"
                        />
                      }
                      label={
                        <div className={classes.flex}>
                          <Typography>Email Alert</Typography>
                          <Typography component={Link} to="#">Change message</Typography>
                        </div>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.triggerType.statusChange}
                          onChange={handleChange}
                          name="triggerType"
                          value="statusChange"
                          color="primary"
                        />
                      }
                      label="Process status change"
                    />
                  </FormGroup>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>

      <Grid item xs={6}>
        <Autocomplete
          id="next-accepted"
          size="small"
          options={[]}
          getOptionLabel={option => option.label}
          onChange={handleSelectChange('nextAccepted')}
          value={form.nextAccepted}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
              label="Next step if Accepted"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="next-rejected"
          size="small"
          options={[]}
          getOptionLabel={option => option.label}
          onChange={handleSelectChange('nextRejected')}
          value={form.nextRejected}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
              label="Next step if Rejected"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Autocomplete
          id="escalation"
          size="small"
          options={escalations}
          getOptionLabel={option => option.label}
          onChange={handleSelectChange('escalation')}
          value={form.escalation}
          renderInput={params => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: false,
              }}
              label="Escalation"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

Form1.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewStepDialog: () => dispatch(Actions.closeNewStepDialog()),
    createAllowance: data => dispatch(Actions.createAllowance(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Form1);
