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
import makeSelectSeverityModels from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import SeverityModelsList from './components/SeverityModelsList';
import SeverityModelForm from './components/SeverityModelForm';
import ModuleLayout from '../components/ModuleLayout';

export function SeverityModelsApp(props) {
  useInjectReducer({ key: 'severityModels', reducer });
  useInjectSaga({ key: 'severityModels', saga });

  const { match, getJobs } = props;
  const { path, url } = match

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Severity Models</title>
        <meta name="description" content="Description of Severity Models" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={SeverityModelsList} />
        <Route path={`${path}/new`} component={SeverityModelForm} />
      </ModuleLayout>
    </div>
  );
}

SeverityModelsApp.propTypes = {
  getJobs: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  severityModels: makeSelectSeverityModels(),
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
)(SeverityModelsApp);
