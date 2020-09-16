/**
 *
 * Companies
 *
 */

import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProjectMgtJobs from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import JobsList from './components/JobsList';
import JobForm from './components/JobForm';
import ModuleLayout from '../components/ModuleLayout';

export function JobsApp(props) {
  useInjectReducer({ key: 'projectMgtJobs', reducer });
  useInjectSaga({ key: 'projectMgtJobs', saga });

  const { match, getJobs } = props;
  const { path, url } = match

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Jobs</title>
        <meta name="description" content="Description of project mgt jobs" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={JobsList} />
        <Route path={`${path}/new`} component={JobForm} />
      </ModuleLayout>
    </div>
  );
}

JobsApp.propTypes = {
  getJobs: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  projectMgtJobs: makeSelectProjectMgtJobs(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobs: () => dispatch(Actions.getJobs()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(JobsApp);
