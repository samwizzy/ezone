import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {Button, Card, MobileStepper, Stepper, Step, StepLabel, StepButton, Divider, Slide, Typography, TextField } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import {JobDescForm} from './JobDescForm'
import {JobInfoForm} from './JobInfoForm'
import {HiringWorkFlowForm} from './HWForm'
import {BasicInfoForm} from './BasicInfoForm'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  card: {
    minWidth: '100%'
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Job Description', 'Hiring Workflow', 'Job Information', 'Basic Information'];
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddRecruitment(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const maxSteps = steps.length;
  const [form, setForm] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    nickname: '',
    employeeId: '',
    dateHired: moment(new Date()).format('YYYY-MM-DD'),
    branch: '',
    employmentStatus: '',
    employmentType: '',
    department: '',
    reportTo: '',
    payRate: '',
    payType: '',
    role: '',
    dateOfBirth: moment(new Date('01-01-1980')).format('YYYY-MM-DD'),
    maritalStatus: '',
    gender: '',
    address: '',
    jobDescription: '',
    bio: '',
  });

  React.useEffect(() => {
  }, [])

  const canSubmitForm = () => {
    const { employeeId, role, department, branch, employmentType, employmentStatus, payRate, payType } = form
    return employeeId.length > 0 && role.length > 0 && department.length > 0 && branch.length > 0 && employmentType.length > 0
    && employmentStatus.length > 0 && payRate.length > 0 && payType.length > 0  
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }

  const handleSubmit = () => {
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <JobDescForm 
            handleChange={handleChange}
            form={form}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        );
      case 1:
        return (
          <HiringWorkFlowForm 
            handleChange={handleChange}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <JobInfoForm 
            handleChange={handleChange}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      case 3:
        return (
          <BasicInfoForm 
            handleChange={handleChange}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Card className={classes.instructions}>{getStepContent(activeStep)}</Card>
            {/* <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */}
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}


AddRecruitment.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddRecruitment);