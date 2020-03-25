import React from 'react';
import { fade } from '@material-ui/core/styles';
import {
  withStyles,
  AppBar,
  SwipeableDrawer,
  Grid,
  Typography,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Link
} from '@material-ui/core';
import Menu from '@material-ui/icons/Menu';
import Apps from '@material-ui/icons/Apps';
import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Banner from './banner.jpg';
import Logo from '../../images/logo.svg';
import OctivierLogo from '../../images/octivier-logo.svg';
import UserMenu from '../layouts/shared-components/UserMenu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ModulesList from './components/ModulesList'

const drawerWidth = 50;

const links = [
  'Dashboard',
  'Organization', 
  'Applications', 
  'Employees', 
  'Groups'
];

const styles = theme => ({
  banner: {
    minHeight: '1073px',
    backgroundImage: `url(${Banner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
    position: 'relative',
    overflow: 'hidden',
  },
  appBar: {
    zIndex: theme.zIndex.drawer,
    boxShadow: theme.shadows[0],
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  text: {
    fontSize: 50,
    [theme.breakpoints.down('md')]: {
      lineHeight: 1,
      marginBottom: theme.spacing(2),
    },
  },
  strapline: {
    fontSize: 23,
    fontWeight: 200,
    color: '#E5E5E5',
    [theme.breakpoints.down('md')]: {
      fontSize: 18,
    },
  },
  button: {
    backgroundColor: '#A8BF54',
    padding: theme.spacing(1, 6),
    borderRadius: theme.shape.borderRadius,
    opacity: 1,
    marginTop: theme.spacing(2),
    textTransform: 'capitalize',
    fontSize: 16,
    '&:hover': {
      backgroundColor: '#93a847',
    },
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: '100%',
    // backgroundImage: `url(${SideBanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    marginRight: theme.spacing(6),
    color: theme.palette.common.white,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    '&:hover': {
      textDecoration: 'none',
    },
  },
  li: {
    color: theme.palette.common.white,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: 'none',
    color: theme.palette.common.black,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
    },
  },
  logo: {
    color: '#1F70C1',
    maxHeight: '30px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  icon: {
    // height: '20px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  SwipeableDrawer: {
    
  }
});

function Header(props) {
  const { classes } = props;

  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = (open, status) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [open]: status });
  };

  const sideList = open => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(open, false)}
      onKeyDown={toggleDrawer(open, false)}
    >
      <IconButton
        onClick={toggleDrawer('open', true)}
        edge="start"
        className={classes.SwipeableDrawer}
        color="inherit"
        aria-label="open drawer"
      >
        {state.open? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>

      <List>
        {links.map(
          (text, index) => {
            switch(text){
              case 'Dashboard':
                return (
                  <ListItem button key={index}>
                    <ListItemIcon><Dashboard /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Organization':
                return (
                  <ListItem button key={index}>
                    <ListItemIcon><BusinessCenter /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Employees':
                return (
                  <ListItem button key={index} className={classes.link}>
                    <ListItemIcon><Person /></ListItemIcon>
                    <ListItemText primary={text} className={classes.li} />
                  </ListItem>
                );
                break;
              case 'Applications':
                return (
                  <ListItem button key={index}>
                    <ListItemIcon><Apps /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              case 'Groups':
                return (
                  <ListItem button key={index}>
                    <ListItemIcon><Group /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                );
                break;
              default:
                return (
                  <ListItem button key={index}>
                    <ListItemIcon><Dashboard /></ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
            }
          }
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="relative" color="inherit" className={classes.appBar}>
        <Toolbar variant="dense" disableGutters={false}>
          <IconButton
            onClick={toggleDrawer('open', true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Menu />
          </IconButton>
          
          <Grid
            justify="space-between" // Add it here :)
            container
          >
            <Grid item style={{display:'flex', alignItems:'center'}}>
              <Typography type="title" color="inherit">
                <Link href='#'>
                  <img src={Logo} className={classes.logo} />
                </Link>
              </Typography>
            </Grid>

            <Grid item>
              <List>
                <ListItem>
                  {/* <ListItemIcon>
                    <img src={OctivierLogo} />
                  </ListItemIcon>
                  <ListItemText primary={'Octiver Communications'} /> */}
                  {/* <UserMenu /> */}

                  <ModulesList />
                </ListItem>
              </List>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={state.open}
        onClose={toggleDrawer('open', false)}
        onOpen={toggleDrawer('open', true)}
      >
        {sideList('open')}
      </SwipeableDrawer>
    </div>
  );
}

export default withStyles(styles)(Header);
