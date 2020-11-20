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
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    boxShadow: theme.shadows[0]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Form1 = props => {
  const classes = useStyles();
  const { loading, form, handleChange, handleRowChange, addMore, removeMore } = props;

  return (
    <Grid container spacing={2}>
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
            <Grid container spacing={1} alignItems="center" key={i}>
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

              <Grid item xs>{i !== 0 && <IconButton onClick={removeMore(i)}><CloseIcon /></IconButton>}</Grid>
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
  );
};

Form1.propTypes = {
  loading: PropTypes.bool
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
)(Form1);
