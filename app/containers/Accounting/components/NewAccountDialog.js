/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

import {
  TextField,
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

import * as Selectors from '../selectors';
import * as Actions from '../actions';
import LoadingIndicator from '../../../components/LoadingIndicator';

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
  return <Slide direction="right" ref={ref} {...props} />;
});

const NewAccountDialog = props => {
  const { 
    loading, 
    accountDialog, 
    closeNewAccountDialogAction,
    accountTypeData,
    detailTypeData,
    dispatchGetDetailTypeAction 
  } = props;

  console.log('accountTypeData: ', accountTypeData);

  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: '',
    amount: '',
    totalAmount: '',
    description: '',
    orgId: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSelectChange = (name, value) => {
    console.log('selected value: ', value);
    // setValues({ ...values, vendor: value });

    dispatchGetDetailTypeAction();
  };

  return (
    <div>
      <Dialog
        {...accountDialog.props}
        onClose={closeNewAccountDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={'xs'}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {accountDialog.type === 'new' ? 'New Account' : 'Edit Account'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {accountDialog.type === 'new' ? (
            <div>
              <TextField
                id="standard-name"
                label="Account Name"
                type="name"
                variant="outlined"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amount"
                label="Account Code"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.amount}
                onChange={handleChange('amount')}
                margin="normal"
                fullWidth
              />
              <Autocomplete
                id="combo-box-demo"
                options={accountTypeData}
                getOptionLabel={option => option.type}
                onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Account Type"
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
              />
              <Autocomplete
                id="combo-box-demo"
                // options={accountTypeData}
                // getOptionLabel={option => option.type}
                // onChange={(evt, value) => handleSelectChange(evt, value)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Select Detail Type"
                    variant="outlined"
                    placeholder="Search"
                    fullWidth
                  />
                )}
              />
              <TextField
                id="standard-description"
                label="Description"
                variant="outlined"
                className={classes.textField}
                value={values.description}
                onChange={handleChange('description')}
                margin="normal"
                fullWidth
                rows={2}
                multiline
              />
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                openNewAccountDialogAction();
              }}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save Account
            </Button>
          )}
          <Button
            onClick={() => {
              closeNewAccountDialogAction();
            }}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

NewAccountDialog.propTypes = {
  loading: PropTypes.bool,
  accountDialog: PropTypes.object,
  accountTypeData: PropTypes.array,
  detailTypeData: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accountDialog: Selectors.makeSelectNewAccountDialog(),
  accountTypeData: Selectors.makeSelectAccountTypeData(),
  detailTypeData: Selectors.makeSelectDetailTypeData(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewAccountDialogAction: () => dispatch(Actions.openNewAccountDialog()),
    closeNewAccountDialogAction: () => dispatch(Actions.closeNewAccountDialog()),
    dispatchGetDetailTypeAction: evt => dispatch(Actions.getDetailTypeAction(evt)),
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
)(NewAccountDialog);
