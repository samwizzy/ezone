/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import {
  Button,
  IconButton,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Slide,
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close"
import * as Selectors from '../../selectors';
import * as Actions from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDeleteEmployeeDialog = props => {
  const {
    loading,
    employees,
    confirmDeleteDialog,
    closeConfirmDeleteEmployeeDialog,
    deleteEmployee,
  } = props;

  const handleSubmit = () => {
    if(confirmDeleteDialog.data){
      deleteEmployee(confirmDeleteDialog.data)
    }
  }

  const selectedEmployee = employees && employees.find(emp => emp.id === confirmDeleteDialog.data)

  console.log(confirmDeleteDialog, 'confirmDeleteDialog');

  return (
    <Dialog
      {...confirmDeleteDialog.props}
      onClose={closeConfirmDeleteEmployeeDialog}
      keepMounted
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="alert-dialog-slide-title">
        <div className="flex items-center justify-between">
          <span>Delete user</span>
          <IconButton onClick={closeConfirmDeleteEmployeeDialog}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>
        <div className="w-full py-3 text-center">
          <h2 className="text-gray-800 text-2xl font-medium">
            Are you sure?
          </h2>
          <p className="text-base text-gray-700">
            Do you really want to delete{" "}
            {selectedEmployee && (selectedEmployee.fullName)}?{" "}
            This process cannot be undone
          </p>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading ? loading : !confirmDeleteDialog.data}
          endIcon={loading && <CircularProgress size={16} />}
        >
          Delete
        </Button>
        <Button
          onClick={() => closeConfirmDeleteEmployeeDialog()}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteEmployeeDialog.propTypes = {
  loading: PropTypes.bool,
  confirmDeleteDialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  confirmDeleteDialog: Selectors.makeSelectConfirmDeleteDialog(),
  employees: Selectors.makeSelectGetAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    deleteEmployee: data => dispatch(Actions.deleteEmployee(data)),
    closeConfirmDeleteEmployeeDialog: () => dispatch(Actions.closeConfirmDeleteEmployeeDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ConfirmDeleteEmployeeDialog);
