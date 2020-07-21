import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import NoteAdd from '@material-ui/icons/NoteAdd';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: {
    marginLeft: theme.spacing(2)
  },
  icon: {}
}));

export function AddFile(props) {
  const { openFileDialog, openFolderDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New File">
        <Button
          className={classes.button}
          onClick={openFileDialog}
          color="primary"
          size="small"
          variant="contained"
          startIcon={<Add className={classes.icon} />}
        >
          New File
        </Button>
      </Tooltip>
      <Tooltip title="New Folder">
        <Button
          className={classes.button}
          onClick={openFolderDialog}
          variant="contained"
          size="small"
          color="primary"
          startIcon={<Add className={classes.icon} />}
        >
          New Folder
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddFile.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewBranchDialogAction: PropTypes.func,
};
