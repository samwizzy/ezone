import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Typography,
  Grid,
  makeStyles,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  fade,
  darken,
} from '@material-ui/core/styles/colorManipulator';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import * as Actions from '../actions';
import UserMenu from '../../../components/layouts/shared-components/UserMenu';
import SideBar from './SideBar'
import MenuBar from '../../../components/MenuBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0),
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
            <NavLink exact to="/hr/employees" activeClassName={classes.active}>
              Employees
            </NavLink>
            <NavLink to="/hr/departments" activeClassName={classes.active}>
              Departments
            </NavLink>
            <NavLink to="/hr/branches" activeClassName={classes.active}>
              Branches
            </NavLink>
            <NavLink to="/hr/roles" activeClassName={classes.active}>
              Roles
            </NavLink>
          </React.Fragment>
        }
        content={
          <Grid container>
            {/* <Grid item xs={2} md={2}>
              <SideBar />
            </Grid> */}
            <Grid item xs={12} md={12}>
              {props.children}
            </Grid>
          </Grid>
        }
      />
    </div>
  );
}

ModuleLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(ModuleLayout),
);
