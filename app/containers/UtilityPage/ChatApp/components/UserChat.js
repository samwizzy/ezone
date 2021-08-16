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
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';

const useStyles = makeStyles(theme => ({
  list: {
    flexGrow: 1,
    padding: theme.spacing(1),
    '& .MuiListItem-root': {},
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const UserChat = props => {
  const classes = useStyles();
  const { getUserChatData, allUsersChat, newChat } = props;

  return (
    <List className={classes.list}>
      {newChat && (
        <ListItem
          alignItems="flex-start"
          button
          key={newChat.id}
          onClick={() => getUserChatData(newChat)}
        >
          <ListItemAvatar>
            <Avatar
              alt={newChat.responderName}
              src="/static/images/avatar/3.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={newChat.responderName}
            secondary={
              <React.Fragment key={newChat.id}>
                <Typography variant="subtitle2" color="textPrimary">
                  {newChat.responderName}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      )}
      {allUsersChat &&
        allUsersChat.map(user => (
          <ListItem
            alignItems="flex-start"
            button
            key={user.id}
            onClick={() => getUserChatData(user)}
          >
            <ListItemAvatar>
              <Avatar
                alt={user.responderName}
                src="/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary={user.responderName}
              secondary={
                <React.Fragment key={user.id}>
                  <Typography variant="subtitle2" color="textPrimary">
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
  getUserChatData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    getUserChatData: data => dispatch(Actions.getUserChatData(data)),
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
