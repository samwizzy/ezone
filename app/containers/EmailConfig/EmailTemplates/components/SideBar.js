import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  Hidden,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Skeleton from '@material-ui/lab/Skeleton';
import { green, orange } from '@material-ui/core/colors';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../actions';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth, // works better without position:fixed
      flexShrink: 0,
      overflowY: 'auto',
      height: '100vh',
      borderRight: `1px solid ${theme.palette.grey[100]}`,
      '& .MuiListSubheader-root': {
        backgroundColor: theme.palette.common.white,
      },
      '&::-webkit-scrollbar': {
        width: '6px',
        backgroundColor: '#F5F5F5',
      },
      '&::-webkit-scrollbar-track': {
        '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  toolbar2: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('sm')]: {
      minHeight: 20,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
}));

const menus = [
  { id: 1, name: 'Password Reset', url: 'password', icon: 'vpn_key' },
  {
    id: 2,
    name: 'New User Welcome Message',
    url: 'welcome',
    icon: 'person_add',
  },
  { id: 3, name: 'Signature Approval', url: 'signature', icon: 'fingerprint' },
  { id: 4, name: 'Invoice', url: 'invoice', icon: 'receipt' },
];

const SideBar = props => {
  const classes = useStyles();
  const { loading } = props;
  const [selectedIndex, setSelectedIndex] = React.useState('password');

  React.useEffect(() => {}, []);

  const handleSelectedById = url => {
    setSelectedIndex(url);
    props.history.push({ pathname: '/settings/email/template/' + url });
  };

  const drawer = (
    <div>
      <AppBar position="relative" color="inherit" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="primary">
            <PaletteOutlinedIcon /> Email Template
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <Toolbar className={classes.toolbar2} />
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="h6">Choose Template</Typography>
          </ListSubheader>
        }
      >
        {menus &&
          menus.map(menu => (
            <ListItem
              disableRipple
              button
              selected={selectedIndex == menu.url}
              key={menu.id}
              onClick={() => handleSelectedById(menu.url)}
            >
              <ListItemIcon>
                <Icon>{menu.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css" />
        <div className={classes.drawerPaper}>{drawer}</div>
      </nav>
    </div>
  );
};

SideBar.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

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
  )(SideBar),
);
