import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  IconButton,
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
  Paper,
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import UserMenu from '../layouts/shared-components/UserMenu';
import navBarImage from '../../images/navbarImage.jpg';

const drawerHeight = 48;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: `calc(100vh - ${drawerHeight}px)`,
  },
  appBar: {
    background: `${
      theme.palette.primary.main
    } url(${navBarImage}) no-repeat right top`,
    backgroundSize: 'cover',
    overflowY: 'hidden',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#F3F4F6', // transparent
    padding: theme.spacing(3, 2),
    minHeight: '100vh',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiIconButton-label': {
      color: theme.palette.common.white,
    },
    '& > div:first-child': {
      // flexGrow: 1,
      display: 'flex',
      color: theme.palette.common.white,
      '& a': {
        display: 'flex',
        color: theme.palette.common.white,
        marginLeft: '20px',
        marginBottom: '-4px',
        borderRadius: theme.spacing(2, 2, 0, 0),
        textDecoration: 'none',
        alignItems: 'center',
        textTransform: 'uppercase',
        padding: theme.spacing(0, 4),
        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
        },
        '& [class^="makeStyles-active"]': {
          color: `${darken(theme.palette.primary.main, 0.1)} !important`,
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
    color: `${darken(theme.palette.primary.main, 0.1)} !important`,
  },
}));

function MenuBar(props) {
  const classes = useStyles();

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="relative"
        elevation={0}
        color="inherit"
        className={classes.appBar}
      >
        <Toolbar variant="dense" className={classes.toolbar}>
          <div>
            <IconButton aria-label="delete" onClick={refreshPage}>
              <RefreshSharp />
            </IconButton>
            {props.navigations}
          </div>

          <UserMenu />
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <React.Fragment>{props.content}</React.Fragment>
      </main>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(MenuBar);
