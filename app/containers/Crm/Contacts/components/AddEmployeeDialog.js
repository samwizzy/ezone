import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import _ from 'lodash';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, MenuItem, Slide, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import moment from 'moment'
import {Form} from './Form'
import {WorkForm} from './WorkForm'
import {PersonalForm} from './PersonalForm'
import {AdditionalForm} from './AdditionalForm'

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
  const { closeNewEmployeeDialog, departments, dialog } = props;
  const [step, setStep] = React.useState(0)
  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    workPhone: '',
    nickName: '',
    employeeId: '',
    dateOfJoining: moment(new Date()).format('YYYY-MM-DD'),
    branch: '',
    employmentStatus: '',
    employmentType: '',
    employeeType: "",
    seatingLocation: '',
    extension: '',
    department: '', // {id: 1}
    designation: '', // {id: 1}
    reportTo: '',
    payRate: '',
    payType: '',
    role: '', // {id: 1}
    dob: moment(new Date('01-01-1980')).format('YYYY-MM-DD'),
    maritalStatus: '',
    gender: '',
    address: '',
    jobDesc: '',
    about: '',
  });

  console.log(departments, "departments")

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

  const handleImageChange = (ev) => { 
    let fileNode = []
    Object.keys(ev.target.files).map(index => {
      const { name, size, type } = ev.target.files[index]

      const result = toBase64(ev.target.files[index]);
      result.then(rs => {
        const file = Object.assign({}, { fileName: name, size, format: type, file: rs })
        fileNode.push(file)
      })     

    })
    setForm(_.set({...form}, 'attachments', fileNode))
  }

  const handleSubmit = () => {
    if(step > -1 && step < 3){ setStep(step + 1) }
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
            form={form}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            />
          )}
          {step === 2 && (
            <PersonalForm
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            form={form}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handlePrev={handlePrev}
            />
          )}
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
  departments: Selectors.makeSelectDepartments(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeDialog: () => dispatch(Actions.closeNewEmployeeDialog()),
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