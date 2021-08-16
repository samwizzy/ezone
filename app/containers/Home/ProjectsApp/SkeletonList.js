import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(2),
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: theme.palette.grey[50],
    },
    '&::-webkit-scrollbar-track': {
      '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
      backgroundColor: theme.palette.primary.main,
    },
  },
  box: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    flex: '0 1 11.1em',
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: '10px',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  image: {
    width: '70px',
    height: '70px',
    marginBottom: theme.spacing(1),
  },
}));

function SkeletonList() {
  const classes = useStyles();

  return (
    <Paper square className={classes.paper} elevation={0}>
      {[...Array(8).keys()].map(i => (
        <Paper key={i} className={classes.box}>
          <Skeleton
            variant="circle"
            width="70px"
            height="70px"
            className={classes.image}
          />

          <Typography variant="body2">
            <Skeleton variant="text" width="100px" />
            <Skeleton variant="text" width="100px" />
          </Typography>
        </Paper>
      ))}
    </Paper>
  );
}

export default SkeletonList;
