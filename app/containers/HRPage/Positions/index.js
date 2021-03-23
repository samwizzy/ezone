import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import ModuleLayout from './ModuleLayout';
import PositionList from './PositionList';

export function PositionsPage(props) {
  return (
    <React.Fragment>
      <Helmet>
        <title>Positions</title>
        <meta name="description" content="ezone application positions page" />
      </Helmet>

      <ModuleLayout>
        <PositionList />
      </ModuleLayout>
    </React.Fragment>
  );
}

PositionsPage.propTypes = {};

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
)(PositionsPage);
