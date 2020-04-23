import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  Card, 
  CardContent, 
  CardActions,
  TextField,
  Typography,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Divider,
  Slide,
  Grid,
} from '@material-ui/core';

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

const AddBudgeting = props => {
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

  return (
    <div>
      <Card className={classes.card}>
        <Typography variant="h6">
          {budgetDialog.type === 'new' ? 'Add Budgeting' : 'Edit Budgeting'}
        </Typography>
        <Divider />
        <CardContent>
          {budgetDialog.type === 'new' ? (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-accountName"
                    label="Account Name"
                    type="name"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.accountName}
                    onChange={handleChange('accountName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
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
                  <TextField
                    id="standard-bankName"
                    label="Bank Name"
                    type="name"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.bankName}
                    onChange={handleChange('bankName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-accountNumber"
                    label="Bank Account Number"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.accountNumber}
                    onChange={handleChange('accountNumber')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-bankBalance"
                    label="Bank balance"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.bankBalance}
                    onChange={handleChange('bankBalance')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-description"
                    label="Description"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="normal"
                    fullWidth
                    rows={2}
                    multiline
                  />
                </Grid>
              </Grid>
            </form>
          ) : (
            <form className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-accountName"
                    label="Account Name"
                    type="name"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.accountName}
                    onChange={handleChange('accountName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
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
                  <TextField
                    id="standard-bankName"
                    label="Bank Name"
                    type="name"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.bankName}
                    onChange={handleChange('bankName')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-accountNumber"
                    label="Bank Account Number"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.accountNumber}
                    onChange={handleChange('accountNumber')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-bankBalance"
                    label="Bank balance"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.bankBalance}
                    onChange={handleChange('bankBalance')}
                    margin="normal"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-description"
                    label="Description"
                    variant="outlined"
                    size="small"
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange('description')}
                    margin="normal"
                    fullWidth
                    rows={2}
                    multiline
                  />
                </Grid>
              </Grid>
            </form>
          )}
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
            color="inherit"
            variant="outlined"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

AddBudgeting.propTypes = {
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
)(AddBudgeting);