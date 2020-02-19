import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  Typography,
  Box, 
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Toolbar
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import HomeTab from './HomeTab';
import ChatTab from './../ChatApp/ChatTab';
import TasksList from './../TasksApp/TasksList';
import FilesList from './../FilesApp/FilesList';
import Autorenew from '@material-ui/icons/Autorenew'
import UserMenu from '../../../components/layouts/shared-components/UserMenu'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: '10px 25px',
    borderRadius: '20px 20px 0 0',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    '& > div': {
      display: 'flex'
    }
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Toolbar variant="dense" className={classes.toolbar}>

          <div>
            <IconButton aria-label="delete">
              <Autorenew />
            </IconButton>

            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              indicatorColor="primary"
              centered
            >
              <Tab label="Project" {...a11yProps(1)} />
              <Tab label="Chats" {...a11yProps(2)} />
              <Tab label="Tasks" {...a11yProps(2)} />
              <Tab label="File" {...a11yProps(2)} />
            </Tabs>
          </div>

          <UserMenu />

        </Toolbar>
      </AppBar>

      <TabPanel value={value} index={0}>
        <HomeTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChatTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TasksList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FilesList />
      </TabPanel>
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

export default compose(
  withConnect,
  memo,
)(TabsPage);
