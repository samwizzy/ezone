import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Paper,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';

const useStyles = makeStyles(theme => ({
  list: {
    flexGrow: 1,
    width: '100%',
    '& .MuiListItem-root': {
      margin: theme.spacing(1, 0),
    },
  },
  inline: {
    display: 'inline',
  },
}));

const UserChat = props => {
  const { dispatchGetUserChatData, allUsersChat, newChat } = props;
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {newChat &&
        // newChat.map(User => (
          <ListItem
            alignItems="flex-start"
            component={Paper}
            key={newChat.id}
            onClick={() => dispatchGetUserChatData(newChat)}
          >
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={newChat.responderName}
              secondary={
                <React.Fragment key={newChat.id}>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {newChat.responderName}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        // ))
        }
      {allUsersChat &&
        allUsersChat.map(user => (
          <ListItem
            alignItems="flex-start"
            component={Paper}
            key={user.id}
            onClick={() => dispatchGetUserChatData(user)}
          >
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={user.responderName}
              secondary={
                <React.Fragment key={user.id}>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {user.responderName}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
    </List>
  );
};

UserChat.propTypes = {
  dispatchGetUserChatData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetUserChatData: evt => dispatch(Actions.getUserChatData(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserChat);
