import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, ButtonGroup, TableContainer, Table, TableRow, TableCell, TableBody, TableFooter, TablePagination, Grid, GridList, GridListTile, GridListTileBar, Divider, Menu, MenuItem, Paper, List, ListItem, ListSubheader, ListItemText, ListItemIcon, FormControlLabel, Icon, IconButton, Typography, Toolbar, Hidden, Drawer } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import InfoIcon from '@material-ui/icons/Info';
import TablePaginationActions from './components/TablePaginationActions'

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      overflowY: 'auto',
      height: '500px'
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 250,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
    border: '1px solid #ededed',
    '& .MuiButtonGroup-root:last-child': {
      marginLeft: '10px'
    }
  }
}));

const tileData = [
    {
      img: 'https://via.placeholder.com/150',
      title: 'Task One',
      author: 'author',
    },
    {
      img: 'https://via.placeholder.com/150',
      title: 'Image',
      author: 'author',
    },
    {
      img: 'https://via.placeholder.com/150',
      title: 'Task Two',
      author: 'author',
    },
    {
      img: 'https://via.placeholder.com/150',
      title: 'Task Three',
      author: 'author',
    },
];

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const TaskList = props => {
  const classes = useStyles();
  const { loading, openNewTaskDialog, getUtilityTask, getUserByUUID, getAssignedToByUUID, tasks, task, users, user, match, container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  console.log(task, "task from tasklist single")
  console.log(user, "user from tasklist single")

  React.useEffect(() => {
    getUtilityTask(match.params.id)
  }, []);

  React.useEffect(() => {
    const { createdBy, assignedTo } = task.data
    createdBy? getUserByUUID(createdBy) : ''
    assignedTo? getAssignedToByUUID(assignedTo) : ''
  }, [task.data]);

  const drawer = (
    <div className={classes.drawer}>
      <List
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <Typography variant="subtitle1">Tasks</Typography>
          </ListSubheader>
        }
      >
        {tasks && tasks.map(task => (
          <ListItem button key={task.id} onClick={() => getUtilityTask(task.id)}>
            <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-around'
      >
        <Grid item md={2}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              
            </Hidden>
            <Hidden xsDown implementation="css">
              <div
                className={classes.drawerPaper}
              >
                {drawer}
              </div>
            </Hidden>
          </nav>
        </Grid>
        <Grid item md={7}>
          <div className={classes.content}>
            <Typography variant="subtitle1">Details</Typography>
            <div className={classes.buttonGroup}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button>Edit</Button>
                <Button>Assign</Button>
              </ButtonGroup>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button>To do</Button>
                <Button>In Progress</Button>
                <Button>Done</Button>
              </ButtonGroup>
            </div>
            
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                  <TableRow key={task.data.title}>
                    <TableCell component="th" scope="row">
                      Title
                    </TableCell>
                    <TableCell align="left">{task.data.title}</TableCell>
                  </TableRow>
                  <TableRow key={task.data.description}>
                    <TableCell component="th" scope="row">
                      Description
                    </TableCell>
                    <TableCell align="left">{task.data.description}</TableCell>
                  </TableRow>
                  <TableRow key={task.data.status}>
                    <TableCell component="th" scope="row">
                      Status
                    </TableCell>
                    <TableCell align="left">{task.data.status}</TableCell>
                  </TableRow>
                  <TableRow key={task.data.assignedTo}>
                    <TableCell component="th" scope="row">
                      Assigned To
                    </TableCell>
                    <TableCell align="left">{task.assignedTo.emailAddress}</TableCell>
                  </TableRow>
                  <TableRow key={task.data.createdBy}>
                    <TableCell component="th" scope="row">
                      Owner
                    </TableCell>
                    <TableCell align="left">{task.createdBy.emailAddress}</TableCell>
                  </TableRow>
                  <TableRow key={task.data.startDate}>
                    <TableCell component="th" scope="row">
                      Date Issued
                    </TableCell>
                    <TableCell align="left">
                      {<span>
                          {task.data.startDate? moment(task.data.startDate).format('lll') : ''}
                      </span>}
                    </TableCell>
                  </TableRow>
                  <TableRow key={task.data.endDate}>
                    <TableCell component="th" scope="row">
                      End Date
                    </TableCell>
                    <TableCell align="left">
                      {<span>
                          {task.data.endDate? moment(task.data.endDate).format('lll') : ''}
                      </span>}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

          </div>
        </Grid>
        <Grid item md={3}>
          <Typography variant="subtitle2">Attachment Preview</Typography>
          <div className={classes.gridRoot}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <ListSubheader component="div">December</ListSubheader>
              </GridListTile>
              {task.data.documents && task.data.documents.map((tile, index) => (
                <GridListTile key={index}>
                  <img src={tile.fileUrl} alt={tile.docName} />
                  <GridListTileBar
                    title={tile.docName}
                    subtitle={<span>{tile.description}</span>}
                    actionIcon={
                      <IconButton aria-label={`info about ${tile.docName}`} className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

TaskList.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  tasks: Selectors.makeSelectTasks(),
  task : Selectors.makeSelectTask(),
  users: Selectors.makeSelectEmployees(),
  user: Selectors.makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
    getUtilityTask: (id) => dispatch(Actions.getUtilityTask(id)),
    getUserByUUID: (id) => dispatch(Actions.getUserByUUID(id)),
    getAssignedToByUUID: (id) => dispatch(Actions.getAssignedToByUUID(id)),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
)(TaskList));
