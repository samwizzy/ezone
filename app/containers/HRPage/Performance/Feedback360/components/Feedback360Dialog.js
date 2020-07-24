import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withStyles, AppBar, Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, Grid, MenuItem, Slide, Popover, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Form1 from './dialogs/Form1'
import Form2 from './dialogs/Form2'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const questionsInitialState = {
  question: '',
  questionType: 'TEXT',
}

function Feedback360Dialog(props) {
  const classes = useStyles();
  const { closeNewFeedbackDialog, createRecognition, dialog, employees, departments, branches, roles } = props;
  const [step, setStep] = React.useState(0);

  const [form, setForm] = React.useState({
    title: '',
    timeline: moment().format('YYYY-MM-DDTHH:mm:ss.SSS'),
    description: '',
    reviwees: [],
    questions: [{ ...questionsInitialState }],
    visibility: [],
    employees: []
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj })
  }

  const handleQuestionChange = i => event => {
    const { questions } = form
    questions[i][event.target.name] = event.target.value
    setForm({ ...form, questions })
  }

  const handleSubmit = () => {
    createRecognition(form)
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

  const addMore = event => {
    setForm({ ...form, questions: [...form.questions, questionsInitialState] });
  };

  console.log(form, "recognition form")
  console.log(dialog, "review dialog chukwubunna")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewFeedbackDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {step === 0 && (
          <Form1
            form={form}
            handleNext={handleNext}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        )}
        {step === 1 && (
          <Form2
            form={form}
            handleNext={handleNext}
            handleChange={handleChange}
            handleQuestionChange={handleQuestionChange}
            addMore={addMore}
          />
        )}
      </Dialog>
    </div>
  );
}


Feedback360Dialog.propTypes = {
  closeNewFeedbackDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectFeedbackDialog(),
  employees: Selectors.makeSelectEmployees(),
  departments: Selectors.makeSelectDepartments(),
  branches: Selectors.makeSelectBranches(),
  roles: Selectors.makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewFeedbackDialog: () => dispatch(Actions.closeNewFeedbackDialog()),
    createRecognition: (data) => dispatch(Actions.createRecognition(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Feedback360Dialog);
