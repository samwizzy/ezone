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
import UserMenu from '../../../../components/layouts/shared-components/UserMenu';

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
      <AppBar position="relative" color="secondary">
        <Toolbar variant="dense" className={classes.toolbar}>
          <div>
            <IconButton aria-label="delete" onClick={refreshPage}>
              <RefreshSharp />
            </IconButton>

            <NavLink exact to="/items" activeClassName={classes.active}>
              Items
            </NavLink>
            <NavLink to="/transfer/orders" activeClassName={classes.active}>
              Transfer Orders
            </NavLink>
          </div>

          <UserMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Grid container>
          <Grid item xs={12}>
            {props.children}
          </Grid>
        </Grid>
      </main>
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
