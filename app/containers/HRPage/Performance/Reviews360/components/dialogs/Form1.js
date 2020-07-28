import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Popover, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

function Form1(props) {
  const classes = useStyles();
  const {
    closeNewFeedbackDialog,
    dialog,
    form,
    employees,
    handleNext,
    handleChange,
    handleSelectChange,
  } = props;

  const canSubmitForm = () => {
    const { title, description, reviwees } = form
    return title.length > 0 && description.length > 0 && reviwees.length > 0
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

      <DialogContent dividers>
        <Grid container>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-employees-reviewee"
              options={employees}
              getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
              onChange={handleSelectChange('reviwees')}
              value={form.reviwees ? form.reviwees : null}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Reviewee"
                  placeholder="Employee"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="title"
              name="title"
              placeholder="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
              label="Title"
              value={form.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="description"
              name="description"
              placeholder="Description"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              size="small"
              label="Description"
              value={form.description}
              onChange={handleChange}
            />
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


Form1.propTypes = {
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
)(Form1);
