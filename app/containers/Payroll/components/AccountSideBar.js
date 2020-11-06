import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { List, ListItem, ListSubheader, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Description from '@material-ui/icons/Description'
// import * as Actions from '../actions';
// import * as Selectors from './../selectors';
// import * as AppSelectors from './../../App/selectors'; 
import Share from '@material-ui/icons/Share';  
import StarOutlined from '@material-ui/icons/StarOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflowY: 'auto',
    maxHeight: 300,
    borderRight: `1px solid ${theme.palette.grey[100]}`,
    '& .MuiListItem-root:hover': {
      color: theme.palette.primary.main,
      '& .MuiListItemIcon-root:hover': {
        color: theme.palette.primary.main,
      }
    }
  },
}));

const AccountSideBar = props => {
  const classes = useStyles();
//   const { loading, folders, folder, user, getAllFoldersAndDocs, getFavoriteDocuments } = props

//   const getAllFolders = () => {
//     getAllFoldersAndDocs({folderId: 0, type: 'ROOT'})
//     setPrevIds([])
//     props.history.push('/dashboard/folders')
//   }
  
  return (
    <div className={classes.root}>
      <List 
        component="nav" 
        aria-label="secondary mailbox folders"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="h6">Account</Typography>
          </ListSubheader>
        }
      >
        <ListItem button 
        //  onClick={getAllFolders}
        >
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="Chart" />
        </ListItem>
        <ListItem button 
        //  onClick={() => getFavoriteDocuments(user.uuId)}
        >
          <ListItemIcon>
            <StarOutlined />
          </ListItemIcon>
          <ListItemText primary="Journal" />
        </ListItem>
        <ListItem button 
        //  onClick={() => getAllFoldersAndDocs({folderId: 3, type: 'SHARED'})}
        >
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary="Banking" />
        </ListItem>
        <ListItem button 
        //  onClick={() => getAllFoldersAndDocs({folderId: 2, type: 'TRASHED'})}
        >
        </ListItem>
      </List>
    </div>
  );
};

AccountSideBar.propTypes = {
//   loading: PropTypes.bool,
//   getAllFoldersAndDocs: PropTypes.func,
//   getFavoriteDocuments: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
//   loading: Selectors.makeSelectLoading(),
//   folders: Selectors.makeSelectFolders(),
//   folder: Selectors.makeSelectFolder(),
//   user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getAllFoldersAndDocs: (data) => dispatch(Actions.getAllFoldersAndDocs(data)),
    // getFavoriteDocuments: (uuid) => dispatch(Actions.getFavoriteDocuments(uuid)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AccountSideBar);

