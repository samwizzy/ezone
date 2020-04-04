import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  withStyles,
  AppBar,
  Box,
  ClickAwayListener,
  Toolbar,
  Grid,
  Grow,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  TextField,
  Tabs,
  Tab,
  Icon,
  Divider,
  MenuItem,
  MenuList,
  Button,
  ButtonGroup,
  Paper,
  Popper,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import TextEditor from './components/TextEditor';
import PaletteTwoToneIcon from '@material-ui/icons/PaletteTwoTone';
import AddIcon from '@material-ui/icons/Add';
import Invoice from './templates/Invoice'
import Welcome from './templates/Welcome'
import NoTemplate from './templates/NoTemplate'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const EmailTemplate = props => {
  const classes = useStyles();
  const { params } = props.match

  switch(params.emailType){
    case "password":
      return <NoTemplate />
      break;
    case "welcome":
      return  <Welcome />
      break;
    case "invoice":
      return  <Invoice />
      break;
    default:
      return <Welcome />
  }
};

EmailTemplate.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(EmailTemplate);
