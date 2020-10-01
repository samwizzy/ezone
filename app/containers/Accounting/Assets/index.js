import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, useRouteMatch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectFixedAssets, * as Selectors from './selectors';
import { CircleLoader } from '../../../components/LoadingIndicator';
import AssetsList from './AssetsList';
import NewAsset from './NewAsset';
import AssetDialog from './components/AssetDialog';

const key = 'fixedAssets';
export function AssetsSettings(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { path } = useRouteMatch();

  return (
    <div>
      <Helmet>
        <title>Fixed Assets Settings</title>
        <meta
          name="description"
          content="Description of Fixed Assets Settings"
        />
      </Helmet>

      <Route exact path={path} component={AssetsList} />
      <Route path={`${path}/new`} component={NewAsset} />
      <Route path={`${path}/edit/:assetId`} component={NewAsset} />

      <AssetDialog />
    </div>
  );
}

AssetsSettings.propTypes = {};

const mapStateToProps = createStructuredSelector({
  fixedAssets: makeSelectFixedAssets(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAssets: () => dispatch(Actions.getAssets()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AssetsSettings);
