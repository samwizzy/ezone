import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import {
  makeStyles,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  Slide,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import Form1 from './components/Form1'
import Form2 from './components/Form2'

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  stepName: '',
  stepType: null,
  processOwner: null,
  event: '',
  actionTime: moment().format('YYYY-MM-DDTHH:mm:ss'),
  from: '',
  to: [],
  cc: '',
  subject: '',
  message: '',
  nextAccepted: null,
  nextRejected: null,
  escalation: null,
  reminder: {
    oneTime: false,
    repeat: false,
  },
  triggerType: {
    emailAlert: false,
    statusChange: false,
  },
  days: 2,
  unit: 'day(s)',
};

const types = [
  { label: 'Fixed amount', value: 'Fixed amount' },
  { label: 'Amount', value: 'Amount' },
  { label: 'Percentage', value: 'Percentage' },
]

const StepDialog = props => {
  const classes = useStyles(props);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ ...initialState });

  const { loading, dialog, closeNewStepDialog, createAllowance } = props;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data]);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    name === "reminder" || name === "triggerType" ?
      setForm({ ...form, [name]: type === 'checkbox' ? { ...form[name], [value]: checked } : value })
      :
      setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj ? obj : obj })
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') })
  }

  const handleSubmit = () => {
    dialog.type === 'new' ? createAllowance(form) : '';
  };

  const handleNext = () => {
    if (step >= 0 && step <= 1) {
      setStep(step + 1)
    }
  }
  const handlePrev = () => {
    if (step >= 0 && step <= 1) {
      setStep(step - 1)
    }
  }

  const canSubmitForm = () => {
    const { name, value, inputType } = form;
    return true
  };

  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewStepDialog}
        keepMounted
        TransitionComponent={Transition}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-asset-title">
          {dialog.type === 'new' ? 'Add Step' : 'Edit Step'}
        </DialogTitle>

        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              {step === 0 &&
                <Form1
                  form={form}
                  dialog={dialog}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  handleDateChange={handleDateChange}
                />
              }

              {step === 1 &&
                <Form2
                  form={form}
                  dialog={dialog}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                />
              }
            </Grid>
          </Grid>

        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            onClick={closeNewStepDialog}
            disableElevation
          >
            Cancel
          </Button>
          {step > 0 &&
            <Button
              variant="contained"
              onClick={handlePrev}
              color="primary"
              disableElevation
              disabled={loading ? loading : !canSubmitForm()}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          }
          <Button
            variant="contained"
            onClick={step > 0 ? handleSubmit : handleNext}
            color="primary"
            disableElevation
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
          >
            {step < 1 ? "Next" : (dialog.type === 'edit' ? 'Update' : 'Save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

StepDialog.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectStepDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewStepDialog: () => dispatch(Actions.closeNewStepDialog()),
    createAllowance: data => dispatch(Actions.createAllowance(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(StepDialog);
