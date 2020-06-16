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
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  table: {
    "& td": {
      border: "0 !important"
    }
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

function EducationBackgroundDialog(props) {
  const classes = useStyles();
  const { closeEducationBackgroundDialog, dialog } = props;
  const [form, setForm] = React.useState({
    dateOfCompletion: moment(new Date).format('YYYY-MM-DD'),
    degree: "",
    fieldOfStudy: "",
    interests: "",
    note: "",
    orgId: "",
  });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...form })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { dateOfCompletion, degree, fieldOfStudy, interests, note } = form
    return (
      dateOfCompletion.length > 0 && degree.length > 0 &&
      fieldOfStudy.length > 0 && interests.length > 0 && note.length > 0
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleSelectChange = () => { }

  const handleDateChange = () => { }

  const handleSubmit = () => { }

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
                value={form.degree}
                onChange={handleChange}
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
                value={form.fieldOfStudy}
                onChange={handleChange}
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
                value={form.interests}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  margin="normal"
                  fullWidth
                  format="MM/dd/yyyy"
                  inputVariant="outlined"
                  id="time-date-of-completion"
                  label="Date Of Completion"
                  size="small"
                  value={form.dateOfCompletion}
                  onChange={handleDateChange}
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
                value={form.note}
                onChange={handleChange}
              />
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
)(EducationBackgroundDialog);