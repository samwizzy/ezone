import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link as NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, IconButton, Menu, MenuItem, Link, List, ListItem, ListItemText, ListItemSecondaryAction, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import moment from 'moment';
import { green } from '@material-ui/core/colors'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LensIcon from '@material-ui/icons/Lens';
import TodayIcon from '@material-ui/icons/Today';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    position: "relative",
    padding: theme.spacing(4, 2, 0, 2),
    margin: theme.spacing(1, 0)
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(1, 0)
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: theme.spacing(0.5),
    '&.active': { color: green[500] },
  },
  link: {
    display: 'flex',
  }
}));

const AnnouncementItem = props => {
  const classes = useStyles();
  const { loading, match, openEditAnnouncementDialog, openConfirmAnnouncementDialog, openAnnouncementViewDialog, announcement } = props;
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleEditClick = () => {
    openEditAnnouncementDialog(announcement)
    setAnchorEl(null);
  }
  const handleDeleteClick = () => {
    openConfirmAnnouncementDialog(announcement)
    setAnchorEl(null);
  }

  if (!announcement) {
    return ''
  }

  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <List dense={true}>
          <ListItem button onClick={() => openAnnouncementViewDialog(announcement)}>
            <ListItemText
              disableTypography
              primary={
                <React.Fragment>
                  <Typography variant="h6">
                    <NavLink to={`${match.url}/${announcement.id}`}>{announcement.title}</NavLink>
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                    {announcement.message}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <div className={classes.flex}>
                  <Breadcrumbs aria-label="breadcrumb" separator="">
                    <Typography color="textPrimary" className={classes.link}>
                      Priority : &nbsp;
											<LensIcon className={clsx(classes.icon, { "active": true })} />
                      {announcement.priorityLevel}
                    </Typography>
                    <Typography color="textPrimary" className={classes.link}>
                      <TodayIcon className={classes.icon} />
											Published Date : {announcement.dateCreated ? moment(announcement.dateCreated).format('YYYY/MM/DD') : 'NIL'}
                    </Typography>
                  </Breadcrumbs>
                  <Breadcrumbs aria-label="breadcrumb" separator="">
                    <Typography color="textPrimary" className={classes.link}>
                      Sent to: &nbsp;
											<Link color="textSecondary" href="/" className={classes.link}>
                        View employees
											</Link>
                    </Typography>
                  </Breadcrumbs>
                </div>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem
          onClick={handleDeleteClick}
          disabled={false}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

AnnouncementItem.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    openEditAnnouncementDialog: (data) => dispatch(Actions.openEditAnnouncementDialog(data)),
    openConfirmAnnouncementDialog: (data) => dispatch(Actions.openConfirmAnnouncementDialog(data)),
    openAnnouncementViewDialog: (data) => dispatch(Actions.openAnnouncementViewDialog(data)),
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
)(AnnouncementItem);
