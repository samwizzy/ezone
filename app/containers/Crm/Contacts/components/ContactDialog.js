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
import { BasicInfo } from './BasicInfo';
import { AdvanceInfo } from './AdvanceInfo';
import { UtilityInfo } from './UtilityInfo';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    // width: 400,
  },
  textField: {
    margin: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1),
    border: '1px solid red',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactDialog = props => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState(new Date());

  const [rows, setRows] = React.useState([{}]);
  const [step, setStep] = React.useState(0);
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

  const {
    loading,
    contactDialog,
    getAllItems,
    getAllWarehouses,
    closeNewContactDialogAction,
    closeEditEmployeeDialogAction,
    dispatchCreateNewInventoryAdjustmentAction,
  } = props;

  console.log(contactDialog, 'contactDialog');

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleNext = () => {
    if(step > -1 && step < 3){ setStep(step + 1) }
  }

  const handlePrev = () => {
    if (step => 1 && step <= 3) {
      setStep(step - 1);
    }
  }


  return (
    <div>
      <Dialog
        {...contactDialog.props}
        onClose={closeNewContactDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        {step === 0 && (
          <BasicInfo
            handleChange={handleChange}
            form={form}
            closeNewContactDialog={closeNewContactDialogAction}
            handleNext={handleNext}
          />
        )}
        {step === 1 && (
          <AdvanceInfo
            handleChange={handleChange}
            form={form}
            closeNewContactDialog={closeNewContactDialogAction}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 2 && (
          <UtilityInfo
            handleChange={handleChange}
            form={form}
            closeNewContactDialog={closeNewContactDialogAction}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
      </Dialog>
    </div>
  );
};

ContactDialog.propTypes = {
  loading: PropTypes.bool,
  contactDialog: PropTypes.object,
  getAllWarehouses: PropTypes.array,
  getAllItems: PropTypes.array,
  dispatchCreateNewInventoryAdjustmentAction: PropTypes.func,
  closeNewContactDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  contactDialog: Selectors.makeSelectContactDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatchCreateNewInventoryAdjustmentAction: evt =>
    //   dispatch(Actions.createNewInventoryAdjustment(evt)),
    closeNewContactDialogAction: () =>
      dispatch(Actions.closeNewContactDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ContactDialog);
