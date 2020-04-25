import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { List, ListItem, ListSubheader, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Description from '@material-ui/icons/Description'
import * as Actions from '../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from './../../App/selectors'; 
import Delete from '@material-ui/icons/Delete';  
import Share from '@material-ui/icons/Share';  
import StarOutlined from '@material-ui/icons/StarOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'relative',
    overflowY: 'auto',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    minHeight: `calc(100vh - 128px)`,
    padding: theme.spacing(2, 0),
    "& .MuiListSubheader-root": {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
    },
    "& .MuiListItem-root": {
      "& .MuiListItemIcon-root": {
        minWidth: "40px !important"
      },
      "&:hover > .MuiListItemIcon-root": {
        color: theme.palette.primary.main
      },
      "&:hover": {
        color: theme.palette.primary.main,
      },
    }
  },
}));

const FolderSideBar = props => {
  const classes = useStyles();
  const { loading, folders, folder, user, getAllFoldersAndDocs, getFavoriteDocuments } = props

  const getAllFolders = () => {
    props.history.push('/file-manager/folders')
    getAllFoldersAndDocs({folderId: 0, type: 'ROOT'})
  }
  
  return (
    <div className={classes.root}>
      <List 
        component="nav" 
        aria-label="secondary mailbox folders"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="h6">Status</Typography>
          </ListSubheader>
        }
      >
        <ListItem button onClick={getAllFolders}>
          <ListItemIcon>
            <Description />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItem>
        <ListItem button onClick={() => getFavoriteDocuments(user.uuId)}>
          <ListItemIcon>
            <StarOutlined />
          </ListItemIcon>
          <ListItemText primary="Favorite" />
        </ListItem>
        <ListItem button onClick={() => getAllFoldersAndDocs({folderId: 3, type: 'SHARED'})}>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary="Shared" />
        </ListItem>
        <ListItem button onClick={() => getAllFoldersAndDocs({folderId: 2, type: 'TRASHED'})}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  );
};

FolderSideBar.propTypes = {
  loading: PropTypes.bool,
  getAllFoldersAndDocs: PropTypes.func,
  getFavoriteDocuments: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  folders: Selectors.makeSelectFolders(),
  folder: Selectors.makeSelectFolder(),
  user: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllFoldersAndDocs: (data) => dispatch(Actions.getAllFoldersAndDocs(data)),
    getFavoriteDocuments: (uuid) => dispatch(Actions.getFavoriteDocuments(uuid)),
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
)(FolderSideBar);

