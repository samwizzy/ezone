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
  Toolbar,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import Form1 from './components/Form1'
import Form2 from './components/Form2'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end'
    }
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ownerInitialState = {
  name: '',
  email: '',
}

const ProcessOwnerForm = props => {
  const classes = useStyles();
  const { loading, employees, createJob, updateJob } = props;
  const [step, setStep] = useState(0);

  const [options, setOptions] = useState({ phases: false });

  const [form, setForm] = useState({
    groupName: '',
    email: '',
    processName: '',
    application: null,
    description: '',
    processOwner: null,
    comment: '',
    phases: [{ ...ownerInitialState }],
    status: true
  });

  useEffect(() => {
  }, []);

  const handleNext = () => {
    if (step > -1 && step <= 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step => 1 && step <= 1) {
      setStep(step - 1);
    }
  };

  const addMore = event => {
    setForm({ ...form, phases: [...form.phases, ownerInitialState] });
  };

  const removeMore = (i) => (event) => {
    setForm({ ...form, phases: form.phases.filter((phase, x) => x !== i) });
  };

  const handleChange = event => {
    const { type, checked } = event.target
    setForm({ ...form, [event.target.name]: type === 'checkbox' ? checked : event.target.value });
  };

  const handleRowChange = (name, i) => (event, obj) => {
    const { phases } = form
    name === "name" ? phases[i][name] = obj.fullName : phases[i][name] = obj.email;
    setForm({ ...form, phases });
  };

  const handleOptionsChange = event => {
    setOptions({ ...options, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj.value });
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
      <CardHeader
        title={
              <Typography variant="h6" className={classes.title}>
                New Group
              </Typography>
        }
      />
      <CardContent>
        {step === 0 && (
          <Form1
            form={form}
            addMore={addMore}
            removeMore={removeMore}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleRowChange={handleRowChange}
          />
        )}

        {step === 1 && (
          <Form2
            form={form}
            addMore={addMore}
            removeMore={removeMore}
            handleChange={handleChange}
            handleRowChange={handleRowChange}
            handleSelectChange={handleSelectChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
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
          onClick={handlePrev}
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Button
          onClick={step > 0 ? handleSubmit : handleNext}
          disabled={!canSubmitForm()}
          color="primary"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
        >
          {step > 0 ? "Finish" : "Next"}
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
