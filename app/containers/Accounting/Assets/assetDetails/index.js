import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import AssetDetails from './AssetDetails';

export function AssetDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getAssetById } = props;
  const { assetId } = params;
  console.log(params, 'paramss');

  useEffect(() => {
    if (assetId) {
      getAssetById(assetId);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Asset Details</title>
        <meta name="description" content="Description of Asset Details" />
      </Helmet>

      <AssetDetails />
    </div>
  );
}

AssetDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAssetById: data => dispatch(Actions.getAssetById(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssetDetailsPage);
