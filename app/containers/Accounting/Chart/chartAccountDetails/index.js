import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import { CircleLoader } from '../../../../components/LoadingIndicator';
import ChartAccountDetails from './ChartAccountDetails';

export function ChartAccountDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getChartOfAccountById } = props;
  const { accountId } = params;
  console.log(params, 'paramss');

  useEffect(
    () => () => {
      if (accountId) {
        getChartOfAccountById(accountId);
      }
    },
    [],
  );

  return (
    <div>
      <Helmet>
        <title>Account Details</title>
        <meta name="description" content="Description of Account Details" />
      </Helmet>

      <ChartAccountDetails />
    </div>
  );
}

ChartAccountDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getChartOfAccountById: data =>
      dispatch(Actions.getChartOfAccountById(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ChartAccountDetailsPage);
