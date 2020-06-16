import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Icon, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { AppContext } from '../../../containers/context/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: "100%",
    marginTop: theme.spacing(2),
  },
  active: {
    backgroundColor: "red"
  },
  list: {
    width: '100%',
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
      }
    },
    "& .MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      "& .MuiListItemIcon-root": {
        color: theme.palette.primary.main,
      },
    }
  },
}));

function AppSidebar(props) {
  const classes = useStyles();
  const { location } = props
  const [selectedIndex, setSelectedIndex] = React.useState('')

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <AppContext.Consumer>
      {value => {
        const { sideBarconfig } = value;
        let menus = []
        const pathName = location.pathname.replace(/^\/|\/$/g, '').split('/')[0]
        const sideMenu = sideBarconfig.find(sidebar => sidebar.module.includes(pathName));
        menus = sideMenu && sideMenu.menus.length > 0 ? sideMenu.menus : sideBarconfig.find(sidebar => sidebar.module.includes("home")).menus

        return (
          <div className={classes.root}>
            <List className={classes.list}>
              {menus.map((menu, index) => {
                return (
                  <ListItem
                    button key={index}
                    selected={menu.url.toLowerCase() === location.pathname}
                    component={Link}
                    onClick={(event) => handleListItemClick(event, menu.name)}
                    to={menu.url}
                  >
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
