import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import TaxSetup from './components/TaxSetup';
import AccountSetup from './components/AccountSetup';
// import Logo from '../../../../images/Logo.svg';
import payrollBg from '../../../../images/payrollSettingImage.svg';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
    },
  },
  sideDemo: {
    backgroundColor: theme.palette.background.paper,
  },
  bgImage: {
    width: '100%',
    height: `100vh`,
    backgroundImage: `url(${payrollBg})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

const initialState = {
  taxPayerNumber: '',
  taxMethod: null,
  pensionCode: '',
  allowNHFNumber: false,
  nhfNumber: '',
  nhfOptions: {
    NHIS_Code: false,
    ITF_Number: false,
    NSITF_Number: false,
  },
  salaryReporting: '',
  taxReporting: '',
  pensionReporting: '',
  nhfReporting: '',
};

const PayrollSetup = props => {
  const { createPayrollSetup } = props;
  const [form, setForm] = useState({ ...initialState });
  const [step, setStep] = useState(0);
  const classes = useStyles(props);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCheckChange = event => {
    const { name, value, checked } = event.target;
    setForm({ ...form, [name]: { ...form[name], [value]: checked } });
  };

  const handleSelectChange = name => (event, object) => {
    setForm({ ...form, [name]: object });
  };

  const handleSubmit = event => {
    createPayrollSetup(form);
  };

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

  console.log(form, 'form accouting setup');

  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <Typography
            variant="h4"
            color="textPrimary"
            align="center"
            gutterBottom
          >
            {/*Welcome To <img src={Logo} height="30" /> Payroll*/}
            Welcome To Payroll
          </Typography>
        }
        subheader={
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            gutterBottom
          >
            Setup Your Payroll
          </Typography>
        }
      />

      <CardContent>
        <Grid container>
          <Grid item xs={6} className={classes.sideDemo}>
            <div className={classes.bgImage} />
          </Grid>

          <Grid item xs={6}>
            {step === 0 && (
              <TaxSetup
                form={form}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleChange={handleChange}
                handleCheckChange={handleCheckChange}
                handleSelectChange={handleSelectChange}
              />
            )}

            {step === 1 && (
              <AccountSetup
                form={form}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

const mapDispatchToProps = dispatch => ({
  createPayrollSetup: data => dispatch(Actions.createPayrollSetup(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PayrollSetup);
