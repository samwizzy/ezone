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

  const { match, getRoles, getRights, getRoleRights, getEmployees, getModules } = props;
  const { path, url } = match

  useEffect(() => {
    getRoles();
    getRights();
    getRoleRights();
    getEmployees();
    getModules();
  }, []);

  return (
    <div>
      <Helmet>
        <title>RoleRights</title>
        <meta name="description" content="Description of Role Rights" />
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
    getRights: () => dispatch(Actions.getRights()),
    getEmployees: () => dispatch(Actions.getEmployees()),
    getModules: () => dispatch(Actions.getModules()),
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
