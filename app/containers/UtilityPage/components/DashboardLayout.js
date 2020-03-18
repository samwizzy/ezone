import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Typography,
  Box,
  makeStyles,
  AppBar,
  Toolbar,
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import {
  fade,
  darken,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import RefreshSharp from '@material-ui/icons/RefreshSharp';
import * as Actions from '../actions';
import UserMenu from '../../../components/layouts/shared-components/UserMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsPage(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { match, history, location } = props;
  const { pathname } = location;

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

            <NavLink exact to="/dashboard" activeClassName={classes.active}>
              Project
            </NavLink>
            <NavLink to="/dashboard/chats" activeClassName={classes.active}>
              Chats
            </NavLink>
            <NavLink to="/dashboard/tasks" activeClassName={classes.active}>
              Tasks
            </NavLink>
            <NavLink to="/dashboard/files" activeClassName={classes.active}>
              Files
            </NavLink>
          </div>

          <UserMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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

export default withRouter(
  compose(
    withConnect,
    memo,
  )(TabsPage),
);
