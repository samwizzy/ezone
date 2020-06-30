import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../actions';
import MenuBar from '../../../components/MenuBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  active: {
    backgroundColor: theme.palette.common.white,
    color: `${darken(theme.palette.primary.main, 0.1)} !important`,
  },
}));


function ModuleLayout(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <React.Fragment>
            <NavLink to="/chats" activeClassName={classes.active}>
              Chats
            </NavLink>
            <NavLink to="/task-manager/tasks" activeClassName={classes.active}>
              Tasks
            </NavLink>
            <NavLink to="/file-manager/folders" activeClassName={classes.active}>
              Files
            </NavLink>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            {props.children}
          </div>
        }
      />
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
)(ModuleLayout);
