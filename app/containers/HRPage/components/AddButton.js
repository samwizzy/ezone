import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import GroupAdd from '@material-ui/icons/GroupAdd';

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
      <Tooltip title="New Task">
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
      <Tooltip title="New Task">
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