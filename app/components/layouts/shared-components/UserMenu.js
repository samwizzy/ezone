import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeStyles,
  Avatar,
  Badge,
  Button,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import _ from 'lodash';
import * as AppSelectors from '../../../containers/App/selectors';
import * as AppActions from '../../../containers/App/actions';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiIconButton-label': {
      color: theme.palette.common.white,
    },
    '& .MuiButton-label': {
      color: theme.palette.common.white,
    },
  },
  list: {
    '& .MuiListItemIcon-root': {
      minWidth: '40px !important',
    },
    '& .MuiMenuItem-root': {
      '&:hover > .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
    background: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
}));

const options = ['No messages'];

const UserMenu = props => {
  const classes = useStyles();
  const [userMenu, setUserMenu] = useState(null);
  const [userNotification, setUserNotification] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const userNotificationClick = event => {
    setUserNotification(event.currentTarget);
  };

  const userNotificationClose = () => {
    setUserNotification(null);
  };

  const { logoutAction, currentUser } = props;

  if (!currentUser) {
    return '';
  }

  console.log(currentUser, 'currentUser');

  return (
    <React.Fragment>
      <div className={classes.root}>
        <IconButton
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={userNotificationClick}
        >
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Popover
          open={Boolean(userNotification)}
          anchorEl={userNotification}
          onClose={userNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{
            paper: classes.list,
          }}
        >
          {currentUser && (
            <React.Fragment>
              {options.map((option, i) => (
                <MenuItem key={i} component={Link} to="/user-profile">
                  <ListItemIcon>
                    <Icon>notifications</Icon>
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </React.Fragment>
          )}
        </Popover>

        <Button onClick={userMenuClick} endIcon={<KeyboardArrowDownIcon />}>
          {currentUser && currentUser.organisation.logo ? (
            <Avatar
              className={classes.avatar}
              alt="user photo"
              src={`data:image/jpg;base64,${currentUser.organisation.logo}`}
            />
          ) : (
            <Avatar className={classes.avatar}>
              {currentUser && _.upperCase(currentUser.lastName[0])}
            </Avatar>
          )}

          <div>
            <Typography color="inherit">
              {currentUser && currentUser.lastName}
            </Typography>
          </div>
        </Button>

        <Popover
          open={Boolean(userMenu)}
          anchorEl={userMenu}
          onClose={userMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          classes={{
            paper: classes.list,
          }}
        >
          {currentUser && (
            <React.Fragment>
              <MenuItem component={Link} to="/user-profile">
                <ListItemIcon>
                  <Icon>account_circle</Icon>
                </ListItemIcon>
                <ListItemText primary="My account" />
              </MenuItem>
              <MenuItem component={Link} to="/subscriptions">
                <ListItemIcon>
                  <Icon>subscriptions</Icon>
                </ListItemIcon>
                <ListItemText primary="Subscriptions" />
              </MenuItem>
              <MenuItem component={Link} to="/help">
                <ListItemIcon>
                  <Icon>help_outline</Icon>
                </ListItemIcon>
                <ListItemText primary="Help" />
              </MenuItem>
              <MenuItem onClick={() => logoutAction()}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </React.Fragment>
          )}
        </Popover>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: () => dispatch(AppActions.logout()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserMenu);
