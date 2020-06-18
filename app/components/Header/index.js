import React from 'react';
import { fade } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
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
import Banner from './banner.jpg';
import Logo from '../../images/logo.svg';
import OctivierLogo from '../../images/octivier-logo.svg';
import sidebarImage from '../../images/sidebarImage.jpg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ModulesList from './components/ModulesList'
import AppSideBar from './../Sidebar/components/AppSidebar'

const drawerWidth = 240;
const drawerHeight = 48;

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
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
  },
  listRoot: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: `url(${sidebarImage}) no-repeat left -1px`,
    backgroundSize: "cover",
    width: drawerWidth,
    height: "100%",
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
  grow: {
    flexGrow: 1,
    marginBottom: drawerHeight,
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
  title: {
    flexGrow: 1
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
  SwipeableDrawer: {}
});

function Header(props) {
  const { classes, location } = props;
  const pathName = location.pathname.replace(/^\/|\/$/g, '').split('/')[0]
  const title = pathName.replace(/-/g, ' ');

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
      className={classes.listRoot}
      role="presentation"
      onClick={toggleDrawer(open, false)}
      onKeyDown={toggleDrawer(open, false)}
    >
      {/* <IconButton
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
      </IconButton> */}

      <AppSideBar />
      <Divider />
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
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
            alignItems="center"
          >
            <Grid item>
              <Typography type="title" color="inherit">
                <Link href='/'>
                  <img src={Logo} className={classes.logo} />
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textSecondary">
                {title && title.toUpperCase()}
              </Typography>
            </Grid>

            <Grid item>
              <List dense disablePadding>
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

export default withRouter(withStyles(styles)(Header));
