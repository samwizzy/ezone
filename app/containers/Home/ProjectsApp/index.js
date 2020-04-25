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
import ProjectsList from './ProjectsList';
import ModuleLayout from '../components/ModuleLayout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ProjectsApp = props => {
  useInjectReducer({ key: 'utilityPage', reducer });
  useInjectSaga({ key: 'utilityPage', saga });

  const classes = useStyles();
  const { loading } = props;

  React.useEffect(() => {
  }, []);

  return (
    <ModuleLayout>
      <ProjectsList />
    </ModuleLayout>
  );
};

ProjectsApp.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(ProjectsApp);
