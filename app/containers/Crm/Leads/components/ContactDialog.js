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
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { BasicInfo } from './BasicInfo';
import { AdvanceInfo } from './AdvanceInfo';
import { UtilityInfo } from './UtilityInfo';
import { ImageUpload } from './ImageUpload';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
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

const ContactDialog = props => {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    contactDialog,
    createNewContact,
    updateContact,
    closeNewContactDialog,
    closeEditEmployeeDialogAction,
    contactGroups
  } = props;

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectLifeStage = (evt, value) => {
    setForm({ ...form, lifeStage: value.name });
  };
  const handleSelectOwnerId = (evt, value) => {
    setForm({ ...form, ownerId: value.id });
  };
  const handleSelectAssociateId = (evt, value) => {
    setForm({ ...form, associationType: value.name });
  };
  const handleSelectCountry = (evt, value) => {
    setForm({ ...form, country: value.name });
  };
  const handleSelectContactGroup = (evt, value) => {
    setForm({ ...form, contactGroup: value.id });
  };
  const handleSelectContactSource = (evt, value) => {
    setForm({ ...form, contactSource: value.id });
  };

  const uploadFileAction = file => {
    setForm({ ...form, image: file });
  };

  const handleNext = () => {
    if (step > -1 && step <= 3) {
      setStep(step + 1);
    }
  };

  const handleDateChange = date => {
    setForm({ ...form, dob: moment(date).format('YYYY-MM-DD') });
  };

  const handlePrev = () => {
    if (step => 1 && step <= 3) {
      setStep(step - 1);
    }
  };

  React.useEffect(() => {
    if (contactDialog.type === 'edit') {
      setForm({ ...contactDialog.data });
    } else {
      setForm({ ...initialState })
    }
  }, [contactDialog.data]);

  // console.log(contactDialog, 'contactDialog');
  console.log(form, 'form');

  return (
    <div>
      <Dialog
        {...contactDialog.props}
        onClose={closeNewContactDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        {step === 0 && (
          <BasicInfo
            handleChange={handleChange}
            handleSelectLifeStage={handleSelectLifeStage}
            handleSelectOwnerId={handleSelectOwnerId}
            handleSelectAssociateId={handleSelectAssociateId}
            form={form}
            closeNewContactDialog={closeNewContactDialog}
            handleNext={handleNext}
          />
        )}
        {step === 1 && (
          <AdvanceInfo
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSelectCountry={handleSelectCountry}
            form={form}
            closeNewContactDialog={closeNewContactDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 2 && (
          <UtilityInfo
            handleSelectContactGroup={handleSelectContactGroup}
            handleSelectContactSource={handleSelectContactSource}
            handleChange={handleChange}
            form={form}
            contactGroups={contactGroups}
            closeNewContactDialog={closeNewContactDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 3 && (
          <ImageUpload
            contactDialog={contactDialog}
            updateContact={updateContact}
            createNewContact={createNewContact}
            uploadFileAction={uploadFileAction}
            handleChange={handleChange}
            handlePrev={handlePrev}
            form={form}
            setForm={setForm}
            closeNewContactDialog={closeNewContactDialog}
          />
        )}
      </Dialog>
    </div>
  );
};

ContactDialog.propTypes = {
  loading: PropTypes.bool,
  contactDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  getAllItems: PropTypes.array,
  closeNewContactDialog: PropTypes.func,
  updateContact: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  contactDialog: Selectors.makeSelectContactDialog(),
  contactGroups: Selectors.makeSelectContactsGroups()
});

function mapDispatchToProps(dispatch) {
  return {
    createNewContact: evt => dispatch(Actions.createNewContact(evt)),
    updateContact: evt => dispatch(Actions.updateContact(evt)),
    closeNewContactDialog: () => dispatch(Actions.closeNewContactDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactDialog);
