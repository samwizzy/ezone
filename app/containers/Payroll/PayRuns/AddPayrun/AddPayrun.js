import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Button,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography,
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NewPayrun from './components/NewPayrun';
import AddEmployees from './components/AddEmployees';
import moment from 'moment';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
    },
  },
}));

const initialState = {
  payrunName: '',
  payrunType: null,
  paymentDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  fromDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  toDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
};

const AddPayrun = props => {
  const { loading, createPayrun } = props;
  const [form, setForm] = useState({ ...initialState });
  const [step, setStep] = useState(0);
  const classes = useStyles(props);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleDateChange = name => (date, value) => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  }

  const handleCheckChange = event => {
    const { name, value, checked } = event.target;
    setForm({ ...form, [name]: { ...form[name], [value]: checked } });
  };

  const handleSelectChange = name => (event, object) => {
    setForm({ ...form, [name]: object });
  };

  const handleSubmit = event => {
    createPayrun(form);
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

  const canSubmitValues = () => {
    const { payrunName, payrunType, paymentDate, fromDate, toDate } = form;
    return (payrunName.length > 0 && payrunType && paymentDate && fromDate && toDate);
  };

  console.log(form, 'form payroll setup');

  return (
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{ variant: 'h6' }}
        title="New Pay Run"
        subheader=""
      />

      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            {step === 0 && (
              <NewPayrun
                form={form}
                handleNext={handleNext}
                handlePrev={handlePrev}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleCheckChange={handleCheckChange}
                handleSelectChange={handleSelectChange}
              />
            )}

            {step === 1 && (
              <AddEmployees
                form={form}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleSelectChange={handleSelectChange}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        {step !== 0 && (
          <Button
            onClick={handlePrev}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading ? !canSubmitValues() : canSubmitValues()}
            startIcon={loading ? <CircularProgress size={20} /> : <ArrowBackIcon />}
          >
            Back
          </Button>
        )}

        <Button
          onClick={handleNext}
          color="inherit"
          variant="contained"
          disableElevation
          endIcon={<ArrowForwardIcon />}
        >
          Save & Next
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

const mapDispatchToProps = dispatch => ({
  createPayrun: data => dispatch(Actions.createPayrun(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPayrun);
