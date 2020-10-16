import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import AddIcon from '@material-ui/icons/Add';
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
          color="primary"
          variant="contained"
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
          color="primary"
          variant="contained"
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
          color="primary"
          variant="contained"
          onClick={openDialog}
          startIcon={<AddIcon className={classes.icon} />}
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
          color="primary"
          variant="contained"
          onClick={openDialog}
          startIcon={<PersonAdd className={classes.icon} />}
          disableElevation
        >
          New
        </Button>
      </Tooltip>
      <Tooltip title="Upload CSV">
        <Button
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
          color="primary"
          variant="contained"
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
          color="primary"
          variant="contained"
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
          color="primary"
          variant="contained"
          onClick={openDialog}
          startIcon={<AddIcon className={classes.icon} />}
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
