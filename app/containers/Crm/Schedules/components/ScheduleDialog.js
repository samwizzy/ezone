/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Divider,
  Slide,
  AppBar,
  Toolbar,
  MenuItem,
  IconButton,
  Typography,
  FormControlLabel,
  Radio,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ScheduleDialog = props => {
  const classes = useStyles();
  const { loading, scheduleDialog, closeNewScheduleDialog } = props;
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [form, setForm] = React.useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    mobileNo: '',
    lifeStage: '',
    contactGroup: '',
    contactGroupId: '',
    contactSource: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    fax: '',
    dob: '',
    image: '',
    notes: '',
    ownerId: '',
    type: '',
    website: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {}
  const canSubmitForm = () => {}

  return (
    <div>
      <Dialog
        {...scheduleDialog.props}
        onClose={closeNewScheduleDialog}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6">
              Add New Schedule
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />

        <DialogContent>
          <form className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  name="firstName"
                  label="Firstname"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="lastName"
                  label="Lastname"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="phoneNumber"
                  label="Mobile Number"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="emailAddress"
                  label="Email"
                  id="outlined-title"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={form.emailAddress}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lifeStage"
                  name="lifeStage"
                  placeholder="Select life Stage"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="life Stage"
                  value={form.lifeStage}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="3">
                    No record
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lifeStage"
                  name="lifeStage"
                  placeholder="Select life Stage"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="life Stage"
                  value={form.lifeStage}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="3">
                    No record
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="lifeStage"
                  name="lifeStage"
                  placeholder="Select life Stage"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="life Stage"
                  value={form.lifeStage}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="3">
                    No record
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewScheduleDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!canSubmitForm()}
            color="primary"
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ScheduleDialog.propTypes = {
  loading: PropTypes.bool,
  scheduleDialog: PropTypes.object,
  closeNewScheduleDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  scheduleDialog: Selectors.makeSelectScheduleDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewScheduleDialog: () => dispatch(Actions.closeNewScheduleDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ScheduleDialog);
