import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: { marginLeft: theme.spacing(1) },
  icon: {}
}));

export function AddLeaveRequest(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Leave Request">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<Add className={classes.icon} />}
          disableElevation
        >
          New Leave Request
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AddLeaveType(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Leave Type">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<Add className={classes.icon} />}
          disableElevation
        >
          New Leave Type
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AddHoliday(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Holiday">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<Add className={classes.icon} />}
          disableElevation
        >
          New Holiday
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddLeaveRequest.prototypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.func,
};