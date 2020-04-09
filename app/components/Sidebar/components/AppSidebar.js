import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AppContext } from '../../../containers/context/AppContext';
import sidebarImage from '../../../images/sidebarImage.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: `url(${sidebarImage}) no-repeat left -1px`,
    backgroundSize: "cover",
    height: `calc(100vh - 66px)`,
    paddingTop: theme.spacing(1),
  },
  list: {
    width: '100%',
    "& .MuiListItem-root": {
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root": {
        color: theme.palette.common.white,
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
        console.log(pathName, "pathName")
        const sideMenu = sideBarconfig.find(sidebar => sidebar.module == "utility");

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
