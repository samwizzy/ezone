import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles, AppBar, Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, FormGroup, Grid, MenuItem, Slide, Popover, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  dialog: {
    width: 400
  }
}));

function Form3(props) {
  const classes = useStyles();
  const {
    closeNewFeedbackDialog,
    dialog,
    form,
    employees,
    handleNext,
    handleChange,
    handleSelectChange,
    handleDateChange,
  } = props;

  const canSubmitForm = () => {
    const { title, description, reviewers } = form
    return title.length > 0 && description.length > 0 && reviewers.length > 0
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add Review Cycle
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent dividers classes={{ root: classes.dialog }}>
        <Grid container>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-employees-reviewers"
              options={employees}
              getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
              onChange={handleSelectChange('reviewers')}
              value={form.reviewers ? form.reviewers : null}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Reviewers"
                  placeholder="Employee"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Visibility
            </Typography>
            <Typography variant="subtitle2">
              Set who you want to see this review
            </Typography>

            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={form.visibility.reviewee} onChange={handleChange} name="reviewee" />}
                label="Reviewee"
              />
              <FormControlLabel
                control={<Checkbox checked={form.visibility.hideIdentity} onChange={handleChange} name="hideIdentity" />}
                label="Hide reviewer Identity from reviewee"
              />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox checked={form.visibility.hideReplies} onChange={handleChange} name="hideReplies" />}
                label="Hide reviewer replies from other reviewers"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Timeline
            </Typography>
            <Typography variant="subtitle2">
              Reviewers will no longer be able to submit reviews after the set time
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk
                inputVariant="outlined"
                format="dd/MM/yyyy"
                margin="normal"
                fullWidth
                size="small"
                name="timeline"
                id="timeline"
                label="Timeline"
                value={form.timeline}
                onChange={handleDateChange('timeline')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={closeNewFeedbackDialog} color="primary">
          Cancel
          </Button>
        <Button onClick={handleNext} disabled={!canSubmitForm()} color="primary">
          Next
        </Button>
      </DialogActions>
    </div>
  );
}


Form3.propTypes = {
  closeNewFeedbackDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectFeedbackDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartments(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewFeedbackDialog: () => dispatch(Actions.closeNewFeedbackDialog()),
    createRecognition: (data) => dispatch(Actions.createRecognition(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Form3);
