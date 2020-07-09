/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import EzoneUtils from './../../../../../utils/EzoneUtils';
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
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import { BasicInfo } from './BasicInfo';
import { AdvanceInfo } from './AdvanceInfo';
import { SocialInfo } from './SocialInfo';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'static',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
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
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  mobileNo: '',
  lifeStage: '',
  associationType: '',
  contactGroup: '',
  contactGroupId: 1,
  contactSource: '',
  address1: '',
  address2: '',
  country: '',
  state: '',
  city: '',
  fax: '',
  dob: moment(new Date()).format('YYYY-MM-DD'),
  image: null,
  notes: '',
  ownerId: '',
  type: 'INDIVIDUAL',
  website: '',
}

const LeadDialog = props => {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    createLead,
    updateLead,
    closeNewLeadDialog,
  } = props;

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, value) => {
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') });
  }

  const uploadFileAction = file => {
    setForm({ ...form, image: file });
  }

  const handleNext = () => {
    if (step > -1 && step <= 2) {
      setStep(step + 1);
    }
  }

  const handlePrev = () => {
    if (step => 1 && step <= 2) {
      setStep(step - 1);
    }
  }

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...dialog.data });
    } else {
      setForm({ ...initialState })
    }
  }, [dialog]);

  console.log(form, 'form');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewLeadDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        {step === 0 && (
          <BasicInfo
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            form={form}
            closeNewLeadDialog={closeNewLeadDialog}
            handleNext={handleNext}
          />
        )}
        {step === 1 && (
          <AdvanceInfo
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            form={form}
            closeNewLeadDialog={closeNewLeadDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 2 && (
          <SocialInfo
            handleSelectChange={handleSelectChange}
            handleChange={handleChange}
            form={form}
            closeNewLeadDialog={closeNewLeadDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
      </Dialog>
    </div>
  );
};

LeadDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewLeadDialog: PropTypes.func,
  updateLead: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectLeadDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    createLead: evt => dispatch(Actions.createLead(evt)),
    updateLead: evt => dispatch(Actions.updateLead(evt)),
    closeNewLeadDialog: () => dispatch(Actions.closeNewLeadDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LeadDialog);
