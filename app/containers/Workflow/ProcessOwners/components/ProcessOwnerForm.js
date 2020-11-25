/* eslint-disable no-nested-ternary */
import React, { Fragment, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {
  makeStyles,
  AppBar,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  FormLabel,
  Typography,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
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

const ProcessOwnerForm = props => {
  const classes = useStyles();

  const [options, setOptions] = useState({ phases: false });

  const [form, setForm] = useState({
    groupName: '',
    email: '',
    phases: [{ ...phaseInitialState }],
  });

  const { loading, employees, createJob, updateJob } = props;

  useEffect(() => {
  }, []);

  const addMore = event => {
    setForm({ ...form, phases: [...form.phases, phaseInitialState] });
  };

  const handleChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
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

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') });
  };

  const canSubmitForm = () => {
    return true
  }

  const handleSubmit = () => {
    createJob(form)
  }

  console.log(form, 'form');

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static" color="inherit" elevation={2}>
              <Toolbar variant="dense">
                <Typography variant="h6" className={classes.title}>
                  New Group
              </Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item md={6}>
            <Paper className={classes.paper}>
              <TextField
                name="groupName"
                label="Group Name"
                id="group-name"
                margin="normal"
                variant="outlined"
                fullWidth
                size="small"
                value={form.groupName}
                onChange={handleChange}
              />


              <FormLabel>
                <Typography variant="subtitle1">Process Owners</Typography>
              </FormLabel>

              {form.phases && form.phases.map((phase, i) =>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    <TextField
                      name="unit"
                      label="Unit"
                      id={`outlined-phase-unit-${i}`}
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      size="small"
                      value={phase.unit}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>
                  <Grid item xs>
                    <TextField
                      name="revenue"
                      label="Revenue"
                      id={`outlined-phase-revenue-${i}`}
                      fullWidth
                      margin="dense"
                      variant="outlined"
                      size="small"
                      value={phase.revenue}
                      onChange={handleRowChange(i)}
                    />
                  </Grid>

                  <Grid item xs><IconButton><CloseIcon /></IconButton></Grid>
                </Grid>
              )}
              <div className={classes.fle}>
                <Button size="small" color="primary" onClick={addMore}>Add more</Button>
              </div>

              <TextField
                name="email"
                label="CC"
                id="group-email"
                margin="normal"
                variant="outlined"
                fullWidth
                size="small"
                value={form.email}
                onChange={handleChange}
              />
            </Paper>
          </Grid>

        </Grid>
      </CardContent>

      <CardActions>
        <Button
          onClick={() => { }}
          color="primary"
          variant="contained"
          disableElevation
        >
          Cancel
        </Button>
        <Button
          onClick={() => { }}
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

ProcessOwnerForm.propTypes = {
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
)(ProcessOwnerForm);
