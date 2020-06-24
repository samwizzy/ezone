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

const initialState = {
  name: "",
  type: "EMPLOYEETYPE"
}

function EmployeeTypeDialog(props) {
  const classes = useStyles();
  const { closeNewEmployeeTypeDialog, createEmployeeType, createSourceOfHire, createPayRate, createPayType, createEnrollmentType, createLocation, dialog } = props;
  const [form, setForm] = React.useState({ ...initialState });

  React.useEffect(() => {
    if (dialog.type == 'edit') {
      setForm({ ...dialog.data })
    } else {
      setForm({ ...initialState, type: dialog.type })
    }
  }, [dialog])

  const canSubmitForm = () => {
    const { name, type } = form
    return name.length > 0 && type.length > 0
  }

  const handleChange = ({ target }) => {
    const { name, value } = target
    setForm({ ...form, [name]: value });
  }
  const handleSubmit = () => {
    switch (dialog.type) {
      case 'EMPLOYEETYPE':
        createEmployeeType(form); break;
      case 'SOURCEOFHIRE':
        createSourceOfHire(form); break;
      case 'PAYRATE':
        createPayRate(form); break;
      case 'PAYTYPE':
        createPayType(form); break;
      case 'ENROLLMENTTYPE':
        createEnrollmentType(form); break;
      case 'LOCATION':
        createLocation(form); break;
    }
  }

  console.log(dialog, "dialog employee type")
  console.log(form, "form employee type")

  return (
    <div>
      <Dialog
        {...dialog.props}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeNewEmployeeTypeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {dialog.type === 'EMPLOYEETYPE' && 'Add Employee Type'}
              {dialog.type === 'SOURCEOFHIRE' && 'Add Source of Hire'}
              {dialog.type === 'PAYRATE' && 'Add Pay Rate'}
              {dialog.type === 'PAYTYPE' && 'Add Pay Type'}
              {dialog.type === 'ENROLLMENTTYPE' && 'Add Enrollment Type'}
              {dialog.type === 'LOCATION' && 'Add Location'}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <TextField
            id="name"
            name="name"
            placeholder="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            size="small"
            label="Name"
            value={form.name}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={closeNewEmployeeTypeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!canSubmitForm()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


EmployeeTypeDialog.propTypes = {
  closeNewEmployeeTypeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  dialog: Selectors.makeSelectEmployeeTypeDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeNewEmployeeTypeDialog: () => dispatch(Actions.closeNewEmployeeTypeDialog()),
    createEmployeeType: (data) => dispatch(Actions.createEmployeeType(data)),
    createSourceOfHire: (data) => dispatch(Actions.createSourceOfHire(data)),
    createPayRate: (data) => dispatch(Actions.createPayRate(data)),
    createPayType: (data) => dispatch(Actions.createPayType(data)),
    createEnrollmentType: (data) => dispatch(Actions.createEnrollmentType(data)),
    createLocation: (data) => dispatch(Actions.createLocation(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeTypeDialog);