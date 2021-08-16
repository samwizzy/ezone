import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, useRouteMatch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import makeSelectSettings, * as Selectors from './selectors';
import saga from './saga';
import PayrollSetup from './PayrollSetup';
import PayRunSettings from './PayRunSettings';
import TaxSettings from './TaxSettings';
import ModuleLayout from '../components/ModuleLayout';

const key = 'settings';

export function Settings(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = useRouteMatch();

  const { loading, getPayrollSetup } = props;

  useEffect(() => {
    getPayrollSetup();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payroll — Settings</title>
        <meta name="description" content="Description of Settings" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={PayrollSetup} />
        <Route path={`${path}/pay-run`} component={PayRunSettings} />
        <Route path={`${path}/tax`} component={TaxSettings} />
      </ModuleLayout>
    </div>
  );
}

Settings.propTypes = {};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayrollSetup: () => dispatch(Actions.getPayrollSetup()),
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
)(Settings);
