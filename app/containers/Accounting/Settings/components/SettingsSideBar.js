import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { List, ListItem, ListSubheader, ListItemText, ListItemIcon, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import * as Actions from '../actions';
import * as Selectors from './../selectors';
import * as AppSelectors from './../../../App/selectors'; 
import EventIcon from '@material-ui/icons/Event'; 
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'relative',
    overflowY: 'auto',
    borderRight: `1px solid ${theme.palette.grey[200]}`,
    minHeight: `calc(100vh - 128px)`,
    padding: theme.spacing(2, 0),
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

const SettingsSideBar = props => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <List 
        component="nav" 
        aria-label="secondary mailbox folders"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="h6">Settings</Typography>
          </ListSubheader>
        }
      >
        <ListItem button onClick={() => {}}>
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Accounting Period" />
        </ListItem>
        <ListItem button onClick={() => {}}>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Opening Balances" />
        </ListItem>
        <ListItem button onClick={() => {}}>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </List>
    </div>
  );
};

SettingsSideBar.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
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
)(SettingsSideBar);

