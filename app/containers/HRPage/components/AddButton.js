import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import AddBox from '@material-ui/icons/AddBox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: { marginLeft: theme.spacing(1) },
  icon: {}
}));


export function AddDepartment(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Department">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<GroupAdd className={classes.icon} />}
          disableElevation
        >
          New
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AddRole(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Role">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<AssignmentInd className={classes.icon} />}
          disableElevation
        >
          Add Role
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddBranch(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Branch">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<AddBox className={classes.icon} />}
          disableElevation
        >
          Add Branch
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddEmployee(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Employee">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<PersonAdd className={classes.icon} />}
          disableElevation
        >
          New
        </Button>
      </Tooltip>
      <Tooltip title="Upload CSV">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<CloudUploadIcon className={classes.icon} />}
          disableElevation
        >
          Upload CSV
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

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
          startIcon={<PersonAdd className={classes.icon} />}
          disableElevation
        >
          New
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddPayroll(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Payroll">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<PersonAdd className={classes.icon} />}
          disableElevation
        >
          New
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddAnnouncement(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Announcement">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<Add className={classes.icon} />}
          disableElevation
        >
          New
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddRole.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewBranchDialogAction: PropTypes.func,
};
AddEmployee.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewBranchDialogAction: PropTypes.func,
};
AddDepartment.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewBranchDialogAction: PropTypes.func,
};