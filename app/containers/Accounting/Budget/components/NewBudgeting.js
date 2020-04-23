import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import {
  Card, 
  CardContent, 
  CardActions,
  TextField,
  Typography,
  makeStyles,
  Button,
  MenuItem, 
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  Slide,
  Grid,
} from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../../components/LoadingIndicator';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1.5, 0),
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 100,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewBudgeting = props => {
  const classes = useStyles();

  const { 
    loading,
    currentUser, 
    budgetDialog, 
    closeNewBudgetingDialog,
  } = props;

  const [values, setValues] = React.useState({
    accountCode: "",
    accountName: "",
    accountNumber: "",
    bankBalance: "",
    bankName: "",
    description: "",
    orgId: currentUser.organisation.orgId,
  });

  const canSubmitValues = () => {
    const { accountCode, accountName, accountNumber, bankBalance, bankName, description } = values;
    return accountCode.length > 0 && accountName.length > 0 && accountNumber.length > 0 && bankBalance.length > 0 && bankName.length > 0 && description.length > 0;
  }
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleDateChange = (date, formatted, name) => { 
    // setForm(_.set({...form}, name, reformattedDate(date)))
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6">
            {budgetDialog.type === 'new' ? 'Add Budgeting' : 'Edit Budgeting'}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <form className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  id="standard-accountCode"
                  label="Account Code"
                  type="number"
                  variant="outlined"
                  size="small"
                  className={classes.textField}
                  value={values.accountCode}
                  onChange={handleChange('accountCode')}
                  margin="normal"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    format="MM/dd/yyyy"
                    margin="normal"
                    inputVariant="outlined"
                    name="startDate"
                    id="date-picker-startDate"
                    label="Start Date"
                    value={values.startDate}
                    onChange={(date, formatted) => handleDateChange(date, formatted, 'startDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="contact"
                  name="contact"
                  placeholder="Select Contact / Company"
                  select
                  fullWidth
                  className={classes.textField}
                  variant="outlined"
                  size="small"
                  label="Contact / Company"
                  value={values.contact}
                  onChange={handleChange}
                >
                  <MenuItem key={0} value="3">
                    No record
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" startIcon={<CloudDownloadIcon />}>Generate from previous year</Button>
              </Grid>
              <Grid item xs={12}>
   
              </Grid>
            </Grid>
          </form>
        </CardContent>
        <CardActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {}}
              color="primary"
              variant="contained"
              disabled={!canSubmitValues()}
            >
              Save
            </Button>
          )}
          <Button
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

NewBudgeting.propTypes = {
  loading: PropTypes.bool,
  budgetDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
  budgetDialog: Selectors.makeSelectBudgetingDialog(),
});



function mapDispatchToProps(dispatch) {
  return {
    createNewBudgeting: evt => dispatch(Actions.createNewBudgeting(evt)),
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
)(NewBudgeting);