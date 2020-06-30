import React, { memo } from 'react';
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
import { AppBar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, MenuItem, Slide, Toolbar, Typography, TextField } from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
import moment from 'moment'
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0)
    },
  },
  title: {
    flexGrow: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  title: '',
  description: '',
  startDate: moment(new Date()).format('YYYY-MM-DD'),
  endDate: moment(new Date()).format('YYYY-MM-DD'),
  status: "PENDING",
  assignedTo: "",
  assignedToName: "",
  assignedToEmail: "",
  supervisedBy: "",
  attachments: []
}

function AddTaskDialog(props) {
  const classes = useStyles();
  const { loading, closeNewTaskDialog, createUtilityTask, updateUtilityTask, dialog, users, task } = props;
  const [form, setForm] = React.useState({ ...initialState });

  React.useEffect(() => {
    if (task && dialog.type === 'edit') {
      const { id, title, description, status, startDate, endDate, assignedTo, assignedToName, assignedToEmail, supervisedBy } = task
      setForm({ ...form, id, title, description, status, startDate: moment(startDate).format('YYYY-MM-DD'), endDate: moment(endDate).format('YYYY-MM-DD'), assignedTo, assignedToName, assignedToEmail, supervisedBy })
    }
  }, []);

  React.useEffect(() => {
    if (!loading) {
      setForm(initialState)
    }
  }, [loading])

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value });
  }

  const canSubmitForm = () => {
    const { title, description, startDate, endDate } = form
    return title.length > 0 && description.length > 0
  }

  const handleDateChange = (date, name) => {
    setForm(_.set({ ...form }, name, moment(date).format('YYYY-MM-DD')))
  }

  const handleImageChange = (ev) => {
    let fileNode = []
    Object.keys(ev.target.files).map(index => {
      const { name, size, type } = ev.target.files[index]
      const result = toBase64(ev.target.files[index]);
      result.then(rs => {
        const fileName = name.substr(0, 5).concat(moment().format('YYYY-MM-DDTHH:mm:ss.SSS'))
        const file = Object.assign({}, { fileName, size, format: type, file: rs })
        fileNode.push(file)
      })
    })
    setForm(_.set({ ...form }, event.target.name, fileNode))
  }

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createUtilityTask(form) :
      updateUtilityTask(form)
  }

  console.log(dialog, "dialog AddTaskDialog")
  console.log(form, "form AddTaskDialog")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewTaskDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {dialog.type === 'new' ? "Add Task" : "Edit Task"}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                id="outlined-title"
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-desc"
                name="description"
                label="Description"
                multiline
                fullWidth
                margin="normal"
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
                      autoOk
                      disableToolbar
                      disablePast
                      format="dd/MM/yyyy"
                      margin="normal"
                      inputVariant="outlined"
                      size="small"
                      name="startDate"
                      id="date-picker-startDate"
                      label="Start Date"
                      value={form.startDate}
                      onChange={(date) => handleDateChange(date, 'startDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      disablePast
                      format="dd/MM/yyyy"
                      inputVariant="outlined"
                      size="small"
                      margin="normal"
                      name="endDate"
                      id="date-picker-endDate"
                      label="End Date"
                      value={form.endDate}
                      onChange={(date) => handleDateChange(date, 'endDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      fullWidth
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="assignedTo"
                name="assignedTo"
                placeholder="Select employee to assign to task"
                select
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                label="Assigned To"
                value={form.assignedTo ? form.assignedTo : ''}
                onChange={handleChange}
              >
                {users && users.map(user => (
                  <MenuItem key={user.uuId} value={user.uuId}>
                    {user.emailAddress}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl} margin="normal">
                <TextField
                  id="outlined-attachments"
                  name="attachments"
                  type="file"
                  label="Attachment"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  onChange={handleImageChange}
                  variant="outlined"
                  multiple
                />
              </FormControl>
              {/* <FormControl variant="outlined" className={classes.formControl} margin="normal">
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
              </FormControl> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeNewTaskDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading ? loading : !canSubmitForm()} color="primary" endIcon={loading && <CircularProgress size={20} />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AddTaskDialog.propTypes = {
  openNewTaskDialog: PropTypes.func,
  closeNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectNewTaskDialog(),
  users: Selectors.makeSelectEmployees(),
  task: Selectors.makeSelectTask(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: ev => dispatch(Actions.openNewTaskDialog(ev)),
    createUtilityTask: ev => dispatch(Actions.createUtilityTask(ev)),
    updateUtilityTask: (data) => dispatch(Actions.updateUtilityTask(data)),
    closeNewTaskDialog: () => dispatch(Actions.closeNewTaskDialog()),
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