import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles'
import { green, orange, red } from '@material-ui/core/colors'
import { Button, Box, Grid, Menu, MenuItem, List, ListItem, ListItemIcon, ListItemText, ListSubheader, FormControlLabel, Icon, IconButton, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade } from '@material-ui/core/styles/colorManipulator';
import LoadingIndicator from '../../../components/LoadingIndicator';
import moment from 'moment'
import Lens from '@material-ui/icons/Lens'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import {AddTask} from '../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import NoTasksList from './components/NoTasksList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    }
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
  iconButton: {
    width: 24,
    height: 24,
    padding: 0,
    '&.delete': { color: theme.status.danger},
  },
  list: {
    "& .MuiListItemIcon-root": {
      minWidth: "40px !important"
    },
  },
  status: {
    width: 14,
    height: 14,
    color: theme.palette.common.black,
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.expired': { color: red[500]},
    '&.done': { color: green[500]},
  }
}));

const TasksList = props => {
  const classes = useStyles();
  const { loading, getUtilityTasks, getUtilityTasksByStatus, openNewTaskDialog, deleteTask, tasks, users } = props;

console.log(tasks, "tasks")

  const columns = [
    {
      name: 'id',
      label: 'Id',
      options: {
        filter: true,
        display: 'excluded'
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
      },
    },
    {
      name: 'assignTo',
      label: 'Assign To',
      options: {
        filter: true,
        sort: false
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Assigned',
      options: {
        display: 'excluded',
        filter: true,
        sort: false,
        customBodyRender: day => {
          return (
            <Typography variant="inherit" color="textSecondary">
                {moment(day).format('lll')}
            </Typography>
          )
        }
      },
    },
    {
      name: 'startDate',
      label: 'Start Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: day => {
          return (
            <Typography variant="inherit" color="textSecondary">
                {moment(day).format('lll')}
            </Typography>
          )
        }
      },
    },
    {
      name: 'dateCreated',
      label: 'Date Created',
      options: {
        filter: true,
        sort: false,
        sortDirection: "desc",
        display: "excluded"
      },
    },
    {
      name: 'endDate',
      label: 'End Date',
      options: {
        filter: true,
        sort: false,
        customBodyRender: date => {
          return (
            <Typography variant="inherit" color="textSecondary">
                {moment(date).format('lll')}
            </Typography>
          )
        }
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: status => {
          return (
            <Typography variant="inherit" color="textSecondary">
              <Lens className={classNames(classes.status, {'approved': true})} /> {status}
            </Typography>
          )
        }
      },
    },
    {
      name: 'id',
      label: ' ',
      options: {
        filter: true,
        sort: false,
        customBodyRender: id => {
          return (
            <IconButton onClick={event => {event.stopPropagation(), deleteTask(id)}} className={classNames(classes.iconButton, {'delete': true})}>
              <DeleteOutline />
            </IconButton>
          )
        }
      },
    }
  ];

  const options = {
    filter: false,
    print: false,
    viewColumns: false,
    filterType: "checkbox",
    responsive: "scrollMaxHeight",
    selectableRows: 'none',
    // customToolbar: () => <AddTask openNewTaskDialog={openNewTaskDialog} />,
    rowsPerPage: 25,
    rowsPerPageOptions: [25,50,100],
    onRowClick: (rowData, rowState) => {
      props.history.push('/dashboard/task/' + rowData[0])
    },
    isRowSelectable: (dataIndex, selectedRows) => {
      //prevents selection of any additional row after the third
      if (selectedRows.data.length > 2 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      //prevents selection of row with title "Attorney"
      return tasks[dataIndex][1] != "Attorney";
    },
    selectableRowsHeader: false,
    elevation: 0
  };

  if(tasks && tasks.length === 0){
    return <NoTasksList />
  }

  return (
    <div className={classes.root}>
      <Grid container justify='space-between'>
        <Grid item xs={12} md={2}>
          <List 
            className={classes.list}
            component="nav" 
            aria-label="secondary mailbox folders"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                <Typography variant="h6">Status</Typography>
              </ListSubheader>
            }
          >
            <ListItem button onClick={getUtilityTasks}>
              <ListItemIcon><Lens className={classNames(classes.status)} /></ListItemIcon>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('PENDING')}>
              <ListItemIcon><Lens className={classNames(classes.status, {'approved': true})} /></ListItemIcon>
              <ListItemText primary="Pending" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('INPROGRESS')}>
              <ListItemIcon><Lens className={classNames(classes.status, {'inProgress': true})} /></ListItemIcon>
              <ListItemText primary="In-Progress" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('EXPIRED')}>
              <ListItemIcon><Lens className={classNames(classes.status, {'expired': true})} /></ListItemIcon>
              <ListItemText primary="Due" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('COMPLETED')}>
              <ListItemIcon><Lens className={classNames(classes.status, {'done': true})} /></ListItemIcon>
              <ListItemText primary="Completed" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={10}>
          {loading?
            <List component={LoadingIndicator} />
          :
          (
            <div>
              <Box mb={2} align="right">
                <AddTask openNewTaskDialog={openNewTaskDialog} />
              </Box>
              <MUIDataTable
                title="Task List"
                data={tasks}
                columns={columns}
                options={options}
                className={classes.datatable}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

TasksList.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  tasks: Selectors.makeSelectTasks(),
  users: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
    deleteTask: id => dispatch(Actions.deleteTask(id)),
    getUtilityTasksByStatus: (status) => dispatch(Actions.getUtilityTasksByStatus(status)),
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
)(TasksList));
