import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from '../actions';
import makeSelectUtilityPage, * as Selectors from './../selectors';
import saga from './../saga';
import reducer from './../reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TasksList from './TasksList'
import TaskList from './TaskList'
import ModuleLayout from '../components/ModuleLayout'
import AddTaskDialog from './components/AddTaskDialog'
// import ConfirmTaskDeleteDialog from './components/ConfirmTaskDeleteDialog'
// import TaskPreviewDialog from './components/TaskPreviewDialog'
// import AssignToDialog from './components/AssignToDialog'

const key = "utilityPage"

export function TasksApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { loading, getUtilityTasks, getEmployees, match } = props;
  const { params } = match

  React.useEffect(() => {
    getUtilityTasks()
    getEmployees()
  }, []);

  return (
    <div>
      <Helmet>
        <title>Tasks - Index</title>
        <meta name="description" content="Description of Tasks" />
      </Helmet>

      <ModuleLayout>
        {params.id ?
          <TaskList /> : <TasksList />
        }
      </ModuleLayout>

      <AddTaskDialog />
      {/* <ConfirmTaskDeleteDialog />
      <TaskPreviewDialog />
      <AssignToDialog /> */}
    </div>
  );
};

TasksApp.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  utilityPage: makeSelectUtilityPage(),
  loading: Selectors.makeSelectLoading(),
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
