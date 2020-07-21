import React, { memo,useContext} from 'react';
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
import Collapse from '@material-ui/core/Collapse';
import EventIcon from '@material-ui/icons/Event'; 
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssessmentIcon from '@material-ui/icons/Assessment';
import { SettingContext } from './SettingsLayout';

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
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SettingsSideBar = props => {
  const classes = useStyles();
  const settingContext = useContext(SettingContext)
  const [open, setOpen] = React.useState(false);
  const [tax, setTax] = React.useState(false);

  const handleClick = (value) => {
    switch(value){
      case 'asset':
        {setOpen(!open)}
        case 'tax':
        {setTax(!tax);}  
    }
    
  };

  const handleClickPage = (value) => {
    settingContext.settingDispatch({type:'NAVIGATION',page:value});
  };
  
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
        <ListItem button onClick={() => {handleClickPage('setting')}}>
         {/*<ListItemIcon>
            <EventIcon />
         </ListItemIcon>*/}
          <ListItemText primary="Accounting Period" />
        </ListItem>
        <ListItem button onClick={()=>setOpen(!open)}>
        <ListItemText primary="Fixed Asset Setup" />
      </ListItem>
      <Collapse in={open} timeout="auto">
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={()=>handleClickPage('deprecition')}>
            <ListItemText primary="Deprecition Type" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={()=>handleClickPage('deprecitionarea')}>
            <ListItemText primary="Deprecition Area" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={()=>handleClickPage('assetclasses')}>
            <ListItemText primary="Asset Class" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemText primary="Currencies" />
      </ListItem>
      <ListItem button onClick={()=>setTax(!tax)}>
        <ListItemText primary="Taxes" />
      </ListItem>
      <Collapse in={tax} timeout="auto">
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={()=>handleClickPage('taxrate')}>
            <ListItemText primary="Tax rate" />
          </ListItem>
          <ListItem button className={classes.nested} onClick={()=>handleClickPage('taxtype')}>
            <ListItemText primary="Tax type" />
          </ListItem>
        </List>
      </Collapse>
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

