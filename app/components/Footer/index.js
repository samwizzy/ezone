import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import Wrapper from './Wrapper';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.text.secondary,
    [theme.breakpoints.up('sm')]: {
    },
  },
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    boxShadow: theme.shadows[0],
    background: 'none',
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container component="main" maxWidth="md">
          <Grid item xs={12} className={classes.footer}>
            <Paper className={classes.paper}>
              <Typography
                variant="body2"
                align="center"
              >
                Copyright © 2020 Ezone
              </Typography>
            </Paper>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Footer;
