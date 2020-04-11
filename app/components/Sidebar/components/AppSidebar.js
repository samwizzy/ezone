import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Icon, List, ListItem, ListItemIcon, ListItemText, Typography} from '@material-ui/core';
import { AppContext } from '../../../containers/context/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: "100%",
    marginTop: theme.spacing(2),
  },
  list: {
    width: '100%',
    // fontSize: theme.typography.fontSize + 2,
    "& .MuiListItem-root": {
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root": {
        color: theme.palette.common.white,
        minWidth: "40px !important"
      },
      "&:hover > .MuiListItemIcon-root": {
        color: theme.palette.primary.main
      },
      "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white, 
      },
    }
  },
}));

function AppSidebar(props) {
  const classes = useStyles();
  const { location } = props

  return (
    <AppContext.Consumer>
      {value => {
        const { sideBarconfig } = value;
        const pathName = location.pathname.replace(/^\/|\/$/g, '').split('/')[0]
        const sideMenu = sideBarconfig.find(sidebar => sidebar.module == pathName);

        return (
          <div className={classes.root}>
            <List className={classes.list}>
              {sideMenu.menus.map((menu, index) => {
                return (
                  <ListItem button key={index} component="a" href={menu.url}>
                    <ListItemIcon>
                      <Icon color="inherit">{menu.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={menu.name} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default withRouter(AppSidebar);
