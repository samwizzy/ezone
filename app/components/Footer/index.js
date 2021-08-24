import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CopyrightOutlinedIcon from '@material-ui/icons/CopyrightOutlined';

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
      color: theme.palette.secondary.contrastText,
    },
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.footer}>
        <Typography
          variant="body1"
          align="center"
          className={classes.typography}
        >
          <CopyrightOutlinedIcon color="inherit" fontSize="small" />{' '}
          <span>
            Copyright {new Date().getFullYear()} Ezone. All rights reserved.
          </span>
        </Typography>
      </div>
    </div>
  );
}

export default Footer;
