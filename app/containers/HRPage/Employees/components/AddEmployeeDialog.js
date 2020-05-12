import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Dialog, Slide } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import {Form} from './Form'
import {WorkForm} from './WorkForm'
import {PersonalForm} from './PersonalForm'
import {AdditionalForm} from './AdditionalForm'
import {EducationForm} from './EducationForm'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddEmployeeDialog(props) {
  const classes = useStyles();
  const { closeNewEmployeeDialog, createEmployee, departments, roles, employeeTypes, employees, dialog } = props;

  const [step, setStep] = React.useState(0)
  const [form, setForm, values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    mobileNo: '',
    phoneNumber: '',
    workPhone: '',
    nickName: '',
    employeeId: '',
    dateOfJoining: moment(new Date()).format('YYYY-MM-DD'),
    //branch: '',
    employmentStatus: '',
    employeeType: {id: ''},
    employeeType: "",
    seatingLocation: '',
    extension: '',
    education: [
      {degree: '', fieldOfStudy: ''},
      {degree: '', fieldOfStudy: ''},
    ],
    department:  {id: ''},
    password: 'Ezone123$',
    //designation: '', // {id: 1}
    reportTo: {id: ''},
    payRate: '',
    payType: '',
    role: '',
    dob: moment(new Date('01-01-1980')).format('YYYY-MM-DD'),
    maritalStatus: '',
    gender: '',
    country: '',
    city: '',
    website: '',
    website: '',
    address: '',
    address2: '',
    postalCode: '',
    jobLevel: '',
    jobDesc: '',
    about: '',
    otherEmail: ''
  });

  React.useEffect(() => {
    if(dialog.type == 'edit'){
      setForm({...form})
    }
  }, [dialog])

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
  }
  const handleSelectChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: { id: value } });
  };
  const handleAddRow = (event) => {
    const newObj = {degree: '', fieldOfStudy: ''};
    const { education } = form
    const newEducation = [...education, newObj]
    console.log(newEducation, "newEducation")

    setForm({...form, 'education': newEducation });
  };

  const handleRemoveRow = index => {
    form.education.splice(index, 1);
    setForm({ ...form });
  };

  const reformattedDate = (date) => {
    var month = date.getMonth() + 1; //months from 1-12
    var day = date.getDate();
    var year = date.getFullYear();
    
    var day = day.length > 0? day : day.toString().padStart(2, '0')
    var month = month.length > 0? month : month.toString().padStart(2, '0')
    
    const newdate = year + "-" + month + "-" + day;
    return newdate;
  }

  const handleDateChange = (date, formatted, name) => { 
    setForm(_.set({...form}, name, reformattedDate(date)))
  }

  const handleSubmit = () => {
    if(step > -1 && step < 3){ 
      setStep(step + 1) 
    }else{
      createEmployee(form);
    }
  }

  const handlePrev = () => {
    if (step => 1 && step <= 3) {
      setStep(step - 1);
    }
  }

  console.log(form, 'checking form employee...')

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewEmployeeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          {step === 0 && (
            <Form
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            form={form}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            />
          )}
          {step === 1 && (
            <WorkForm
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
            form={form}
            departments={departments}
            roles={roles}
            employeeTypes={employeeTypes}
            employees={employees}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            />
          )}
          {step === 2 && (
            <PersonalForm
            handleDateChange={handleDateChange}
            handleSelectChange={handleSelectChange}
            handleChange={handleChange}
            form={form}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            />
          )}
          {/* {step === 0 && (
            <EducationForm
            handleAddRow={handleAddRow}
            handleRemoveRow={handleRemoveRow}
            handleChange={handleChange}
            form={form}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            />
          )} */}
          {step === 3 && (
            <AdditionalForm
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            form={form}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            />
          )}
      </Dialog>
    </div>
  );
}


AddEmployeeDialog.propTypes = {
  closeNewEmployeeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectEmpDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  employeeTypes: Selectors.makeSelectEmployeeTypes(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeDialog: () => dispatch(Actions.closeNewEmployeeDialog()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    createEmployee: (ev) => dispatch(Actions.createEmployee(ev)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddEmployeeDialog);