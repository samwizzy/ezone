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
import _ from 'lodash';
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
  companyNumber: '',
  lifeStage: '',
  associationType: '',
  contactGroup: '',
  contactSource: '',
  address: '',
  country: '',
  state: '',
  city: '',
  fax: '',
  dob: moment().format('YYYY-MM-DD'),
  regYear: moment().format('YYYY'),
  image: null,
  notes: '',
  ownerId: '',
  noOfEmployees: '',
  type: 'INDIVIDUAL',
  website: '',
}

const ContactDialog = props => {
  const classes = useStyles();
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    employees,
    dialog,
    createNewContact,
    updateContact,
    closeNewContactDialog,
    contactGroups
  } = props;

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      const { ownerName, ownerEmail, ...rest } = dialog.data
      if (ownerName && ownerEmail && employees.length > 0) {
        const emp = employees && _.find(employees, { emailAddress: ownerEmail })
        console.log(emp, "emp ids check")
        setForm({ ...rest, /*ownerId: emp.id,*/ image: null });
      }
    } else {
      setForm({ ...initialState })
      setStep(0)
    }
  }, [dialog.data]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = name => (event, val) => {
    setForm({ ...form, [name]: val.id });
  };

  const handleSelectNameChange = name => (event, val) => {
    setForm({ ...form, [name]: val.name });
  };

  const uploadFileAction = file => {
    setForm({ ...form, image: file });
  };

  const handleNext = () => {
    if (step > -1 && step <= 3) {
      setStep(step + 1);
    }
  };

  const handleDateChange = name => date => {
    name === 'regYear' ?
      setForm({ ...form, [name]: moment(date).format('YYYY') }) :
      setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') });
  };

  const handlePrev = () => {
    if (step => 1 && step <= 3) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createNewContact(form) : updateContact(form);
    setForm({ ...initialState })
  }

  // console.log(dialog, 'dialog');
  console.log(form, 'form');
  console.log(employees, 'employees');

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewContactDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        {step === 0 && (
          <BasicInfo
            handleChange={handleChange}
            handleSelectNameChange={handleSelectNameChange}
            handleSelectChange={handleSelectChange}
            handleSelectNameChange={handleSelectNameChange}
            form={form}
            employees={employees}
            closeNewContactDialog={closeNewContactDialog}
            handleNext={handleNext}
          />
        )}
        {step === 1 && (
          <AdvanceInfo
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSelectNameChange={handleSelectNameChange}
            form={form}
            closeNewContactDialog={closeNewContactDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 2 && (
          <UtilityInfo
            handleSelectChange={handleSelectChange}
            handleSelectChange={handleSelectChange}
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
            dialog={dialog}
            updateContact={updateContact}
            handleSubmit={handleSubmit}
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
  dialog: PropTypes.object,
  closeNewContactDialog: PropTypes.func,
  updateContact: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectContactDialog(),
  contactGroups: Selectors.makeSelectContactsGroups(),
  employees: Selectors.makeSelectEmployees(),
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
