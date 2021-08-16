import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    border: `2px dotted ${theme.palette.divider}`,
    marginTop: theme.spacing(2),
    padding: theme.spacing(4),
    textAlign: 'center',
  },
}));

const DataMessage = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1">
        <SentimentVeryDissatisfiedIcon />
        {message}
      </Typography>
    </div>
  );
};

export default DataMessage;
