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
