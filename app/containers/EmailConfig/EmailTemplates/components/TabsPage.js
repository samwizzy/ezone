import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Toolbar,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../App/actions';
import UserMenu from '../../../components/layouts/shared-components/UserMenu';
import EmailConfigs from './EmailConfigs';
import SMSConfigs from './SMSConfigs';

const useStyles = makeStyles(theme => ({}));

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

function TabsPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar variant="dense" className={classes.toolbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            centered
          >
            <Tab label="Email Configuration" {...a11yProps(0)} />
            <Tab label="SMS Configuration" {...a11yProps(1)} />
          </Tabs>

          <UserMenu />
        </Toolbar>
      </AppBar>

      <TabPanel value={value} index={0}>
        <EmailConfigs />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SMSConfigs />
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
    loginAction: evt => dispatch(Actions.loginAction(evt)),
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
