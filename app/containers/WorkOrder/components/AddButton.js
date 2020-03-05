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
export function AddButton(props) {
  const { classes, openNewWorkOrderDialogAction, openVendorDialogAction } = props;

  return (
    <React.Fragment>
      <Tooltip title="Vendor">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => openVendorDialogAction()}
        >
          Create Vendor
        </Button>
      </Tooltip>
      <Tooltip title="Work Order">
        <Button
          variant="contained"
          color="primary"
          onClick={() => openNewWorkOrderDialogAction()}
        >
          Create Work Order
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddButton.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewWorkOrderDialogAction: PropTypes.func,
  closeWorkOrderDialogAction: PropTypes.func,
  openVendorDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  console.log('mapDispatchToProps');
  console.log(`dispatch ${dispatch}`);
  return {
    // openNewWorkOrderDialogAction: () => dispatch(Actions.openCreateWorkOrderDialog()),
    // df: () => dispatch(Actions.openCreateWorkOrderDialog()),
    // openVendorDialogAction: () => dispatch(Actions.openCreateWorkOrderDialog()),
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
)(AddButton);
