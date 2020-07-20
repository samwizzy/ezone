import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import makeSelectUtilityPage, * as Selectors from './selectors';
import saga from './saga';
import reducer from './reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TasksList from './tasks'
import TaskList from './task'
// import TasksList from './TasksList'
// import TaskList from './TaskList'
import ModuleLayout from '../components/ModuleLayout'
import AddTaskDialog from './components/AddTaskDialog'
import ConfirmTaskDeleteDialog from './components/ConfirmTaskDeleteDialog'
import TaskPreviewDialog from './components/TaskPreviewDialog'
import AssignToDialog from './components/AssignToDialog'

const key = "utilityTask"
export function TasksApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getUtilityTasks, getEmployees, match } = props;
  const { params, path, url } = match

  console.log(path, "path task")
  console.log(url, "url task")

  React.useEffect(() => {
    getUtilityTasks()
    getEmployees()
  }, []);

  return (
    <div>
      <Helmet>
        <title>Tasks - Home</title>
        <meta name="description" content="Description of Tasks" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={TasksList} />
        <Route path={`${path}/:id`} component={TaskList} />
        {/* {params.id ?
          <TaskList /> : <TasksList />
        } */}
      </ModuleLayout>

      <AddTaskDialog />
      <ConfirmTaskDeleteDialog />
      <TaskPreviewDialog />
      <AssignToDialog />
    </div>
  );
};

TasksApp.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  utilityTask: makeSelectUtilityPage(),
  loading: Selectors.makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getUtilityTasks: () => dispatch(Actions.getUtilityTasks()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    dispatch
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
