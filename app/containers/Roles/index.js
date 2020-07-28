/**
 *
 * Role Rights
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectRoleRightsApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import RolesList from './components/RolesList';
import ModuleLayout from './ModuleLayout';
import RoleRights from './components/RoleRights';
import RoleDialog from './components/RoleDialog';
import RightDialog from './components/RightDialog';

const key = 'roleRights'

export function RoleRightsApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { match, getRoles, getRoleRights, getEmployees } = props;
  const { path, url } = match

  useEffect(() => {
    getRoles();
    getRoleRights();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>RoleRights</title>
        <meta name="description" content="Description of RoleRights" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={RolesList} />
        <Route path={`${path}/new`} component={RoleRights} />
      </ModuleLayout>

      <RoleDialog />
      <RightDialog />
    </div>
  );
}

RoleRightsApp.propTypes = {
  getRoleRights: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roleRights: makeSelectRoleRightsApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoles: () => dispatch(Actions.getRoles()),
    getRoleRights: () => dispatch(Actions.getRoleRights()),
    getEmployees: () => dispatch(Actions.getEmployees()),
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
)(RoleRightsApp);
