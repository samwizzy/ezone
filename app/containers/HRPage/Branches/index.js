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
import ModuleLayout from './ModuleLayout'
import BranchList from './BranchList';

export function BranchPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Branch Page</title>
        <meta name="description" content="ezone application employee branch page" />
      </Helmet>

      <ModuleLayout>
        <BranchList />
      </ModuleLayout>
    </React.Fragment>
  );
}

BranchPage.propTypes = {};

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
)(BranchPage);
