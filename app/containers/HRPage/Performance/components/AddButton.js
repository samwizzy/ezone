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

export function AddRecognition(props) {
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
          New Recognition
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AddFeedback(props) {
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
          New Feedback
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
export function AddReview(props) {
  const { openDialog } = props;
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title="New Review">
        <Button
          size="small"
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={openDialog}
          startIcon={<Add className={classes.icon} />}
          disableElevation
        >
          New Review
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}

AddRecognition.prototypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.func,
};