import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Button, Card, MobileStepper, Stepper, Step, StepLabel, StepButton, Divider, Slide, Typography, TextField } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import { JobDescForm } from './JobDescForm'
import { JobInfoForm } from './JobInfoForm'
import { HiringWorkFlowForm } from './HWForm'
import { BasicInfoForm } from './BasicInfoForm'
import JobOpenings from '../JobOpenings'

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
  return ['Job Description', 'Hiring Workflow', 'Job Information', /*'Basic Information'*/];
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddRecruitment(props) {
  const classes = useStyles();
  const { departments, enrollmentTypes, locations, dialog, jobOpenings, createJobOpening, openNewEmployeeTypeDialog } = props;
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const maxSteps = steps.length;
  const [form, setForm] = React.useState({
    /*
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    nickname: '',
    employeeId: '',
    dateHired: moment(new Date()).format('YYYY-MM-DD'),
    branch: '',
    employmentStatus: '',
    */

    address: '',
    country: '',
    enrollmentTypeId: '',
    locationId: '',
    departmentId: '',
    jobDescription: '',
    jobTitle: '',
    noOfVancancies: '1',
    //state: "Lagos",
    hiringSteps: [],
    submissionDeadline: moment().format('YYYY-MM-DD'),
  });

  React.useEffect(() => {
  }, [])

  const canSubmitForm = () => {
    const { address, country, departmentId, enrollmentTypeId, jobDescription, jobTitle, noOfVancancies, orgId, submissionDeadline } = form
    return address.length > 0 && country.length > 0 && departmentId && enrollmentTypeId && jobDescription.length > 0 && jobTitle.length > 0 && noOfVancancies
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  };
  const handleDateChange = (date, formatted, name) => {
    setForm(_.set({ ...form }, name, reformattedDate(date)))
  }

  const handleCountryChange = name => (event, obj) => {
    setForm(_.set({ ...form }, name, obj.label))
  }

  const handleStepChange = (event) => {
    const { name, value } = event.target
    console.log(name, "name")
    console.log(value, "value")
    form.hiringSteps.some(data => data.title === value) ?
      setForm({ ...form, [name]: form.hiringSteps.filter(step => step.title !== value) }) :
      setForm({
        ...form,
        [name]: [
          ...form.hiringSteps,
          Object.assign({}, { title: value })
        ]
      })
  }

  const handleSubmit = () => {
    createJobOpening(form);
  }

  const handleNext = () => {
    if (activeStep > -1 && activeStep < 2) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  console.log(form, "Job submit")

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <JobDescForm
            handleChange={handleChange}
            form={form}
            handleSubmit={handleSubmit}
            handleSelectChange={handleSelectChange}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        );
      case 1:
        return (
          <HiringWorkFlowForm
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleStepChange={handleStepChange}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      case 2:
        return (
          <JobInfoForm
            handleChange={handleChange}
            handleCountryChange={handleCountryChange}
            handleSelectChange={handleSelectChange}
            openNewEmployeeTypeDialog={openNewEmployeeTypeDialog}
            form={form}
            departments={departments}
            enrollmentTypes={enrollmentTypes}
            locations={locations}
            handleSubmit={handleSubmit}
          />
        );
      /*
      case 3:
        return (
          <BasicInfoForm 
            handleChange={handleChange}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      */
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
        {activeStep === steps.length ?
          handleSubmit()
            (
              <JobOpenings />)
          /*
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
          */
          : (
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
                  activeStep === steps.length - 1 ?
                    <Button size="small" onClick={handleSubmit} >
                      Finish
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                    :
                    <Button size="small" onClick={handleNext} >
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
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  enrollmentTypes: Selectors.makeSelectEnrollmentTypes(),
  locations: Selectors.makeSelectLocations(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
});

function mapDispatchToProps(dispatch) {
  return {
    createJobOpening: (ev) => dispatch(Actions.createJobOpening(ev)),
    openNewEmployeeTypeDialog: (data) => dispatch(Actions.openNewEmployeeTypeDialog(data)),
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