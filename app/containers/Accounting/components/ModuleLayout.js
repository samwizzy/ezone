import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import * as Actions from '../actions';
import UserMenu from '../../../components/layouts/shared-components/UserMenu';
import navBarImage from '../../../images/navbarImage.jpg';
import MenuBar from '../../../components/MenuBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100vh"
  },
  appBar: {
    background: `${theme.palette.primary.main} url(${navBarImage}) no-repeat right top`,
    backgroundSize: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 2, 3, 0),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      display: 'flex',
    },
    '& > div:first-child': {
      display: 'flex',
      justifyContent: 'space-between',
      color: theme.palette.common.white,
      '& a': {
        display: "block",
        color: theme.palette.common.white,
        marginLeft: '20px',
        borderRadius: theme.spacing(2, 2, 0, 0),
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'uppercase',
        padding: theme.spacing(0, 4),
        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
        },
        '& [class^="makeStyles-active"]': {
          color: `${darken(theme.palette.primary.main, 0.5)} !important`,
        },
        '&:active': {
          color: theme.palette.primary.main,
        },
        '&:focus': {
          color: darken(theme.palette.primary.main, 0.5),
        },
      },
    },
  },
  active: { 
    backgroundColor: theme.palette.common.white,  
    color: `${darken(theme.palette.primary.main, 0.5)} !important`,
  },
}));


function ModuleLayout(props) {
  const classes = useStyles();

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <MenuBar
        content={props.children}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUtilityTasks: evt => dispatch(Actions.getUtilityTasks(evt)),
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
)(ModuleLayout);
