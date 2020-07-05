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
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, MenuItem, Slide, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  input: {
    display: 'none',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const model = {
  dateOfCompletion: moment().format('YYYY-MM-DD'),
  degree: "",
  fieldOfStudy: "",
  interests: "",
  note: "",
}

function EducationBackgroundDialog(props) {
  const classes = useStyles();
  const { closeEducationBackgroundDialog, dialog, createEducationBackground } = props;
  const [form, setForm] = React.useState({
    education: [
      { ...model }
    ],
    employeeId: 0
  });

  React.useEffect(() => {
    dialog.data &&
      setForm({ ...form, employeeId: dialog.data.id })

  }, [dialog])

  const canSubmitForm = () => {
    const { education, employeeId } = form
    return (
      education.length > 0 && employeeId
    )
  }

  const handleChange = (event, i) => {
    const { name, value } = event.target
    const { education } = form
    education[i][name] = value
    setForm({ ...form, education });
  }

  const handleDateChange = (name, i) => date => {
    const { education } = form
    education[i][name] = moment(date).format('YYYY-MM-DD')
    setForm({ ...form, education })
  }

  const addRow = () => {
    setForm({ ...form, education: [...form.education, model] })
  }

  const removeRow = index => {
    const { education } = form
    education.splice(index, 1)
    console.log(form, "remove this index")

    setForm({ ...form, education })
  }

  const handleSubmit = () => {
    createEducationBackground(form)
  }

  console.log(dialog, "dialog education background")
  console.log(form, "form education background")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeEducationBackgroundDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Add Education Background
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            {form.education.map((education, i) =>
              <React.Fragment key={i}>
                <Grid item xs={6}>
                  <TextField
                    id="degree"
                    name="degree"
                    placeholder="Degree"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Degree"
                    value={education.degree}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="field-of-study"
                    name="fieldOfStudy"
                    placeholder="Field Of Study"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Field Of Study"
                    value={education.fieldOfStudy}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="interests"
                    name="interests"
                    placeholder="Interests"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Interests"
                    value={education.interests}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      margin="normal"
                      fullWidth
                      format="MM/dd/yyyy"
                      inputVariant="outlined"
                      id="time-date-of-completion"
                      label="Date Of Completion"
                      size="small"
                      value={education.dateOfCompletion}
                      onChange={handleDateChange('dateOfCompletion', i)}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="note"
                    name="note"
                    placeholder="Note"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                    size="small"
                    label="Note"
                    value={education.note}
                    onChange={(e) => handleChange(e, i)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button size="small" color="primary" onClick={() => removeRow(i)}>remove</Button>
                </Grid>
              </React.Fragment>
            )}
            <Grid item xs={12}>
              <Button size="small" color="primary" onClick={addRow}>Add another</Button>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeEducationBackgroundDialog} color="primary">
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


EducationBackgroundDialog.propTypes = {
  closeEducationBackgroundDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectEducationBackgroundDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeEducationBackgroundDialog: () => dispatch(Actions.closeEducationBackgroundDialog()),
    createEducationBackground: (data) => dispatch(Actions.createEducationBackground(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EducationBackgroundDialog);