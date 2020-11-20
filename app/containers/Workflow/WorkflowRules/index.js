import React, { Fragment, memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectWorkflowRules from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import WorkflowRulesList from './components/WorkflowRulesList';
import WorkflowRuleForm from './components/WorkflowRuleForm';
import StepDialog from './StepForm/StepDialog';
import ModuleLayout from '../components/ModuleLayout';

export function WorkflowRulesApp(props) {
  useInjectReducer({ key: 'workflowRules', reducer });
  useInjectSaga({ key: 'workflowRules', saga });

  const { match, getJobs } = props;
  const { path, url } = match

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Workflow Rules</title>
        <meta name="description" content="Description of Workflow rules" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={WorkflowRulesList} />
        <Route path={`${path}/new`} component={WorkflowRuleForm} />
      </ModuleLayout>

      <StepDialog />
    </div>
  );
}

WorkflowRulesApp.propTypes = {
  getJobs: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  workflowRules: makeSelectWorkflowRules(),
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
)(WorkflowRulesApp);
