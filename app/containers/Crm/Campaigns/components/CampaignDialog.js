/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeStyles,
  Backdrop,
  CircularProgress,
  Dialog,
  Slide,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import { CampaignInfo } from './CampaignInfo';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'static',
  },
  title: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  annualCost: 0,
  budgetCost: 0,
  campaignName: "",
  deleteStatus: true,
  description: "",
  endDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  expectedRevenue: 0,
  startDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
  status: "PLANNING",
  supportStartDate: moment().format('YYYY-MM-DDTHH:mm:ss.SSS')
}

const CampaignDialog = props => {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    employees,
    createCampaign,
    updateCampaign,
    closeNewCampaignDialog,
  } = props;

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState })
    }
  }, [dialog.data]);

  console.log(dialog, 'campaignDialog');

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') });
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

  const handleSubmit = () => {
    dialog.type === 'new' ? createCampaign(form) : updateCampaign(form)
  }

  console.log(form, 'form');

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        {...dialog.props}
        onClose={closeNewCampaignDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        {step === 0 && (
          <CampaignInfo
            employees={employees}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            handleDateChange={handleDateChange}
            form={form}
            closeNewCampaignDialog={closeNewCampaignDialog}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        )}
      </Dialog>
    </div>
  );
};

CampaignDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewCampaignDialog: PropTypes.func,
  updateCampaign: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectCampaignDialog(),
  employees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    createCampaign: evt => dispatch(Actions.createCampaign(evt)),
    updateCampaign: evt => dispatch(Actions.updateCampaign(evt)),
    closeNewCampaignDialog: () => dispatch(Actions.closeNewCampaignDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CampaignDialog);
