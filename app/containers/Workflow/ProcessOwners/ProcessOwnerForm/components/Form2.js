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
  Button,
  Checkbox,
  IconButton,
  Grid,
  FormControlLabel,
  FormLabel,
  Typography,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core';
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
    boxShadow: theme.shadows[0]
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Form2 = props => {
  const classes = useStyles();
  const { loading, form, handleChange, handleSelectChange } = props;

  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <Paper className={classes.paper}>
          <Grid container spacing={1}>
            <Grid item xs>
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
            </Grid>
            <Grid item xs>
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="description"
                id="description"
                margin="normal"
                variant="outlined"
                fullWidth
                size="small"
                value={form.description}
                onChange={handleChange}
                multiline
                rows={2}
                rowsMax={4}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="center" justify="space-between">
            <Grid item xs>
              <Autocomplete
                id="process-owner"
                options={[]}
                getOptionLabel={option => option.label}
                onChange={handleSelectChange('processOwner')}
                value={form.processOwner}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    size="small"
                    placeholder="Process Owner"
                  />
                )}
              />
            </Grid>
            <Grid item xs style={{ textAlign: 'right' }}>
              <FormLabel>Status: </FormLabel>
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
            </Grid>
          </Grid>

          <TextField
            name="comment"
            label="Review/Comment"
            id="comment-review"
            margin="normal"
            variant="outlined"
            fullWidth
            size="small"
            value={form.comment}
            onChange={handleChange}
          />
        </Paper>
      </Grid>

    </Grid>
  );
};

Form2.propTypes = {
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
)(Form2);
