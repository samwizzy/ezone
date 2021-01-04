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
import moment from 'moment';
import FinancialYearSetup from './components/FinancialYearSetup';
import BusinessActivity from './components/BusinessActivity';
import SetChartOfAccount from './components/SetChartOfAccount';
import Logo from '../../../../images/logo.svg';
import accSettingDemo2 from '../../../../images/accSettingDemo2.svg';
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
    backgroundImage: `url(${accSettingDemo2})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

const initialState = {
  accountChart: 'CREATE',
  accountMethod: 'ACCURAL',
  businessTypeId: null,
  currencyId: null,
  multiCurrency: true,
  orgId: '',
  startDay: 1,
  startMonth: 1,
};

const AccountSetup = props => {
  const { createAccountingSetup } = props;
  const [form, setForm] = useState({ ...initialState });
  const [step, setStep] = useState(0);
  const classes = useStyles(props);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, object) => {
    setForm({ ...form, [name]: object ? object.id : object });
  };

  const handleDateChange = name => date => {
    if (name === 'startDay')
      setForm({ ...form, [name]: moment(date).format('DD') });
    else setForm({ ...form, [name]: moment(date).format('MM') });
  };

  const handleSubmit = event => {
    createAccountingSetup(form);
  };

  const handleNext = () => {
    if (step > -1 && step <= 2) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step => 1 && step <= 2) {
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
            Welcome To <img src={Logo} height="30" /> Accounting
          </Typography>
        }
        subheader={
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            gutterBottom
          >
            Setup Your Accounting Structure
          </Typography>
        }
      />

      <CardContent>
        <Grid container>
          <Grid item xs={6} className={classes.sideDemo}>
            {step < 2 && <div className={classes.bgImage} />}
          </Grid>

          <Grid item xs={step < 2 ? 6 : 12}>
            {step === 0 && (
              <FinancialYearSetup
                form={form}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleSelectChange={handleSelectChange}
              />
            )}

            {step === 1 && (
              <SetChartOfAccount
                form={form}
                handleChange={handleChange}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}

            {step === 2 && (
              <BusinessActivity
                form={form}
                handleChange={handleChange}
                handlePrev={handlePrev}
                handleSubmit={handleSubmit}
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
  createAccountingSetup: data => dispatch(Actions.createAccountingSetup(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountSetup);
