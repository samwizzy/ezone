import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import EzoneUtils from '../../../../utils/EzoneUtils'
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { AppBar, Button, Dialog, DialogActions, DialogContent, FormControl, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import * as Selectors from '../../selectors';
import AttachFileIcon from '@material-ui/icons/AttachFile';

import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ApplicantDialog(props) {
  const classes = useStyles();
  const { closeNewApplicantDialog, createApplicant, jobOpenings, dialog } = props;
  const [form, setForm] = React.useState({
    dob: moment('1980-01-01').format('YYYY-MM-DDTHH:mm:ss.SSS'),
    firstName: "",
    gender: "",
    lastName: "",
    mobileNumber: "",
    personalEmail: "",
    presentAddress: "",
    resume: "",
    status: "REJECT",
    workExperience: "FRESHER",
    workflow: [],
    applyingFor: null
  });

  console.log(dialog, "dialog checking")


  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { applyingFor, firstName, lastName, mobileNumber, personalEmail, gender, resume } = form
    return firstName.length > 0 && lastName.length > 0 && personalEmail.length > 0 &&
      mobileNumber.length > 0 && applyingFor && gender.length > 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = name => (event, obj) => {
    setForm({ ...form, [name]: obj });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss.SSS') });
  }

  const handleImageChange = (event) => {
    const { name, files } = event.target
    const result = EzoneUtils.toBase64(files[0]);
    // result.then(file =>
    //   setForm({ ...form, [name]: file })
    // )
  }

  const handleSubmit = event => {
    console.log("handle submit")
    createApplicant(form)
  }

  console.log(form, 'checking form dept...')

  return (
    <div className={classes.root}>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewApplicantDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add applicant
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Autocomplete
                id="select-applying-for"
                size="small"
                options={jobOpenings}
                classes={{
                  option: classes.option,
                }}
                value={form.applyingFor ? form.applyingFor : null}
                onChange={handleSelectChange('applyingFor')}
                autoHighlight
                getOptionLabel={option => option.jobTitle}
                renderOption={option => (
                  <React.Fragment>
                    {option.jobTitle}
                  </React.Fragment>
                )}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Choose position applying for"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                id="first-name"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                id="last-name"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="mobileNumber"
                label="Mobile Number"
                id="mobile-number"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.mobileNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="gender"
                name="gender"
                placeholder="Gender"
                select
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Gender"
                value={form.gender}
                onChange={handleChange}
              >
                {['Male', 'Female'].map((item, i) =>
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="personalEmail"
                label="Personal Email"
                id="outlined-title"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.personalEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  disableFuture
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="normal"
                  fullWidth
                  size="small"
                  name="dob"
                  id="date-of-birth"
                  label="Date Of Birth"
                  value={form.dob}
                  onChange={handleDateChange('dob')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="work-experience"
                name="workExperience"
                placeholder="Select work experience"
                select
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Work Experience"
                value={form.workExperience}
                onChange={handleChange}
              >
                {['FRESHER', 'EXPERIENCED'].map((experience, i) =>
                  <MenuItem key={i} value={experience}>
                    {experience}
                  </MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="presentAddress"
                label="Personal Address"
                id="personal-address"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                variant="outlined"
                size="small"
                value={form.presentAddress}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>Attach Resume/Cv</Typography>

              <FormControl variant="outlined" margin="dense">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AttachFileIcon />}
                >
                  Upload File
                    <input
                    name="resume"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography>Attach Cover Letter</Typography>

              <FormControl variant="outlined" margin="dense">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AttachFileIcon />}
                >
                  Upload File
                    <input
                    name="attachments"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                    multiple
                  />
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewApplicantDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}


ApplicantDialog.propTypes = {
  closeNewApplicantDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectApplicantDialog(),
  loading: Selectors.makeSelectLoading(),
  jobOpenings: Selectors.makeSelectJobOpenings(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewApplicantDialog: () => dispatch(Actions.closeNewApplicantDialog()),
    createApplicant: (data) => dispatch(Actions.createApplicant(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ApplicantDialog);