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

const initialState = {
  firstName: '',
  emailAddress: '',
  phoneNumber: '',
  mobileNo: '',
  companyNumber: '',
  lifeStage: '',
  associationType: '',
  address: '',
  fax: '',
  image: null,
  ownerId: '',
  type: 'COMPANY',
  regYear: moment().format('YYYY'),
  noOfEmployees: '',
  website: '',
}

const CompaniesDialog = props => {
  const classes = useStyles();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    employees,
    dialog,
    createNewCompany,
    updateCompany,
    closeNewCompanyDialog,
  } = props;

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      const { ownerName, ownerEmail, ...rest } = dialog.data
      if (ownerName && ownerEmail && employees.length > 0) {
        const emp = employees && _.find(employees, { emailAddress: ownerEmail })
        console.log(emp, "emp ids check")
        setForm({ ...rest, ownerId: emp.id, image: null });
      }
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data]);

  console.log(dialog, 'dialog');
  console.log(employees, 'employees companies');

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, val) => {
    setForm({ ...form, [name]: val.id });
  }

  const handleSelectNameChange = name => (event, val) => {
    setForm({ ...form, [name]: val.name });
  }

  const uploadFileAction = file => {
    setForm({ ...form, image: file });
  }

  const handleNext = () => {
    if (step > -1 && step <= 3) {
      setStep(step + 1);
    }
  }

  const handleDateChange = name => date => {
    name === 'regYear' ?
      setForm({ ...form, [name]: moment(date).format('YYYY') }) :
      setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') });
  }

  const handlePrev = () => {
    if (step => 1 && step <= 3) {
      setStep(step - 1);
    }
  }

  const handleSubmit = () => {
    dialog.type === 'new' ? createNewCompany(form) : updateCompany(form);
    setForm({ ...initialState })
  }

  // console.log(dialog, 'dialog');
  console.log(form, 'form');

  return (
    <div>
      <Dialog
        {...dialog.props}
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
            handleSelectChange={handleSelectChange}
            handleSelectNameChange={handleSelectNameChange}
            handleDateChange={handleDateChange}
            form={form}
            employees={employees}
            closeNewCompanyDialog={closeNewCompanyDialog}
            handleNext={handleNext}
          />
        )}
        {step === 1 && (
          <OtherInfo
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSelectNameChange={handleSelectNameChange}
            form={form}
            closeNewCompanyDialog={closeNewCompanyDialog}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 2 && (
          <ImageUpload
            dialog={dialog}
            handleSubmit={handleSubmit}
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
  dialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  getAllItems: PropTypes.array,
  closeNewCompanyDialog: PropTypes.func,
  updateCompany: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectCompanyDialog(),
  employees: Selectors.makeSelectEmployees(),
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
