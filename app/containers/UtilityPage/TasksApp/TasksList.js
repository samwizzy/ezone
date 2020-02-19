import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Menu, MenuItem, List, ListItem, ListItemText, FormControlLabel, Icon, IconButton, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Lens from '@material-ui/icons/Lens'
import tasksIcon from '../../../images/tasksIcon.svg'
import {AddTask} from './../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AddTaskDialog from './components/AddTaskDialog'
import TaskPreviewDialog from './components/TaskPreviewDialog'
import NoTasksList from './components/NoTasksList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    color: console.log(theme, "Theme")
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const TasksList = props => {
  const classes = useStyles();
  const { loading, openNewTaskDialog, getUtilityTasks, tasks } = props;

  console.log(tasks, "Get tasks")

  // React.useEffect(() => {
  //   getUtilityTasks()
  // }, []);

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
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
      name: 'dateAssigned',
      label: 'Date Assign',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'dueDate',
      label: 'Due Date',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return <Button><Icon color='error'>lens</Icon> {value} </Button>
        }
      },
    }
  ];

  const options = {
    filterType: 'checkbox',
    responsive: 'scrollMaxHeight',
    selectableRows: 'none',
    customToolbar: () => <AddTask openNewTaskDialog={openNewTaskDialog} />,
  };

  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if(tasks && tasks.length === 0){
    return <NoTasksList />
  }

  return (
    <React.Fragment>
      <Grid container justify='center'>
        <Grid item xs={2} md={2}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItem button>
              <ListItemText primary="All" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Ongoing" />
            </ListItem>
            <ListItemLink href="#simple-list">
              <ListItemText primary="Due" />
            </ListItemLink>
            <ListItem button>
              <ListItemText primary="Expired" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={10} md={10}>
          <MUIDataTable
            title="Task List"
            data={tasks}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>

      <AddTaskDialog />
      <TaskPreviewDialog />
    </React.Fragment>
  );
};

TasksList.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  tasks: Selectors.makeSelectTasks(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TasksList);
