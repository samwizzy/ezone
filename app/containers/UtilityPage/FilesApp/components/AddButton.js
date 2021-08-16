import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  IconButton,
  MenuList,
  MenuItem,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';

const useStyles = makeStyles(theme => ({
  iconButton: {},
  button: {
    marginLeft: theme.spacing(2),
  },
  popper: { zIndex: 101 },
  icon: {
    marginRight: '3px',
    color: theme.palette.text.secondary,
  },
}));

export function AddFile(props) {
  const { openFileDialog, openFolderDialog } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Icon>add</Icon>
      </IconButton>
      <Popper
        className={classes.popper}
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
                >
                  <MenuItem
                    onClick={() => {
                      openFileDialog();
                      handleClose();
                    }}
                  >
                    <Icon fontSize="small" className={classes.icon}>
                      insert_drive_file
                    </Icon>
                    File
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      openFolderDialog();
                      handleClose();
                    }}
                  >
                    <Icon fontSize="small" className={classes.icon}>
                      folder
                    </Icon>
                    Folder
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

AddFile.prototypes = {
  classes: PropTypes.object.isRequired,
  openNewBranchDialogAction: PropTypes.func,
};
