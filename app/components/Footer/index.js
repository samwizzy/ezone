import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import Wrapper from './Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.dark,
    [theme.breakpoints.up('sm')]: {},
  },
  footer: {
    padding: theme.spacing(3),
    marginTop: 'auto',
    '& p': {
      color: theme.palette.secondary.contrastText
    }
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.footer}>
        <Typography variant="body2" align="center">
          Copyright © 2020 Ezone
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
