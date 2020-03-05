import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  Typography,
  Box, 
  Link,
  makeStyles,
  AppBar,
  Toolbar
} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { fade } from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../actions';
import Autorenew from '@material-ui/icons/Autorenew'
import UserMenu from '../../../components/layouts/shared-components/UserMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  navList: {
    '&.active': { 
      backgroundColor: fade(theme.palette.common.white, 0.5), 
      color: fade(theme.palette.common.white, 0.5)
    }
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2)
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
      '& button': {
        color: theme.palette.common.white,
        marginLeft: '50px',
        borderRadius: 0,
        textDecoration: 'none',
        '& :hover': {
          color: fade(theme.palette.common.white, 0.5)
        }
      }
    },
  }
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
  const { match, history, location } = props
  const { pathname } = location

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div className={classes.root}>
      <AppBar position="relative" color='secondary'>
        <Toolbar variant="dense" className={classes.toolbar}>

          <div>
            <IconButton aria-label="delete" onClick={refreshPage}>
              <Autorenew />
            </IconButton>

            <Button
              className={classNames(classes.navList, {'active': pathname === '/dashboard'})}
              component="button"
              onClick={() => {
                history.push('/dashboard')
              }}
            >
              Project
            </Button>
            <Button
              className={classNames(classes.navList, {'active': pathname === '/dashboard/chats'})}
              component="button"
              onClick={() => {
                history.push('/dashboard/chats')
              }}
            >
              Chats
            </Button>
            <Button
              className={classNames(classes.navList, {'active': pathname === '/dashboard/tasks'})}
              component="button"
              onClick={() => {
                history.push('/dashboard/tasks')
              }}
            >
              Tasks
            </Button>
            <Button
              className={classNames(classes.navList, {'active': pathname === '/dashboard/files'})}
              component="button"
              onClick={() => {
                history.push('/dashboard/files')
              }}
            >
              Files
            </Button>
          </div>

          <UserMenu />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        {props.children}
      </main>
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
  )(TabsPage));

