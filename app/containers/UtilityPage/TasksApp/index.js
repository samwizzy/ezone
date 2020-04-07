import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import saga from './../saga';
import reducer from './../reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TasksList from './TasksList'
import TaskList from './TaskList'
import ModuleLayout from '../components/ModuleLayout' 
import AddTaskDialog from './components/AddTaskDialog'
import TaskPreviewDialog from './components/TaskPreviewDialog'
import AssignToDialog from './components/AssignToDialog'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  }
}));

const TasksApp = props => {
    useInjectReducer({ key: 'utilityPage', reducer });
    useInjectSaga({ key: 'utilityPage', saga });

    const classes = useStyles();
    const { loading, getUtilityTasks, getEmployees, tasks, match } = props;
    const { params } = match

    React.useEffect(() => {
        getUtilityTasks()
        getEmployees()
    }, []);

    return (
      <ModuleLayout>
        { params.id? 
          <TaskList /> : <TasksList />
        }
        
        <AddTaskDialog />
        <TaskPreviewDialog />
        <AssignToDialog />
      </ModuleLayout>
    );
};

TasksApp.propTypes = {
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
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
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
)(TasksApp);
