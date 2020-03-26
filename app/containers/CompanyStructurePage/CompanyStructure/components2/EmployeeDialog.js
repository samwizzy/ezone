import React, { memo, useEffect } from 'react'; // eslint-disable-next-line no-unused-expressions
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Divider,
  TextField,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  MenuItem,
  Slide,
} from '@material-ui/core';
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';
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
    width: 200,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeeDialog = props => {
  const {
    loading,
    addEmployeeToPositionDialog,
    dispatchCloseAddEmployeeToPositionDialogAction,
    AllUserData,
    dispatchAddEmployeeToPositionAction,
    params,
  } = props;

  console.log(params, 'params');

  const classes = useStyles();
  const [values, setValues] = React.useState({
    positionId: params.positionId,
    userId: '',
  });

  const handleSelectChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const canBeSubmitted = () => {
    const { userId } = values;
    return userId !== '';
  };

  return (
    <div>
      <Dialog
        {...addEmployeeToPositionDialog.props}
        onClose={dispatchCloseAddEmployeeToPositionDialogAction}
        keepMounted
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {addEmployeeToPositionDialog.type === 'new'
            ? 'New Employee'
            : 'Edit Employee'}
        </DialogTitle>

        <Divider />

        <DialogContent>
          {addEmployeeToPositionDialog.type === 'new' ? (
            <div>
              <TextField
                id="select-head"
                select
                fullWidth
                variant="outlined"
                label="Select Employee"
                className={classes.textField}
                value={values.userId}
                onChange={handleSelectChange('userId')}
              >
                {AllUserData &&
                  AllUserData.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.emailAddress} {option.lastName}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Button
              onClick={() => {
                dispatchAddEmployeeToPositionAction(values);
              }}
              color="primary"
              variant="contained"
              disabled={!canBeSubmitted()}
            >
              {addEmployeeToPositionDialog.type === 'new' ? 'Save' : 'Update'}
            </Button>
          )}
          <Button
            onClick={() => dispatchCloseAddEmployeeToPositionDialogAction()}
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

EmployeeDialog.propTypes = {
  params: PropTypes.object,
  dispatchCloseAddEmployeeToPositionDialogAction: PropTypes.func,
  addEmployeeToPositionDialog: PropTypes.object,
  partyGroupData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  AllUserData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchAddEmployeeToPositionAction: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  addEmployeeToPositionDialog: Selectors.makeSelectAddEmployeeToPositionDialog(),
  partyGroupData: Selectors.makeSelectPartyGroupData(),
  AllUserData: Selectors.makeSelectAllUsersData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseAddEmployeeToPositionDialogAction: () =>
      dispatch(Actions.closeAddEmployeeToPositionDialog()),
    dispatchAddEmployeeToPositionAction: evt =>
      dispatch(Actions.addEmployeeToPosition(evt)),
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
)(EmployeeDialog);
