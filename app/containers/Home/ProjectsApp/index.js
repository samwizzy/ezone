import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import ProjectsList from './ProjectsList';
import ModuleLayout from '../components/ModuleLayout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ProjectsApp = props => {
  const classes = useStyles();
  const { applications } = props;

  return (
    <ModuleLayout>
      <ProjectsList applications={applications} />
    </ModuleLayout>
  );
};

ProjectsApp.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  applications: Selectors.makeSelectApplications(),
});

function mapDispatchToProps(dispatch) {
  return {
    getApplications: () => dispatch(Actions.getApplications()),
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
