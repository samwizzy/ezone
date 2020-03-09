import React, { Component, useState } from 'react';
import {
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
  Link,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import _ from 'lodash';
import * as AppSelectors from '../../../containers/App/selectors';
import * as AppActions from '../../../containers/App/actions';

// class UserMenu extends Component {
const UserMenu = props => {
  //   state = {
  //     userMenu: null,
  //   };

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = event => {
    setUserMenu(event.currentTarget);
    // this.setState({ userMenu: event.currentTarget });
  };

  const userMenuClose = () => {
    setUserMenu(null);
    // this.setState({ userMenu: null });
  };

  //   render() {
  const { logoutAction, user, currentUser } = props;
  // const { userMenu } = this.state;

  // console.log(user, 'User object')
  // if (!user.data || !user.data.role) {
  //   return '';
  // }

  return (
    <React.Fragment>
      <div>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Button className="h-64" onClick={userMenuClick}>
          {/* {user.data.photoURL ? (
              <Avatar className="" alt="user photo" src={user.data.photoURL} />
            ) : (
              <Avatar className="">{user.data.userName}</Avatar>
            )} */}

          <div className="hidden md:flex flex-col ml-12 items-start">
            {/* <Typography
                component="span"
                className="normal-case font-600 flex"
              >
                {user.data.firstName}
              </Typography>
              <Typography className="text-11 capitalize" color="textSecondary">
                {user.data.lastName}
              </Typography> */}
          </div>

          <Icon className="text-16 ml-12 hidden sm:flex" variant="action">
            keyboard_arrow_down
          </Icon>
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
            paper: 'py-8',
          }}
        >
          {/* {currentUser && (
              <React.Fragment>
                <MenuItem component={Link} to="/login">
                  <ListItemIcon>
                    <Icon>lock</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Login" />
                </MenuItem>
                <MenuItem component={Link} to="/register">
                  <ListItemIcon>
                    <Icon>person_add</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Register" />
                </MenuItem>
              </React.Fragment>
            )} */}
          {currentUser && (
            <React.Fragment>
              <MenuItem component={Link} to="/login" onClick={() => logoutAction()}>
                <ListItemIcon>
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary="Logout" />
              </MenuItem>
            </React.Fragment>
          )}
          {/* {user.data.role.name === 'guest' ? (
              <React.Fragment>
                <MenuItem component={Link} to="/login">
                  <ListItemIcon>
                    <Icon>lock</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Login" />
                </MenuItem>
                <MenuItem component={Link} to="/register">
                  <ListItemIcon>
                    <Icon>person_add</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Register" />
                </MenuItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <MenuItem
                  onClick={() => {
                    logout();
                    this.userMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <Icon>exit_to_app</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Logout" />
                </MenuItem>
              </React.Fragment>
            )} */}
        </Popover>
      </div>
    </React.Fragment>
  );
};
// }

const mapStateToProps = createStructuredSelector({
  currentUser: AppSelectors.makeSelectCurrentUser(),
  //   user: {
  //     data: {
  //       userName: '',
  //       firstName: '',
  //       lastName: '',
  //       role: { name: 'guest' },
  //       photoURL: null,
  //     },
  //   },
});

function mapDispatchToProps(dispatch) {
  return {
    logoutAction: () => dispatch(AppActions.logout()),
    dispatch,
  };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         {
//             logout: () => ({}),
//         },
//         dispatch,
//     );
// }

// function mapStateToProps(state) {
//     return {
//         user: {
//             data: {
//                 userName: '',
//                 firstName: '',
//                 lastName: '',
//                 role: { name: 'guest' },
//                 photoURL: null,
//             },
//         },
//     };
// }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserMenu);
