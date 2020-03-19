import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { IconButton, Tooltip, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';
import * as Actions from '../actions';

const defaultToolbarStyles = {
  iconButton: {},
};

// eslint-disable-next-line react/prop-types
export function AddWarehouse(props) {
  const { classes, openNewWarehouseDialogAction } = props;

  return (
    <React.Fragment>
      <Tooltip title="New User">
        <Button
          variant="contained"
          color="primary"
          onClick={() => openNewWarehouseDialogAction()}
        >
          Add User
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddWarehouse.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewWarehouseDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    // openNewWarehouseDialogAction: () => dispatch(Actions.openNewWarehouseDialog()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(defaultToolbarStyles, { name: 'CustomToolbar' }),
  withConnect,
  memo,
)(AddWarehouse);
