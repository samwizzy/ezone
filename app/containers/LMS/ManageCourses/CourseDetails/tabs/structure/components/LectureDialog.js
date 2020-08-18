/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { Autocomplete } from '@material-ui/lab';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  Slide,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import * as Selectors from '../../../../selectors';
import * as Actions from '../../../../actions';
import PaperDropzone from './PaperDropzone'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialState = {
  title: '',
  description: '',
  type: null,
  dueDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  startTime: moment().format('YYYY HH:mm:ss'),
  endTime: moment().format('YYYY HH:mm:ss'),
}

const LectureDialog = props => {
  const classes = useStyles();
  const { loading, dialog, closeNewLectureDialog } = props;

  const [form, setForm] = React.useState({ ...initialState });

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      const { contacts, ...rest } = dialog.data
      setForm({ ...rest, contactIds: contacts });
    }
  }, [dialog.data]);

  const canSubmitForm = () => {
    const { title, description } = form;
    return title !== '' && description !== '';
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = name => (evt, obj) => {
    setForm({ ...form, [name]: obj });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleSubmit = () => {
  }

  return (
    <div>
      <Dialog
        {...dialog.props}
        onClose={closeNewLectureDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {dialog.type === 'new' ? 'New Lecture' : 'Edit Lecture'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Lecture Title"
                id="outlined-title"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                id="outlined-description"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="instructions"
                label="Instructions"
                id="outlined-instructions"
                fullWidth
                variant="outlined"
                margin="normal"
                size="small"
                value={form.instructions}
                onChange={handleChange}
                rows={3}
                rowsMax={5}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                id="combo-box-type"
                size="small"
                options={[]}
                getOptionLabel={option => option.name}
                // getOptionSelected={option => option.name === form.type}
                value={form.type}
                onChange={handleSelectChange('type')}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Type"
                    variant="outlined"
                    placeholder="Search"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="date-picker-dialog"
                  label="Date"
                  size="small"
                  format="MM/dd/yyyy"
                  name="date"
                  value={form.date}
                  onChange={handleDateChange('date')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="start-time"
                  name="startTime"
                  label="Start Time"
                  size="small"
                  value={form.startTime}
                  onChange={handleDateChange('startTime')}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<ScheduleIcon />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  margin="normal"
                  fullWidth
                  inputVariant="outlined"
                  id="end-time"
                  name="endTime"
                  label="End Time"
                  size="small"
                  value={form.endTime}
                  onChange={handleDateChange('endTime')}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={<ScheduleIcon />}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControl margin="normal" fullWidth>
                <PaperDropzone />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewLectureDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LectureDialog.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
  closeNewLectureDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectLectureDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewLectureDialog: () => dispatch(Actions.closeNewLectureDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LectureDialog);
