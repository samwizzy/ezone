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
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 0),
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
      '& a': {
        color: theme.palette.common.white,
        marginLeft: '20px',
        borderRadius: 0,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        textTransform: 'uppercase',
        padding: theme.spacing(1),
        '& :hover': {
          color: fade(theme.palette.common.white, 0.5),
          backgroundColor: 'red',
        },
      },
    },
  },
  active: { backgroundColor: darken(theme.palette.primary.main, 0.25) },
}));

function ModuleLayout(props) {
  const classes = useStyles();

  const refreshPage = () => {
    window.location.reload(false);
  };

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
            <Grid item xs={2} md={2}>
              <SideBar />
            </Grid>
            <Grid item xs={10} md={10}>
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
