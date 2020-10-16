import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import ModuleLayout from './ModuleLayout'
import BranchList from './BranchList';

export function BranchPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Branch</title>
        <meta name="description" content="ezone application branch page" />
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
