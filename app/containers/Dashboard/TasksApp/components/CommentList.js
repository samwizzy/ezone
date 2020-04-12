import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from '../../actions';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../../selectors';
import { Avatar, IconButton, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CommentList(props) {
  const classes = useStyles();
  const {comments} = props
    
  return (
    <List dense className={classes.root}>
        {comments && comments.length > 0?
        <React.Fragment>
            {comments.map((comment, i) => 
                <ListItem key={i}>
                    <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={comment.comment} secondary={moment(comment.dateCreated).format('ll')} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit">
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
        </React.Fragment>
        :
        <ListItem>
            <ListItemText primary="No comment yet" />
        </ListItem>
        }
    </List>
  );
}


CommentList.propTypes = {
    loading: PropTypes.bool,
    getTaskComments: PropTypes.func,
  };
  
  const mapStateToProps = createStructuredSelector({
    loading: Selectors.makeSelectLoading(),
    task : Selectors.makeSelectTask(),
    comments : Selectors.makeSelectTaskComments(),
    authUser: AppSelectors.makeSelectCurrentUser(),
  });
  
  function mapDispatchToProps(dispatch) {
    return {
      commentTask: (data) => dispatch(Actions.commentTask(data)),
      getTaskComments: (id) => dispatch(Actions.getTaskComments(id)),
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(CommentList);