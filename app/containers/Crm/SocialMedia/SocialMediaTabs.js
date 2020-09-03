/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  AppBar,
  Backdrop,
  Box,
  Button,
  Container,
  CircularProgress,
  Grid,
  Icon,
  Paper,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  TextField,
} from '@material-ui/core';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'
import FbIcon from '../../../images/FbIcon.svg'
import Facebook from './socialMedias/Facebook'
import Instagram from './socialMedias/Instagram'
import Twitter from './socialMedias/Twitter'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  grid: {
    alignItems: 'center',
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
    "& .MuiGrid-root": {
      padding: theme.spacing(4),
      textAlign: 'center'
    },
    "& .MuiGrid-root:last-child": {
      borderLeft: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(4),
    }
  },
  toolbar: {
    justifyContent: 'center',
    ...theme.palette.toolbar
  },
  flex: {
    flexGrow: 1,
    margin: theme.spacing(2, 0),
    "& button": {
      marginTop: theme.spacing(1)
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

function SocialMediaTabs(props) {
  const { loading } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Facebook" {...a11yProps(0)} />
          <Tab label="Instagram" {...a11yProps(1)} />
          <Tab label="Twitter" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Facebook />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Instagram />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Twitter />
      </TabPanel>
    </div>
  );
}

SocialMediaTabs.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  socialMedia: Selectors.makeSelectFacebook(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocialMediaTabs);
