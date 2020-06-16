import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: { marginLeft: theme.spacing(1) },
  autoComplete: { marginLeft: theme.spacing(1), width: 250, display: 'inline-flex' },
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
  const { openDialog, shifts, selectUsersByShift, shift } = props;
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
      <Autocomplete
        id="combo-box-demo"
        size="small"
        options={shifts ? shifts : []}
        getOptionLabel={option => option.shiftName}
        onChange={selectUsersByShift}
        className={classes.autoComplete}
        renderInput={params => (
          <TextField
            {...params}
            label="Shift"
            variant="outlined"
            placeholder="Search"
            value={shift}
          />
        )}
      />
    </React.Fragment>
  );
}

AddAttendance.prototypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.func,
};