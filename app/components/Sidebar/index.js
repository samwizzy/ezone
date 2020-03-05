import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Apps from '@material-ui/icons/Apps';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Settings from '@material-ui/icons/Settings';
import Security from '@material-ui/icons/Security';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import Logo from '../../images/logo.svg';

const drawerWidth = 240;

const links = [
  'Dashboard',
  'Organization',
  'Applications',
  'Employees',
  'Groups',
  'Security',
  'Settings',
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  list: {
    marginTop: theme.spacing(4),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.common.black,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    // zIndex: 1099,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  logo: {
    color: '#1F70C1',
    maxHeight: '30px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight: '10px',
    },
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        style={{backgroundColor: 'red'}}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Link href='#'>
            <img src={Logo} className={classes.logo} />
          </Link>
          {open?
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> :
          <IconButton onClick={handleDrawerOpen}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          }
        </div>
        <Divider />
        <List className={classes.list}>
          {links.map((text, index) => {
            switch (text) {
              case 'Dashboard':
                return (
                  <ListItem button key={index} component="a" href="/dashboard">
                    <ListItemIcon>
                      <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Organization':
                return (
                  <ListItem
                    button
                    key={index}
                    component="a"
                    href="/organization"
                  >
                    <ListItemIcon>
                      <BusinessCenter />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Employees':
                return (
                  <ListItem
                    button
                    key={index}
                    component="a"
                    href="/users/employees"
                  >
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Applications':
                return (
                  <ListItem button key={index} component="a" href="/utility">
                    <ListItemIcon>
                      <Apps />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
              case 'Security':
                return (
                  <ListItem button key={index} component="a" href="/groups">
                    <ListItemIcon>
                      <Security />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Settings':
                return (
                  <ListItem button key={index} component="a" href="/email">
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              default:
                return null;
            }
          })}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.content}
      </main>
    </div>
  );
}
