import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { IconButton, Tooltip, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';
import * as Actions from '../../actions';

const defaultToolbarStyles = {
  iconButton: {},
};

// eslint-disable-next-line react/prop-types
export function AddButton(props) {
  const { classes, openNewEmployeeDialogAction } = props;

  return (
    <React.Fragment>
      <Tooltip title="New User">
        <Button
          variant="contained"
          color="primary"
          onClick={() => openNewEmployeeDialogAction()}
          startIcon={<Add />}
        >
          Add User
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddButton.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialogAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewBranchDialogAction: () => dispatch(Actions.openNewEmployeeDialog()),
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
