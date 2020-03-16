import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles'
import { green, orange } from '@material-ui/core/colors'
import { Button, Box, Grid, Menu, MenuItem, List, ListItem, ListItemText, ListSubheader, FormControlLabel, Icon, IconButton, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade } from '@material-ui/core/styles/colorManipulator';
import LoadingIndicator from '../../../components/LoadingIndicator';
import moment from 'moment'
import Lens from '@material-ui/icons/Lens'
import tasksIcon from '../../../images/tasksIcon.svg'
import {AddTask} from '../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import NoTasksList from './components/NoTasksList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  datatable: {
    flexGrow: 1,
    boxShadow: 0,
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    }
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
  status: {
    width: 14,
    height: 14,
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  }
}));

const TasksList = props => {
  const classes = useStyles();
  const { loading, getUtilityTasksByStatus, openNewTaskDialog, tasks, users } = props;

  console.log(users, "Get users")

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
      name: 'endDate',
      label: 'End Date',
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
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <Typography variant="inherit" color="textSecondary">
              <Lens className={classNames(classes.status, {'approved': true})} /> {value}
            </Typography>
          )
        }
      },
    }
  ];

  const options = {
    filter: true,
    filterType: "checkbox",
    responsive: "scrollMaxHeight",
    selectableRows: 'none',
    customToolbar: () => <AddTask openNewTaskDialog={openNewTaskDialog} />,
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

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if(tasks && tasks.length === 0){
    return <NoTasksList />
  }

  return (
    <div className={classes.root}>
      <Grid container justify='space-evenly' spacing={2}>
        <Grid item xs={12} md={2}>
          <List 
            component="nav" 
            aria-label="secondary mailbox folders"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Status
              </ListSubheader>
            }
          >
            <ListItem button>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('PENDING')}>
              <ListItemText primary="Pending" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('INPROGRESS')}>
              <ListItemText primary="In-Progress" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('EXPIRED')}>
              <ListItemText primary="Due" />
            </ListItem>
            <ListItem button onClick={() => getUtilityTasksByStatus('COMPLETED')}>
              <ListItemText primary="Completed" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={10}>
          <MUIDataTable
            title="Task List"
            data={tasks}
            columns={columns}
            options={options}
            className={classes.datatable}
          />
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
