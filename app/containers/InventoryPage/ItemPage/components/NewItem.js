/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  TextField,
  Grid,
  FormControlLabel,
  Radio,
  Divider,
  Button,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import * as UtilityActions from '../../../UtilityPage/actions';
// import * as UtilitySelectors from '../../../UtilityPage/selectors';
// import * as Actions from '../actions';
// import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import { CheckBox } from '@material-ui/icons';
// import { AddWarehouse } from './AddWarehouse';

const useStyles = makeStyles(theme => ({
  container: {
    width: 400,
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

const NewItem = props => {
  const classes = useStyles();

  const {
    loading,
    // openNewWarehouseDialogAction,
    // getAllUsersAction,
    // openEditEmployeeDialogAction,
    // openViewEmployeeDialogAction,
  } = props;

  useEffect(() => {
    // getAllUsersAction();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={6}>
          <div className={classes.container}>
            <FormControlLabel
              value="Goods"
              control={<Radio color="primary" />}
              label="Goods"
              labelPlacement="start"
            />
            <FormControlLabel
              value="Service"
              control={<Radio color="primary" />}
              label="Service"
              labelPlacement="start"
            />
            <TextField
              id="outlined-Name" 
              label="Name"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField 
              id="outlined-SKU" 
              label="SKU"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField 
              id="outlined-Unit" 
              label="Unit"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          Image Upload
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={6}>
          <div className={classes.container}>
            <TextField
              id="outlined-Dimensions" 
              label="Dimensions (cm)"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-Manufacturer" 
              label="Manufacturer"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-UPC"
              label="UPC"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-EAN"
              label="EAN"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className={classes.container}>
            <TextField
              id="outlined-Weight" 
              label="Weight (kg)"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-Brand" 
              label="Brand"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-MPN"
              label="MPN"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-ISBN"
              label="ISBN"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={12} md={6} lg={6}>
          <div className={classes.container}>
            <FormControlLabel
              value="Sales Information"
              control={<CheckBox color="primary" />}
              label="Sales Information"
              labelPlacement="start"
            />
            <TextField
              id="outlined-Selling-Price" 
              label="Selling Price"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField 
              id="outlined-Account" 
              label="Account"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField 
              id="outlined-Description"
              label="Description"
              fullWidth 
              // onChange={} 
              variant="outlined"
              multiline
              rows={3}
              className={classes.textField}
            />
            <TextField 
              id="outlined-Tax"
              label="Tax "
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <div className={classes.container}>
            <FormControlLabel
              value="Purchase Information"
              control={<CheckBox color="primary" />}
              label="Sales Information"
              labelPlacement="start"
            />
            <TextField
              id="outlined-Cost-Price"
              label="Cost Price"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-Account"
              label="Account"
              fullWidth 
              // onChange={} 
              variant="outlined"
              className={classes.textField}
            />
            <TextField
              id="outlined-Description"
              label="Description"
              fullWidth 
              // onChange={} 
              variant="outlined"
              multiline
              rows={3}
              className={classes.textField}
            />
          </div>
        </Grid>
      </Grid>
      <Divider />
      <div className={classes.buttonStyle}>
        <Button
          onClick={() => {
            // dispatchCreateNewEmployeeAction(values);
          }}
          color="primary"
          variant="contained"
          // disabled={!canBeSubmitted()}
        >
                Save
        </Button>

        <Button
          // onClick={() => closeNewWarehouseDialogAction()}
          color="primary"
          variant="contained"
        >
              Cancel
        </Button>
      </div>
    </React.Fragment>
  );
};

NewItem.propTypes = {
  loading: PropTypes.bool,
  getAllEmployees: PropTypes.array,
  openNewWarehouseDialogAction: PropTypes.func,
  // openEditEmployeeDialogAction: PropTypes.func,
  // openViewEmployeeDialogAction: PropTypes.func,
  getAllUsersAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
  // getAllEmployees: Selectors.makeSelectGetAllEmployees(),
  // getAllEmployees: UtilitySelectors.makeSelectAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getAllUsersAction: () =>
    //   dispatch(UtilityActions.getAllUsers()),
    // openNewWarehouseDialogAction: () =>
    //   dispatch(Actions.openNewWarehouseDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewItem);
