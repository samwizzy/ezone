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
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
}));

const heads = [
  {
    uuid: 1,
    label: 'Joel Johnson',
    value: 'joel johnson',
  },
  {
    uuid: 2,
    label: 'Fela Brown',
    value: 'fela brown',
  },
  {
    uuid: 3,
    label: 'Charles Brooks',
    value: 'charles brooks',
  },
  {
    uuid: 4,
    label: 'Tom Cruise',
    value: 'tom cruise',
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddTaskDialog(props) {
  const classes = useStyles();
  const { openTaskPreviewDialog, closeNewTaskDialog, createUtilityTask, data } = props;
  const [form, setForm] = React.useState({
    title: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
    assignedTo: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({...form, [name]: value});
    // setForm(_.set({...form}, event.target.name, event.target.value))
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

  const handleSubmit = event => {
    createUtilityTask(form)
    // closeNewTaskDialog()
  }

  console.log(form, 'checking form task...')

  return (
    <div>
      <Dialog
        {...data.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewTaskDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Add Task</DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.root}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                id="outlined-size-small"
                fullWidth
                variant="outlined"
                size="small"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                name="description"
                label="Description"
                multiline
                fullWidth
                rows="4"
                rowsMax="4"
                value={form.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      name="startDate"
                      id="date-picker-inline"
                      label="Start Date"
                      value={form.startDate}
                      onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      name="endDate"
                      id="date-picker-inline"
                      label="End Date"
                      value={form.endDate}
                      onChange={(date, formatted) => handleDateChange(date, formatted, 'endDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="select-head"
                name="assignedTo"
                placeholder="Select employee to assign to task"
                select
                fullWidth
                className={classes.textField}
                variant="outlined"
                size="small"
                label="Assigned To"
                value={form.assignedTo}
                onChange={handleChange}
              >
                {heads.map(option => (
                  <MenuItem key={option.uuid} value={option.uuid}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
              >
                Upload File
                <input
                  type="file"
                  style={{ display: "none" }}
                />
              </Button>
            </Grid> */}
          </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewTaskDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddTaskDialog.propTypes = {
  openNewTaskDialog: PropTypes.func,
  openTaskPreviewDialog: PropTypes.func,
  closeNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: Selectors.makeSelectNewTaskDialog()
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
    openTaskPreviewDialog: ev => dispatch(Actions.openTaskPreviewDialog(ev)),
    createUtilityTask: ev => dispatch(Actions.createUtilityTask(ev)),
    closeNewTaskDialog: () => dispatch(Actions.closeNewTaskDialog()),
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
)(AddTaskDialog);