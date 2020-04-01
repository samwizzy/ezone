import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

const useStyles = makeStyles(theme => ({
  iconButton: {
    color: theme.palette.primary.main,
  },
  icon: {}
}));


export function AddTask(props) {
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
          <Add className={classes.icon} /> Add Task
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

export function AddFile(props) {
  const { openFileDialog, openFolderDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New File">
        <IconButton
          className={classes.iconButton}
          onClick={openFileDialog}
        >
          <NoteAdd className={classes.icon} />
        </IconButton>
      </Tooltip>
      <Tooltip title="New Folder">
        <IconButton
          className={classes.iconButton}
          onClick={openFolderDialog}
        >
          <CreateNewFolderIcon className={classes.icon} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

AddTask.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewBranchDialogAction: PropTypes.func,
};