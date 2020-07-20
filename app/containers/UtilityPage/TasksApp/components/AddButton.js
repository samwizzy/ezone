import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: {
    marginLeft: theme.spacing(2)
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
          color="primary"
          size="small"
          className={classes.button}
          onClick={openNewTaskDialog}
          variant="contained"
          startIcon={<Add className={classes.icon} />}
        >
          Add Task
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddTask.prototypes = {
  classes: PropTypes.object.isRequired,
};
