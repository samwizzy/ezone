import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import SendIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  Menu,
  IconButton,
  Divider,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { ReceiptContext } from '.';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  total: {
    ...theme.typography.button,
    width: '290px',
    backgroundColor: theme.palette.background.paper,
    backgroundColor: '#bbb',
    padding: theme.spacing(1),
  },
  flex: {
    position: 'relative',
    padding: theme.spacing(8, 5),
  },
  paperBase: {
    padding: '15px',
  },
  littleMargin: {
    marginBottom: '10px',
  },
  base: {
    paddingTop: '5px',
    paddingLeft: '5px',
    paddingRight: '5px',
    marginBottom: '20px',
  },
  pap: {
    padding: '8px',
    marginBottom: '15px',
  },
  papy: {
    padding: '12px',
  },
  controlButtons: {
    float: 'right',
  },
  divContent: {
    textAlign: 'center',
    margin: '3px',
  },
  divRight: {
    float: 'right',
    padding: '5px',
  },
  pushForward: {
    marginTop: '10em',
  },
}));

const SendReceipt = () => {
  const classes = useStyles();
  const receiptContext = useContext(ReceiptContext);
  return <div className={classes.base} />;
};

export default SendReceipt;
