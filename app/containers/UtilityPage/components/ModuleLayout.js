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
  },
  appBar: {
    background: `${theme.palette.primary.main} url(${navBarImage}) no-repeat right top`,
    backgroundSize: "100%",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 2, 3, 0),
  },
  active: { 
    backgroundColor: theme.palette.common.white,  
    color: `${darken(theme.palette.primary.main, 0.5)} !important`,
  },
}));


function ModuleLayout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <React.Fragment>
            <NavLink exact to="/dashboard" activeClassName={classes.active}>
              Project
            </NavLink>
            <NavLink to="/dashboard/chats" activeClassName={classes.active}>
              Chats
            </NavLink>
            <NavLink to="/dashboard/tasks" activeClassName={classes.active}>
              Tasks
            </NavLink>
            <NavLink to="/dashboard/folders" activeClassName={classes.active}>
              Files
            </NavLink>
          </React.Fragment>
        }
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
