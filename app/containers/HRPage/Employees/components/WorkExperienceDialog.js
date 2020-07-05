import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ScheduleIcon from '@material-ui/icons/Schedule'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Grid, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1, 0),
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const model = {
  companyName: "",
  fromDate: moment().format('YYYY-MM-DD'),
  jobTitle: "",
  toDate: moment().format('YYYY-MM-DD')
}

function WorkExperienceDialog(props) {
  const classes = useStyles();
  const { closeWorkExperienceDialog, dialog, createWorkExperience } = props;
  const [form, setForm] = React.useState({
    employeeId: 0,
    work: [
      { ...model }
    ]
  });


  React.useEffect(() => {
    dialog.data && setForm({ ...form, employeeId: dialog.data.id })

  }, [dialog])

  const canSubmitForm = () => {
    const { work, employeeId } = form
    return work.length > 0 && employeeId
  }

  const handleChange = (event, i) => {
    const { name, value } = event.target
    const { work } = form
    work[i][name] = value
    setForm({ ...form, work });
  }

  const handleDateChange = (name, i) => date => {
    const { work } = form
    work[i][name] = moment(date).format('YYYY-MM-DD')
    setForm({ ...form, work })
  }

  const addRow = () => {
    setForm({ ...form, work: [...form.work, model] })
  }

  const removeRow = index => {
    const { work } = form
    work.splice(index, 1)
    setForm({ ...form, work })
  }

  const handleSubmit = () => {
    createWorkExperience(form)
  }

  console.log(form, "form for work experience")
  console.log(dialog, "dialog for work experience")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeWorkExperienceDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Work Experience
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            {form.work.map((work, i) => (
              <React.Fragment key={i}>
                <Grid item xs={12}>
                  <TextField
                    id="company-name"
                    name="companyName"
                    placeholder="Comapny Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Company Name"
                    value={work.companyName}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="job-title"
                    name="jobTitle"
                    placeholder="Job Title"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Job Title"
                    value={work.jobTitle}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      margin="normal"
                      format="dd/MM/yyyy"
                      inputVariant="outlined"
                      id="time-picker-from-date"
                      label="From Date"
                      size="small"
                      fullWidth
                      value={work.fromDate}
                      onChange={handleDateChange('fromDate', i)}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      margin="normal"
                      format="dd/MM/yyyy"
                      inputVariant="outlined"
                      id="time-picker-to-date"
                      label="To Date"
                      size="small"
                      fullWidth
                      value={work.toDate}
                      onChange={handleDateChange('toDate', i)}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button size="small" color="primary" onClick={() => removeRow(i)}>remove</Button>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button size="small" color="primary" onClick={addRow}>Add another</Button>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeWorkExperienceDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


WorkExperienceDialog.propTypes = {
  closeWorkExperienceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectWorkExperienceDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeWorkExperienceDialog: () => dispatch(Actions.closeWorkExperienceDialog()),
    createWorkExperience: (data) => dispatch(Actions.createWorkExperience(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WorkExperienceDialog);