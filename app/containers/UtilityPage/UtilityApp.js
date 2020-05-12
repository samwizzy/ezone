import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {Box, Tabs, Tab, Typography} from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from './actions';
import MenuBar from '../../components/MenuBar'
import ChatApp from './ChatApp/Loadable'
import TasksApp from './TasksApp/Loadable'
import FilesApp from './FilesApp/Loadable'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(2),
  },
  active: { 
    backgroundColor: theme.palette.common.white,  
    color: `${darken(theme.palette.primary.main, 0.1)} !important`,
  },
}));

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function UtilityApp({history, match, location}) {
  const classes = useStyles();
	const theme = useTheme();
  const [value, setValue] = React.useState('tasks');
	const mountTabValueFactory = (location, value) => (route) => !!matchPath(location.pathname, { path: route, exact: true }) ? value : Infinity;
	const getTabValue = mountTabValueFactory(location, value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  console.log(location, "location")
  console.log(match, "match")
  console.log(value, "tab value")
  console.log(getTabValue('/utility/tasks'), "getTabValue value")

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <Tabs
            style={{backgroundColor: '#fff'}}
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Chats" {...a11yProps('chats')} onClick={() => history.push(`${match.path}/chats`)} value='chats' />
            <Tab label="Tasks" {...a11yProps('tasks')} onClick={() => history.push(`${match.path}/tasks`)} value='tasks' />
            <Tab label="Files" {...a11yProps('files')} onClick={() => history.push(`${match.path}/files`)} value='files' />
          </Tabs>
        }
        content={   
					<div>
            <TabPanel value={value} index={'chats'} dir={theme.direction}>
              <ChatApp />
            </TabPanel>
            <TabPanel value={value} index={'tasks'} dir={theme.direction}>
              <TasksApp />
            </TabPanel>
            <TabPanel value={value} index={'files'} dir={theme.direction}>
              <FilesApp />
            </TabPanel>
					</div>
        }
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
});

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
)(UtilityApp);
