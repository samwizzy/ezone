import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiListItemIcon-root': {
      minWidth: '40px !important',
    },
  },
  title: {
    flexGrow: 1,
  },
  marked: {
    backgroundColor: green[500],
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    padding: theme.spacing(1, 0),
  },
}));

const Drawer = ({ history, transferOrders, handleItemById, selectedIndex }) => {
  const classes = useStyles();

  const filteredItems = _.orderBy(transferOrders, ['dateCreated'], ['desc']);

  console.log(transferOrders, 'transferOrders drawer');

  return (
    <div>
      <List
        className={classes.root}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Toolbar className={classes.toolbar}>
              <Typography variant="subtitle1" className={classes.title}>
                All Transfers
              </Typography>

              <Button
                variant="contained"
                size="small"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() =>
                  history.push({ pathname: '/inventory/transfer/create/new' })
                }
                disableElevation
              >
                Add
              </Button>
            </Toolbar>
          </ListSubheader>
        }
      >
        {filteredItems &&
          transferOrders.map(item => (
            <ListItem
              disableRipple
              button
              selected={selectedIndex == item.id}
              key={item.id}
              onClick={() => handleItemById(item.id, item.sku)}
            >
              <ListItemIcon>
                <LabelOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={item.itemName} />
              <ListItemSecondaryAction>
                <Typography variant="subtitle1" color="textPrimary">
                  {moment(item.transferDate).format('HH:mm')}
                </Typography>
                <Typography variant="caption" color="primary">
                  {item.status}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default withRouter(Drawer);
