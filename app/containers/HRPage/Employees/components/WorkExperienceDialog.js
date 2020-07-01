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
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Slide, Table, TableBody, TableRow, TableCell, Typography, TextField, Toolbar } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {},
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

function WorkExperienceDialog(props) {
  const classes = useStyles();
  const { closeWorkExperienceDialog, dialog, updateEmployee } = props;
  const [form, setForm] = React.useState({
    companyName: "",
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    jobTitle: "",
    orgId: "",
  });

  React.useEffect(() => {
    dialog.data && setForm({ ...dialog.data })

  }, [dialog])

  const canSubmitForm = () => {
    const { companyName, fromDate, toDate, jobTitle } = form
    // return companyName.length > 0 && fromDate.length > 0 && toDate.length > 0 && jobTitle.length > 0
    return true
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DD') })
  }

  const handleSubmit = () => {
    updateEmployee(form)
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
          <Table className={classes.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>
                  <TextField
                    id="company-name"
                    name="companyName"
                    placeholder="Description"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Company Name"
                    value={form.companyName}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>
                  <TextField
                    id="job-title"
                    name="jobTitle"
                    placeholder="jobTitle"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    label="Job Title"
                    value={form.jobTitle}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      margin="normal"
                      format="MM/dd/yyyy"
                      inputVariant="outlined"
                      id="time-picker-from-date"
                      label="From Date"
                      size="small"
                      value={form.fromDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
                <TableCell>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      margin="normal"
                      format="MM/dd/yyyy"
                      inputVariant="outlined"
                      id="time-picker-to-date"
                      label="To Date"
                      size="small"
                      value={form.toDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
    updateEmployee: () => dispatch(Actions.updateEmployee()),
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