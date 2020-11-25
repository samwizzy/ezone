import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from "react-router-dom";
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import EarningDetails from './EarningDetails';

export function EarningDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getEarningById } = props;
  const { earningId } = params

  useEffect(() => {
    if (earningId) {
      getEarningById(earningId);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Earning Details</title>
        <meta name="description" content="Description of Earning Details" />
      </Helmet>

      <EarningDetails />
    </div>
  )
}

EarningDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEarningById: data => dispatch(Actions.getEarningById(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EarningDetailsPage);
