import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import AddBox from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
  iconButton: {
    color: theme.palette.primary.main
  },
  icon: {}
}));


export function AddDepartment(props) {
  const { openNewTaskDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Department">
        <Button
          size="small"
          className={classes.iconButton}
          onClick={openNewTaskDialog}
        >
          <GroupAdd className={classes.icon} />
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddRole(props) {
  const { openNewTaskDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Role">
        <Button
          size="small"
          className={classes.iconButton}
          onClick={openNewTaskDialog}
        >
          <AssignmentInd className={classes.icon} /> Add Role
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddBranch(props) {
  const { openNewTaskDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Branch">
        <Button
          size="small"
          className={classes.iconButton}
          onClick={openNewTaskDialog}
        >
          <AddBox className={classes.icon} /> Add Branch
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddEmployee(props) {
  const { openFileDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Employee">
        <Button
          size="small"
          className={classes.iconButton}
          onClick={openFileDialog}
        >
          <PersonAdd className={classes.icon} />
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