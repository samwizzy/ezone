import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: { marginLeft: theme.spacing(1) },
  icon: {}
}));

export function AddAttendance(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Attendance">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<BeenhereOutlinedIcon className={classes.icon} />}
          disableElevation
        >
          Mark Attendance
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AddShift(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Shift">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<Add className={classes.icon} />}
          disableElevation
        >
          New Shift
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AssignShift(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="Assign Shift">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<BeenhereOutlinedIcon className={classes.icon} />}
          disableElevation
        >
          Assign Shift
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddAttendance.prototypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.func,
};