import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from "react-router-dom";
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import DeductionDetails from './DeductionDetails';

export function DeductionDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getDeductionById } = props;
  const { deductionId } = params

  useEffect(() => {
    if (deductionId) {
      getDeductionById(deductionId);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Deduction Details</title>
        <meta name="description" content="Description of Deduction Details" />
      </Helmet>

      <DeductionDetails />
    </div>
  )
}

DeductionDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDeductionById: data => dispatch(Actions.getDeductionById(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DeductionDetailsPage);
