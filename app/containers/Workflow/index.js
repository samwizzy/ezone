import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProjectMgt from './selectors';
import reducer from './reducer';
import saga from './saga';
import Dashboard from './Dashboard'
import ProcessOwners from './ProcessOwners'
import WorkflowRules from './WorkflowRules'
import SeverityModels from './SeverityModels'

const key = "workflow"
export function WorkflowApp({ match }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { path, url } = match

  return (
    <div>
      <Helmet>
        <title>Workflow</title>
        <meta name="description" content="Description of Workflow" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={Dashboard} />
        <Route exact path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/process-owners`} component={ProcessOwners} />
        <Route path={`${path}/rules`} component={WorkflowRules} />
        <Route path={`${path}/severity-models`} component={SeverityModels} />
      </Fragment>
    </div>
  );
}

WorkflowApp.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  projectMgt: makeSelectProjectMgt(),
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
)(WorkflowApp);
