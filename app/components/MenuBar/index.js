import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  IconButton,
  Typography,
  makeStyles,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import UserMenu from '../layouts/shared-components/UserMenu';
import navBarImage from '../../images/navbarImage.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    background: `${theme.palette.primary.main} url(${navBarImage}) no-repeat right top`,
    backgroundSize: "100%",
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3, 2, 3, 0),
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


function MenuBar(props) {
  const classes = useStyles();

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" color="inherit" className={classes.appBar}>
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
        <Container>
          {props.content}
        </Container>
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
