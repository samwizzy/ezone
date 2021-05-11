import React, { Fragment, memo } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectApplicationsPage from './selectors';
import * as Actions from './actions';
import ProjectsApp from './ProjectsApp';
import AccessOffers from './AccessOffers';
import PaymentSummary from './ProcessPayment';

export function Home(props) {
  useInjectReducer({ key: 'applications', reducer });
  useInjectSaga({ key: 'applications', saga });

  const { match, getModules, getModulesByAccessOffers, getPaystackGateways } = props;
  const { path } = match;

  React.useEffect(() => {
    getModules();
    getModulesByAccessOffers();
    getPaystackGateways();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Applications</title>
        <meta name="description" content="applications" />
      </Helmet>

      <Fragment>
        <Route exact path={path} component={ProjectsApp} />
        <Route exact path={`${path}/access-offers`} component={AccessOffers} />
        <Route exact path={`${path}/payment-summary`} component={PaymentSummary} />
      </Fragment>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  applications: makeSelectApplicationsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getModules: () => dispatch(Actions.getModules()),
    getModulesByAccessOffers: () => dispatch(Actions.getModulesByAccessOffers()),
    getPaystackGateways: () => dispatch(Actions.getPaystackGateways()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  memo,
)(Home);
