import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuList from '@material-ui/core/MenuList';
import BusinessIcon from '@material-ui/icons/Business';
import { makeStyles } from '@material-ui/core/styles';
import apps from '../../../containers/Home/ProjectsApp/components/apps.db';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: 9999,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  list: {
    '& .MuiListItemIcon-root': {
      minWidth: '40px !important',
    },
    '& .MuiMenuItem-root': {
      '&:hover > .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  },
}));

export default withRouter(function MenuListComposition({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // console.log(history, 'history');

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleRoute = url => event => {
    history.push(url);
    handleClose(event);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Applications <Icon>keyboard_arrow_down</Icon>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    className={classes.list}
                  >
                    {apps &&
                      apps.map(app => (
                        <MenuItem
                          disableRipple
                          key={app.id}
                          onClick={handleRoute(app.url)}
                        >
                          <ListItemIcon>
                            {/* <img height="30px" alt={app.name} src={app.icon} /> */}
                            <Icon>{app.img}</Icon>
                          </ListItemIcon>
                          <ListItemText primary={app.name} />
                        </MenuItem>
                      ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
});
