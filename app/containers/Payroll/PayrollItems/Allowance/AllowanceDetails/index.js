import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from "react-router-dom";
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import AllowanceDetails from './AllowanceDetails';

export function AllowanceDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getAllowanceById } = props;
  const { allowanceId } = params

  useEffect(() => {
    if (allowanceId) {
      getAllowanceById(allowanceId);
    }
  }, [allowanceId]);

  return (
    <div>
      <Helmet>
        <title>Allowance Details</title>
        <meta name="description" content="Description of Allowance Details" />
      </Helmet>

      <AllowanceDetails />
    </div>
  )
}

AllowanceDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllowanceById: data => dispatch(Actions.getAllowanceById(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AllowanceDetailsPage);
