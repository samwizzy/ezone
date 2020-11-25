import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProcessOwners from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import ProcessOwnersList from './components/ProcessOwnersList';
import ProcessOwnerForm from './ProcessOwnerForm/ProcessOwnerForm';
import ModuleLayout from '../components/ModuleLayout';

export function ProcessOwnersApp(props) {
  useInjectReducer({ key: 'processOwners', reducer });
  useInjectSaga({ key: 'processOwners', saga });

  const { match, getJobs, getEmployees } = props;
  const { path, url } = match

  useEffect(() => {
    getJobs();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Process Owners</title>
        <meta name="description" content="Description of Process Owners" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={ProcessOwnersList} />
        <Route path={`${path}/new`} component={ProcessOwnerForm} />
      </ModuleLayout>
    </div>
  );
}

ProcessOwnersApp.propTypes = {
  getJobs: PropTypes.func,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  processOwners: makeSelectProcessOwners(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobs: () => dispatch(Actions.getJobs()),
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(ProcessOwnersApp);
