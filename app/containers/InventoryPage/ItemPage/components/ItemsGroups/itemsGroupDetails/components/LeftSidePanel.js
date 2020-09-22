import React from 'react'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    IconButton,
    ClickAwayListener,
    Grow,
    Popper,
    MenuItem,
    MenuList,
    Paper,
    List,
    ListItem,
    ListSubheader,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    list: {
        '& .MuiListItemIcon-root': {
            minWidth: '40px !important',
        },
    },
}));

const Drawer = ({ history, itemsGroups, handleItemGroupById, openNewItemGroupDialog, selectedIndex }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const filteredItemsGroups = _.orderBy(itemsGroups, ['dateCreated'], ['desc']);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    return (
        <div>
            <List
                className={classes.list}
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        <div className={classes.flex}>
                            <div>
                                <Button
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    size="small"
                                    endIcon={<KeyboardArrowDownIcon />}
                                >
                                    Items Groups
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
                                                    placement === 'bottom'
                                                        ? 'center top'
                                                        : 'center bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="menu-list-grow"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleClose}>All</MenuItem>
                                                        <MenuItem onClick={handleClose}>Filter 1</MenuItem>
                                                        <MenuItem onClick={handleClose}>Filter 2</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                            <IconButton
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={openNewItemGroupDialog}
                            >
                                <AddIcon />
                            </IconButton>
                        </div>
                    </ListSubheader>
                }
            >
                {filteredItemsGroups &&
                    itemsGroups.map(item => (
                        <ListItem
                            disableRipple
                            button
                            selected={selectedIndex == item.id}
                            key={item.id}
                            onClick={() => handleItemGroupById(item.id)}
                        >
                            <ListItemIcon>
                                <LabelOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.groupName} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}

export default withRouter(Drawer)

