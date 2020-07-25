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
import { CompanyInfo } from './CompanyInfo';
import { OtherInfo } from './OtherInfo';
import { ImageUpload } from './ImageUpload';

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

const CompaniesDialog = props => {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({
    firstName: '',
    emailAddress: '',
    phoneNumber: '',
    mobileNo: '',
    lifeStage: '',
    associationType: '',
    address1: '',
    fax: '',
    image: '',
    ownerId: '',
    type: 'COMPANY',
    website: '',
  });

  const {
    loading,
    companyDialog,
    createNewCompany,
    updateCompany,
    closeNewCompanyDialog,
    closeEditEmployeeDialogAction,
  } = props;

  console.log(companyDialog, 'companyDialog');

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
    if (companyDialog.type === 'edit') {
      setForm({ ...companyDialog.data });
    }
  }, [companyDialog.data]);

  // console.log(companyDialog, 'companyDialog');
  console.log(form, 'form');

  return (
    <div>
      <Dialog
        {...companyDialog.props}
        onClose={closeNewCompanyDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {step === 0 && (
          <CompanyInfo
            handleChange={handleChange}
            handleSelectLifeStage={handleSelectLifeStage}
            handleSelectOwnerId={handleSelectOwnerId}
            handleSelectAssociateId={handleSelectAssociateId}
            form={form}
            closeNewCompanyDialog={closeNewCompanyDialog}
            handleNext={handleNext}
          />
        )}
        {step === 1 && (
          <OtherInfo
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSelectCountry={handleSelectCountry}
            form={form}
            closeNewCompanyDialog={closeNewCompanyDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 2 && (
          <ImageUpload
            companyDialog={companyDialog}
            updateCompany={updateCompany}
            createNewCompany={createNewCompany}
            uploadFileAction={uploadFileAction}
            handleChange={handleChange}
            handlePrev={handlePrev}
            form={form}
            setForm={setForm}
            closeNewCompanyDialog={closeNewCompanyDialog}
          />
        )}
      </Dialog>
    </div>
  );
};

CompaniesDialog.propTypes = {
  loading: PropTypes.bool,
  companyDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  getAllItems: PropTypes.array,
  closeNewCompanyDialog: PropTypes.func,
  updateCompany: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  companyDialog: Selectors.makeSelectCompanyDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    createNewCompany: evt => dispatch(Actions.createNewCompany(evt)),
    updateCompany: evt => dispatch(Actions.updateCompany(evt)),
    closeNewCompanyDialog: () => dispatch(Actions.closeNewCompanyDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompaniesDialog);
