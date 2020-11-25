import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import AssetTypesList from './AssetTypesList';
import AssetTypeDialog from './components/AssetTypeDialog';

export function AssetTypesSettings({history, accSetupData}) {
  const { path } = useRouteMatch();

  if(!accSetupData){
    history.push('/account/settings');
  }

  return (
    <div>
      <Helmet>
        <title>Asset Types Settings</title>
        <meta
          name="description"
          content="Description of Asset Types Settings"
        />
      </Helmet>

      <AssetTypesList />

      <AssetTypeDialog />
    </div>
  );
}

AssetTypesSettings.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  accSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(AssetTypesSettings);
