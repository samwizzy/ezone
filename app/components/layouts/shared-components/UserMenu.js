import React, { Component, useState } from 'react';
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
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import _ from 'lodash';
import * as AppSelectors from '../../../containers/App/selectors';
import * as AppActions from '../../../containers/App/actions';


const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiIconButton-label": {
      color: theme.palette.common.white,
    },
    "& .MuiButton-label": {
      color: theme.palette.common.white,
    },
  },
  name: {
    color: theme.palette.common.white
  },
  avatar: {
    marginRight: theme.spacing(1)
  }
}))
// class UserMenu extends Component {
const UserMenu = props => {
  const classes = useStyles()
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

  console.log(currentUser, "currentUser")

  return (
    <React.Fragment>
      <div className={classes.root}>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Button className="h-64" onClick={userMenuClick} endIcon={<KeyboardArrowDownIcon />}>
          {currentUser.organisation && currentUser.organisation.logo? (
            <Avatar className={classes.avatar} alt="user photo" src={`data:image/jpg;base64,${currentUser.organisation.logo}`} />
          ) : (
            <Avatar className={classes.avatar}>{currentUser.lastName}</Avatar>
          )}

          <div className="hidden md:flex flex-col ml-12 items-start">
            <Typography className={classes.name} color="textSecondary">
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
          {/* {currentUser ? (
              <React.Fragment>
                <MenuItem
                  onClick={() => {
                    logoutAction()
                    this.userMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <Icon>exit_to_app</Icon>
                  </ListItemIcon>
                  <ListItemText className="pl-0" primary="Logout" />
                </MenuItem>
              </React.Fragment>
            ):(
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
