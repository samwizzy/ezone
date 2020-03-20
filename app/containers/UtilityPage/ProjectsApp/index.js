import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import saga from '../saga';
import reducer from '../reducer';
import ProjectsPage from './ProjectsPage';
import DashboardLayout from '../components/DashboardLayout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ProjectsApp = props => {
  useInjectReducer({ key: 'utilityPage', reducer });
  useInjectSaga({ key: 'utilityPage', saga });

  const classes = useStyles();
  const {
    loading,
    getUtilityTasks,
    getEmployees,
    users,
    match,
  } = props;
  const { params } = match;

  React.useEffect(() => {
    getUtilityTasks();
    getEmployees();
  }, []);

  return (
    <DashboardLayout>
      <ProjectsPage />
    </DashboardLayout>
  );
};

ProjectsApp.propTypes = {
  loading: PropTypes.bool,
  openNewTaskDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
  )(ProjectsApp),
);
