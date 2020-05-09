import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import { Backdrop, Box, Button, ButtonGroup, CircularProgress, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, TableFooter, TextField, MobileStepper, Grid, GridList, GridListTile, GridListTileBar, Divider, Menu, MenuItem, Paper, List, ListItem, ListSubheader, ListItemText, ListItemIcon, FormControlLabel, Icon, IconButton, Typography, Toolbar, Hidden, Drawer } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Skeleton from '@material-ui/lab/Skeleton';
import { green, orange } from '@material-ui/core/colors'
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../actions';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from '../selectors';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import EditSharp from '@material-ui/icons/EditSharp';
import Assignment from '@material-ui/icons/Assignment';
import Add from '@material-ui/icons/Add';
import Lens from '@material-ui/icons/Lens';
import ReactDropZone from './components/ReactDropZone'
import CommentList from './components/CommentList'

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
  },
  flex: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth, // works better without position:fixed
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
  table: {
    '& th.MuiTableCell-root': {
      width: '20%'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
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
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[50]}`,
    '& .MuiButtonGroup-root:last-child': {
      marginLeft: theme.spacing(1)
    }
  },
  stepRoot: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const TaskList = props => {
  const classes = useStyles();
  const { loading, openNewTaskDialog, openEditTaskDialog, openAssignToDialog, getUtilityTask, getTaskComments, commentTask, authUser, tasks, task, comments, users, user, match, container } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [comment, setComment] = React.useState({
    comment: "",
    commentBy: authUser && authUser.uuId,
    taskId: task.id
  });
  const [value, setValue] = React.useState(0);
  const filteredTasks = _.orderBy(tasks, ['dateCreated'], ['desc']);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = task.documents && task.documents.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(comment, "comment from comment")
  console.log(task, "task from tasklist single")
  console.log(comments, "comments from comments comments")

  React.useEffect(() => {
    getUtilityTask(match.params.id)
    setSelectedIndex(match.params.id)
  }, []);

  React.useEffect(() => {
    if(task){
      setComment(_.set({...comment}, 'taskId', task.id))
      getTaskComments(task.id)
    }
  }, [task]);

  const handleChange = event => {
    setComment(_.set({...comment}, event.target.name, event.target.value))
  }

  const handleSubmit = event => {
    commentTask(comment)
    setComment(_.set({...comment, comment: '', commentBy: ''}))
  }

  const handleTaskById = id => {
    setSelectedIndex(id)
    getUtilityTask(id)
    props.history.push({pathname: '/task-manager/task/' + id})
  }

  const drawer = (
    <div>
      <List
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div className={classes.flex}>
              <Typography variant="h6">
                Tasks 
              </Typography>
              <IconButton onClick={openNewTaskDialog}><Add/></IconButton>
            </div>
          </ListSubheader>
        }
      >
        {tasks && tasks.length === 0 && <Skeleton animation="wave" />}
        {filteredTasks && filteredTasks.map(task => (
          <ListItem disableRipple button selected={selectedIndex == task.id} key={task.id} onClick={() => handleTaskById(task.id)}>
            <ListItemIcon><AssignmentTurnedIn /></ListItemIcon>
            <ListItemText primary={task.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-between'
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
            <Backdrop className={classes.backdrop} open={loading}>
              <CircularProgress color="inherit" />
            </Backdrop>

            <Typography variant="h6">Details</Typography>
            <div className={classes.buttonGroup}>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button onClick={openEditTaskDialog} startIcon={<EditSharp className={classes.icon} />}>Edit</Button>
                <Button onClick={openAssignToDialog} startIcon={<Assignment className={classes.icon} />}>Assign</Button>
              </ButtonGroup>
              <ButtonGroup size="small" aria-label="small outlined button group">
                <Button startIcon={<Lens className={classNames(classes.icon, {'approved': true})} />}>To do</Button>
                <Button startIcon={<Lens className={classNames(classes.icon, {'inProgress': true})} />}>In Progress</Button>
                <Button startIcon={<Lens className={classNames(classes.icon, {'done': true})} />}>Done</Button>
              </ButtonGroup>
            </div>
            {task && Object.keys(task).length > 0 ?
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="custom pagination table">
                <TableBody>
                  <TableRow key={task.title}>
                    <TableCell component="th" scope="row">
                      Title
                    </TableCell>
                    <TableCell align="left">{task.title}</TableCell>
                  </TableRow>
                  <TableRow key={task.description}>
                    <TableCell component="th" scope="row">
                      Description
                    </TableCell>
                    <TableCell align="left">{task.description}</TableCell>
                  </TableRow>
                  <TableRow key={task.status}>
                    <TableCell component="th" scope="row">
                      Status
                    </TableCell>
                    <TableCell align="left">{task.status}</TableCell>
                  </TableRow>
                  <TableRow key={task.assignedTo}>
                    <TableCell component="th" scope="row">
                      Assigned To
                    </TableCell>
                    <TableCell align="left">{task.assignedTo}</TableCell>
                  </TableRow>
                  <TableRow key={task.createdBy}>
                    <TableCell component="th" scope="row">
                      Owner
                    </TableCell>
                    <TableCell align="left">{task.createdBy}</TableCell>
                  </TableRow>
                  <TableRow key={task.startDate}>
                    <TableCell component="th" scope="row">
                      Date Issued
                    </TableCell>
                    <TableCell align="left">
                      {task.startDate? moment(task.startDate).format('lll') : ''}
                    </TableCell>
                  </TableRow>
                  <TableRow key={task.endDate}>
                    <TableCell component="th" scope="row">
                      End Date
                    </TableCell>
                    <TableCell align="left">
                      {task.endDate? moment(task.endDate).format('lll') : ''}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            :
            <Skeleton variant="rect" animation="wave" width="100%" height={118} />
            }

            <div className={classes.demo1}>
              <Box my={2}>
                <TextField
                  id="outlined-multiline-static"
                  name="comment"
                  label="Comment"
                  multiline
                  fullWidth
                  rows="4"
                  rowsMax="4"
                  value={comment.comment}
                  onChange={handleChange}
                  variant="outlined"
                />
                <Button className={classes.submitButton} variant="outlined" onClick={handleSubmit} color="primary">
                  Post
                </Button>
              </Box>
              <AntTabs value={value} onChange={handleTabChange} aria-label="ant example">
                <AntTab label="Comments" />
                <AntTab label="History" />
                <AntTab label="Activity" />
              </AntTabs>
              <Typography className={classes.padding} />
              {value == 0 && <CommentList />}
              {value == 1 && <CommentList />}
              {value == 2 && <CommentList />}
            </div>
                  
          </div>
          
        </Grid>
        <Grid item md={3}>
          <div className={classes.gridRoot}>
            <GridList cellHeight={180} className={classes.gridList}>
              <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                {task.documents && task.documents.length > 0? 
                <ListSubheader component="div">Attachment Preview</ListSubheader>:
                <ListSubheader component="div">There are no Attachment</ListSubheader>
                }
              </GridListTile>
              {task.documents && task.documents.map((tile, index) => (
                <GridListTile key={index}>
                  <img src={tile.fileUrl} alt={tile.docName} />
                  <GridListTileBar
                    title={tile.docName}
                    subtitle={<span>{tile.description}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>

          {task.documents && task.documents.length > 0 &&
          <div className={classes.stepRoot}>
            <Paper square elevation={0} className={classes.header}>
              <Typography>{task.documents[activeStep].docName}</Typography>
            </Paper>
            <img
              className={classes.img}
              src={task.documents[activeStep].fileUrl}
              alt={task.documents[activeStep].docName}
            />
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
          }

          <div>
            <ReactDropZone uploadFileAction={props.addTaskAttachment} task={task} />
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
  comments : Selectors.makeSelectTaskComments(),
  users: Selectors.makeSelectEmployees(),
  user: Selectors.makeSelectUser(),
  authUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
    openEditTaskDialog: () => dispatch(Actions.openEditTaskDialog()),
    openAssignToDialog: () => dispatch(Actions.openAssignToDialog()),
    addTaskAttachment: (data) => dispatch(Actions.addTaskAttachment(data)),
    commentTask: (data) => dispatch(Actions.commentTask(data)),
    getUtilityTask: (id) => dispatch(Actions.getUtilityTask(id)),
    getTaskComments: (id) => dispatch(Actions.getTaskComments(id)),
    getUserByUUID: (id) => dispatch(Actions.getUserByUUID(id)),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(TaskList);
