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
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import UserMenu from '../../../components/layouts/shared-components/UserMenu';
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
            <NavLink
              exact
              to="/inventory/warehouses"
              activeClassName={classes.active}
            >
              Warehouse
            </NavLink>
            <NavLink
              exact
              to="/inventory/items"
              activeClassName={classes.active}
            >
              Items
            </NavLink>
            <NavLink
              to="/inventory/transfer/orders"
              activeClassName={classes.active}
            >
              Transfer Orders
            </NavLink>
            <NavLink
              to="/inventory/inventory/adjustments"
              activeClassName={classes.active}
            >
              Inventory Adjustments
            </NavLink>
          </React.Fragment>
        }
        content={
          <Grid container>
            <Grid item xs={12}>
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
