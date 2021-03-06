import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider, List, ListItem, ListSubheader, ListItemText, ListItemIcon, Icon, Typography, Hidden, Drawer } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors'
import { AppContext } from '../../context/AppContext'

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  list: { 
    width: drawerWidth,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      width: drawerWidth,
      flexShrink: 0,
      overflowY: 'auto',
      height: '100vh',
      borderRight: `1px solid ${theme.palette.grey[100]}`,
      '& .MuiListSubheader-root': {
        backgroundColor: theme.palette.common.white
      },
      "&::-webkit-scrollbar": {
        width: "6px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-track": {
        "-webkitBoxShadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
        backgroundColor: theme.palette.primary.main,
      }
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  },
}));

const SideBar = props => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListRoute = (event, link, index) => {
    setSelectedIndex(index);
    props.history.push(`${link}`)
  }

    const drawer = (
        <AppContext.Consumer>  
            {value => {
                const { sideBarconfig } = value
                const sideMenu = sideBarconfig.find(sidebar => sidebar.module === 'hr')
                const { menus } = sideMenu
                return (
                <div>
                <List
                    className={classes.list}
                    dense
                    subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <Typography variant="subtitle1">
                          HR Menu 
                        </Typography>
                    </ListSubheader>
                    }
                >
                    {menus && menus.map(menu => (
                    <ListItem button selected={selectedIndex === menu.id} key={menu.id} onClick={event => handleListRoute(event, menu.url, menu.id)}>
                        <ListItemIcon><Icon>{menu.icon}</Icon></ListItemIcon>
                        <ListItemText primary={menu.name} />
                    </ListItem>
                    ))}
                </List>
                </div>
                )    
            }}
        </AppContext.Consumer>  
    )

    return (
      <div className={classes.root}>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css"></Hidden>
          <div className={classes.drawerPaper}>
            {drawer}
          </div>
        </nav>
      </div>
    )
}

export default compose(
  withRouter,
  memo,
)(SideBar);