import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Box, Grid, Menu, MenuItem, List, ListItem, ListItemText, FormControlLabel, Icon, IconButton, Typography } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade } from '@material-ui/core/styles/colorManipulator';
// import LoadingIndicator from '../../../../components/LoadingIndicator';
import moment from 'moment'
import Lens from '@material-ui/icons/Lens'
import tasksIcon from '../../../images/tasksIcon.svg'
import {AddTask} from '../components/AddButton';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AddTaskDialog from './components/AddTaskDialog'
import TaskPreviewDialog from './components/TaskPreviewDialog'
import NoTasksList from './components/NoTasksList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  datatable: {
    flexGrow: 1,
    '& .MuiTableRow-root:hover': {
      // backgroundColor: theme.palette.primary.main,
      cursor: 'pointer'
    }
  },
  button: {
    borderRadius: '20px',
    margin: theme.spacing(5, 0),
    padding: theme.spacing(1, 15),
  },
  status: {
    width: 20,
    height: 20,
    'approved': { color: 'blue'},
    'inProgress': { color: 'orange'},
    'done': { color: 'green'},
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const TasksList = props => {
  const classes = useStyles();
  const { loading, openNewTaskDialog, getUtilityTasks, getEmployees, tasks, users } = props;

  console.log(props, "Get props")
  console.log(users, "Get users")

  React.useEffect(() => {
    getUtilityTasks()
    getEmployees()
  }, []);

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
              <Lens className={classes.status} /> {value}
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
      // console.log(rowData, rowState);
      console.log(props, "this.props")
      props.history.push('/dashboard/task/' + rowData[0])
    },
    isRowSelectable: (dataIndex, selectedRows) => {
      //prevents selection of any additional row after the third
      if (selectedRows.data.length > 2 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
      //prevents selection of row with title "Attorney"
      return tasks[dataIndex][1] != "Attorney";
    },
    selectableRowsHeader: false
  };

  // if (loading) {
  //   return <List component={LoadingIndicator} />;
  // }

  if(tasks && tasks.length === 0){
    return <NoTasksList />
  }

  return (
    <React.Fragment>
      <Grid container justify='center'>
        <Grid item xs={12} md={2}>
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
  users: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    openNewTaskDialog: () => dispatch(Actions.openNewTaskDialog()),
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
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
)(TasksList));
