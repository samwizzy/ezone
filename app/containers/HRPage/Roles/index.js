import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import ModuleLayout from './ModuleLayout';
import RoleList from './RoleList';

export function RolePage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Role</title>
        <meta name="description" content="ezone application role page" />
      </Helmet>

      <ModuleLayout>
        <RoleList />
      </ModuleLayout>
    </React.Fragment>
  );
}

RolePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RolePage);
