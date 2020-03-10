/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';

import {
  withStyles,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Tabs,
  Tab,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  DialogTitle,
  Divider,
  Slide,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel
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



const AddItemDialog = props => {
  const {
    loading,
    addItemDialog,
    openAddItemDialogAction,
    closeAddItemDialogAction,
    saveAddItemContentsAction
  } = props;


  const classes = useStyles();
  
  const [values, setValues] = React.useState({
    addedBy: "",
    amount: "",
    amountForOneUnit: "",
    description: "",
    id: "",
    name: "",
    orgId: "",
    updatedBy: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };


  return (
    <div>
      <Dialog
        {...addItemDialog.props}
        onClose={closeAddItemDialogAction}
        keepMounted
        TransitionComponent={Transition}
        maxWidth={"xs"}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {addItemDialog.type === 'new' ? 'Add Item' : 'Edit Item'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {addItemDialog.type === 'new' ? (
            <div>
              <TextField
                id="standard-amount"
                label="Amount"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.amount}
                onChange={handleChange('amount')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-amountForOneUnit"
                label="Amount for one unit"
                type="number"
                variant="outlined"
                className={classes.textField}
                value={values.amountForOneUnit}
                onChange={handleChange('amountForOneUnit')}
                margin="normal"
                fullWidth
              />
              <TextField
                id="standard-name"
                label="Item"
                variant="outlined"
                className={classes.textField}
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
                fullWidth
              />
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => { saveAddItemContentsAction(values), closeAddItemDialog()}}
              color="primary"
              variant="contained"
              // disabled={!canBeSubmitted()}
            >
              Save Item
            </Button>
          )}
          <Button
            onClick={() => closeAddItemDialogAction()}
            color="primary"
            variant="contained"
          >
            Cancel item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddItemDialog.propTypes = {
  loading: PropTypes.bool,
  AddItemDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(), 
  addItemDialog: Selectors.makeSelectItemDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeAddItemDialogAction: () => dispatch(Actions.closeAddItemDialog()),
    openAddItemDialogAction: () => dispatch(Actions.openAddItemDialog()),
    saveAddItemContentsAction: evt => dispatch(Actions.saveAddItemContents(evt)),
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
)(AddItemDialog);
