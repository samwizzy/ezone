import React, { memo } from 'react';
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
import { Form } from './Form'
import { WorkForm } from './WorkForm'
import { PersonalForm } from './PersonalForm'
import { AdditionalForm } from './AdditionalForm'
import { EducationForm } from './EducationForm'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  mobileNo: '',
  phoneNumber: '',
  workPhone: '',
  nickName: '',
  employeeId: '',
  dateOfJoining: moment(new Date()).format('YYYY-MM-DD'),
  branch: '',
  status: '',
  employeeType: '',
  sourceOfHire: '',
  seatingLocation: '',
  extension: '',
  education: [],
  department: '',
  password: 'Ezone123$',
  reportingTo: null,
  payRate: null,
  payType: null,
  dob: moment(new Date('01-01-1980')).format('YYYY-MM-DD'),
  maritalStatus: '',
  gender: '',
  country: '',
  city: '',
  state: '',
  address: '',
  designation: null,
  jobDesc: '',
  about: '',
}

function AddEmployeeDialog(props) {
  const classes = useStyles();
  const { loading, closeNewEmployeeDialog, openNewEmployeeTypeDialog, createEmployee, updateEmployee, departments, roles, branches, employeeTypes, sourcesOfHire, payRates, payTypes, employees, dialog } = props;

  const [step, setStep] = React.useState(0)
  const [form, setForm] = React.useState({ ...initialState });

  console.log(dialog, "dialog")

  React.useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...initialState })
    }
  }, [dialog])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }
  const handleSelectChange = name => (event, obj) => {
    name === 'state' ?
      setForm({ ...form, [name]: obj }) :
      setForm({ ...form, [name]: obj.name }); // country
  };

  const handleItemChange = ({ target }) => {
    const { name, value } = target
    switch (name) {
      case 'department':
        setForm({ ...form, [name]: _.find(departments, { id: value }) }); break;
      case 'branch':
        setForm({ ...form, [name]: _.find(branches, { id: value }) }); break;
      case 'employeeType':
        setForm({ ...form, [name]: _.find(employeeTypes, { id: value }) }); break;
      case 'sourceOfHire':
        setForm({ ...form, [name]: _.find(sourcesOfHire, { id: value }) }); break;
      case 'payRate':
        setForm({ ...form, [name]: _.find(payRates, { id: value }) }); break;
      case 'payType':
        setForm({ ...form, [name]: _.find(payTypes, { id: value }) }); break;
      case 'reportingTo':
        setForm({ ...form, [name]: _.find(employees, { id: value }) }); break;
    }
  };

  const handleAddRow = (event) => {
    const newObj = { degree: '', fieldOfStudy: '' };
    const { education } = form
    const newEducation = [...education, newObj]

    setForm({ ...form, 'education': newEducation });
  };

  const handleRemoveRow = index => {
    form.education.splice(index, 1);
    setForm({ ...form });
  };

  const handleDateChange = (date, name) => {
    setForm(_.set({ ...form }, name, moment(date).format('YYYY-MM-DD')))
  }

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createEmployee(form) : updateEmployee(form)
  }

  const handleNext = () => {
    if (step > -1 && step < 3) {
      setStep(step + 1)
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
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        )}
        {step === 1 && (
          <WorkForm
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            handleItemChange={handleItemChange}
            openNewEmployeeTypeDialog={openNewEmployeeTypeDialog}
            form={form}
            departments={departments}
            roles={roles}
            branches={branches}
            employeeTypes={employeeTypes}
            sourcesOfHire={sourcesOfHire}
            payRates={payRates}
            payTypes={payTypes}
            employees={employees}
            closeNewEmployeeDialog={closeNewEmployeeDialog}
            handleSubmit={handleSubmit}
            handleNext={handleNext}
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
            handleNext={handleNext}
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
            loading={loading}
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
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectEmpDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartmentsByOrgIdApi(),
  employeeTypes: Selectors.makeSelectEmployeeTypes(),
  sourcesOfHire: Selectors.makeSelectSourcesOfHire(),
  payRates: Selectors.makeSelectPayRates(),
  payTypes: Selectors.makeSelectPayTypes(),
  roles: Selectors.makeSelectRoles(),
  branches: Selectors.makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeDialog: () => dispatch(Actions.closeNewEmployeeDialog()),
    openNewEmployeeTypeDialog: (data) => dispatch(Actions.openNewEmployeeTypeDialog(data)),
    getEmployees: () => dispatch(Actions.getEmployees()),
    createEmployee: (data) => dispatch(Actions.createEmployee(data)),
    updateEmployee: (data) => dispatch(Actions.updateEmployee(data)),
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