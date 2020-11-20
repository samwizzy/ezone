/* eslint-disable no-nested-ternary */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  Table, TableBody, TableRow, TableCell,
  Typography,
  Paper,
  TextField,
} from '@material-ui/core';
import moment from 'moment';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardContent-root': {
      marginBottom: theme.spacing(1)
    },
    '& .MuiCardActions-root': {
      justifyContent: "flex-end"
    },
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const stepInitialState = {
  stepName: '',
  stepType: '',
}

const WorkflowRuleForm = props => {
  const classes = useStyles();

  const [options, setOptions] = useState({ steps: false });

  const [form, setForm] = useState({
    processName: '',
    application: null,
    module: '',
    description: '',
    endDate: moment().format('YYYY-MM-DD'),
    steps: [{ ...stepInitialState }],
  });

  const { loading, employees, createJob, updateJob, openNewStepDialog } = props;

  const canSubmitForm = () => {
    return true
  }

  const addMore = event => {
    setForm({ ...form, steps: [...form.steps, stepInitialState] });
  };

  const removeMore = (i) => (event) => {
    setForm({ ...form, steps: form.steps.filter((phase, x) => x !== i) });
  };

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleRowChange = index => event => {
    const { steps } = form
    steps[index][event.target.name] = event.target.value
    setForm({ ...form, steps });
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
                New Workflow
              </Typography>
            </Toolbar>
          </AppBar>
        }
      />
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  name="processName"
                  label="Process Name"
                  id="process-name"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={form.processName}
                  onChange={handleChange}
                />

                <TextField
                  name="module"
                  label="Module"
                  id="module"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={form.module}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <Autocomplete
                  id="application"
                  options={[]}
                  getOptionLabel={option => option.label}
                  onChange={handleSelectChange('application')}
                  value={form.application}
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant="outlined"
                      margin="normal"
                      size="small"
                      placeholder="Application"
                    />
                  )}
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
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      <CardContent>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>Steps</Typography>
          <Button variant="contained" color="inherit" onClick={openNewStepDialog} disableElevation>Add Step</Button>
        </Toolbar>

        <Table>
          <TableBody>
            {form.steps.map((item, i) =>
              <TableRow key={i}>
                <TableCell>Step Name</TableCell>
                <TableCell>Step Type</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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

WorkflowRuleForm.propTypes = {
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
    openNewStepDialog: () => dispatch(Actions.openNewStepDialog()),
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
)(WorkflowRuleForm);
