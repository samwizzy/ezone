import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from "react-router-dom";
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import BenefitDetails from './BenefitDetails';

export function BenefitDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getBenefitById } = props;
  const { benefitId } = params

  useEffect(() => {
    if (benefitId) {
      getBenefitById(benefitId);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Benefit Details</title>
        <meta name="description" content="Description of Benefit Details" />
      </Helmet>

      <BenefitDetails />
    </div>
  )
}

BenefitDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBenefitById: data => dispatch(Actions.getBenefitById(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BenefitDetailsPage);
