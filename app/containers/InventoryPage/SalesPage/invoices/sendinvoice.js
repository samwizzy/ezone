import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import SendIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import { Grid, Button, TextField, MenuItem, Select, Menu, IconButton, Divider } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


const SendInvoice = () => {
  const classes = useStyles();

  return (
    <div>

    </div>
  );
}

export default SendInvoice;