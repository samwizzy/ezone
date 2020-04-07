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
  },
  list: {
    background: `url(${sidebarImage}) no-repeat left -1px`,
    backgroundSize: "cover",
    height: `calc(100vh - 66px)`,
    paddingTop: theme.spacing(1),
    width: '100%',
    color: theme.palette.common.white,
    "& .material-icons": {
      color: theme.palette.common.white,
    }
  },
}));

const modules = [
  'dashboard',
  'hr',
  'accounting',
  'Human Resources',
  'Store & Inventory Management',
  'CRM',
  'Budgeting',
  'Task management',
  'File and Document sharing',
  'Projects',
];

function AppSidebar(props) {
  const classes = useStyles();

  return (
    <AppContext.Consumer>
      {value => {
        const { sideBarconfig } = value;
        const sideMenu = sideBarconfig.find(
          sidebar => sidebar.module === 'utility',
        );

        return (
          <div className={classes.root}>
            <List className={classes.list}>
              {sideMenu.menus.map((menu, index) => {
                return (
                  <ListItem button key={index} component="a" href={menu.url}>
                    <ListItemIcon>
                      <Tooltip title={menu.name} arrow placement="right-end">
                        <Icon>{menu.icon}</Icon>
                      </Tooltip>
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
