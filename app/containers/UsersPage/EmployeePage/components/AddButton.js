import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Tooltip, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import * as Actions from '../../actions';

const styles = {
  button: {},
};

// eslint-disable-next-line react/prop-types
export function AddButton(props) {
  const { classes, openNewEmployeeDialog } = props;

  return (
    <Tooltip title="New User">
      <Button
        style={{ marginLeft: "8px" }}
        variant="contained"
        color="primary"
        onClick={openNewEmployeeDialog}
        startIcon={<Add />}
      >
        Add User
      </Button>
    </Tooltip>
  );
}

AddButton.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewEmployeeDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    openNewEmployeeDialog: () => dispatch(Actions.openNewEmployeeDialog()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
  memo,
)(AddButton);
