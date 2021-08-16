import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route, useRouteMatch } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayrun from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
import PayrunsList from './components/PayrunsList';
import PayrunDetails from './payrunDetails';
import AddPayrun from './AddPayrun/AddPayrun';
import PayrunDialog from './components/PayrunDialog';
import ConfirmDeletePayrunDialog from './components/ConfirmDeletePayrunDialog';

export function Payrun(props) {
  useInjectReducer({ key: 'payrun', reducer });
  useInjectSaga({ key: 'payrun', saga });
  const { path } = useRouteMatch();

  const { loading, getPayruns } = props;

  useEffect(() => {
    getPayruns();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payroll — Payrun</title>
        <meta name="description" content="Description of Payrun" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={PayrunsList} />
        <Route path={`${path}/view/:payrunId`} component={PayrunDetails} />
        <Route path={`${path}/new`} component={AddPayrun} />
      </ModuleLayout>

      <PayrunDialog />
      <ConfirmDeletePayrunDialog />
    </div>
  );
}

Payrun.propTypes = {};

const mapStateToProps = createStructuredSelector({
  payrun: makeSelectPayrun(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayruns: () => dispatch(Actions.getPayruns()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Payrun);
