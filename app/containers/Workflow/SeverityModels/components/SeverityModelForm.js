/* eslint-disable no-nested-ternary */
import React, { Fragment, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  AppBar,
  Card, CardHeader, CardContent, CardActions,
  Checkbox,
  Toolbar,
  Button,
  Grid,
  FormLabel,
  FormControlLabel,
  Typography,
  TextField,
} from '@material-ui/core';
import moment from 'moment';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardContent-root': {
    },
    '& .MuiCardActions-root': {
      justifyContent: "flex-end"
    },
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const phaseInitialState = {
  phase: '',
  unit: '',
  description: '',
  expense: '',
  revenue: ''
}

const SeverityModelForm = props => {
  const classes = useStyles();

  const [options, setOptions] = React.useState({ phases: false });

  const [form, setForm] = React.useState({
    modelName: '',
    risk: null,
    module: '',
    description: '',
    baseProcessOwner: null,
    processOwner: null,
    phases: [{ ...phaseInitialState }],
    status: true
  });

  const { loading, employees, createJob, updateJob } = props;

  const canSubmitForm = () => {
    return true
  }

  const addMore = event => {
    setForm({ ...form, phases: [...form.phases, phaseInitialState] });
  };

  const removeMore = (i) => (event) => {
    setForm({ ...form, phases: form.phases.filter((phase, x) => x !== i) });
  };

  const handleChange = event => {
    const { type, checked } = event.target
    setForm({ ...form, [event.target.name]: type === 'checkbox' ? checked : event.target.value });
  };

  const handleRowChange = index => event => {
    const { phases } = form
    phases[index][event.target.name] = event.target.value
    setForm({ ...form, phases });
  };

  const handleOptionsChange = event => {
    setOptions({ ...options, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj.value });
  };

  const handleSubmit = () => {
    createJob(form)
  }

  console.log(form, 'form');

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <AppBar position="static" color="inherit" elevation={1}>
            <Toolbar variant="dense">
              <Typography variant="h6" className={classes.title}>
                New Model
              </Typography>
            </Toolbar>
          </AppBar>
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  name="modelName"
                  label="Model name"
                  id="model-name"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={form.modelName}
                  onChange={handleChange}
                />

                <TextField
                  name="description"
                  label="Description"
                  id="description"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={form.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  rowsMax={4}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  id="risk"
                  options={[]}
                  getOptionLabel={option => option.label}
                  onChange={handleSelectChange('risk')}
                  value={form.application}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Risk level"
                      variant="outlined"
                      margin="normal"
                      size="small"
                      placeholder="Risks"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <Toolbar>
          <Typography className={classes.title}></Typography>
          <FormLabel>Status: &nbsp; </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.status}
                onChange={handleChange}
                name="status"
                color="primary"
              />
            }
            label="Active"
            labelPlacement="end"
            title="Status"
          />
        </Toolbar>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Autocomplete
              id="base-process-owner"
              options={[]}
              getOptionLabel={option => option.label}
              onChange={handleSelectChange('baseProcessOwner')}
              value={form.baseProcessOwner}
              style={{ width: 250 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Base Process owner"
                  variant="outlined"
                  margin="normal"
                  size="small"
                />
              )}
            />
            <Autocomplete
              id="process-owner"
              options={[]}
              getOptionLabel={option => option.label}
              onChange={handleSelectChange('processOwner')}
              value={form.processOwner}
              style={{ width: 250 }}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Process Owner"
                  variant="outlined"
                  margin="normal"
                  size="small"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => { }}
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmitForm()}
          color="primary"
          variant="contained"
          disableElevation
        >
          Save
        </Button>
      </CardActions>
    </Card>
  );
};

SeverityModelForm.propTypes = {
  loading: PropTypes.bool,
  closeNewJobDialog: PropTypes.func,
  updateJob: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    createJob: evt => dispatch(Actions.createJob(evt)),
    updateJob: evt => dispatch(Actions.updateJob(evt)),
    closeNewJobDialog: () => dispatch(Actions.closeNewJobDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SeverityModelForm);
