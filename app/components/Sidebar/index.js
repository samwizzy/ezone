import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Logo from '../../images/logo.svg';
import AppSidebar from './components/AppSidebar';
import Footer from '../Footer';
import sidebarImage from '../../images/sidebarImage.jpg';

const drawerWidth = 240;
const drawerHeight = 48;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    marginTop: drawerHeight,
    height: `calc(100vh - ${drawerHeight}px)`,
    background: `url(${sidebarImage}) no-repeat left top`,
    backgroundSize: "cover",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
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
    zIndex: 9999,
    position: "absolute",
    borderRadius: theme.spacing(20, 0, 0, 20),
    right: 0,
    bottom: "40%",
    display: 'flex',
    backgroundColor: fade(theme.palette.common.white, 0.5),
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
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

function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >

        <div className={classes.toolbar}>
          {/* <Link href="#">
            <img src={Logo} className={classes.logo} alt="" />
          </Link> */}
          {open ? (
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon fontSize="large" />
              )}
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon fontSize="large" />
              )}
            </IconButton>
          )}
        </div>
        {/* <Divider /> */}
        <AppSidebar />
        <Divider />
      </Drawer>
      <main className={classes.content}>
        {props.content}
        <Footer />
      </main>
    </div>
  );
}

export default withRouter(MiniDrawer);
