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
import SalaryAdvanceDetails from './SalaryAdvanceDetails';

export function SalaryAdvanceDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getSalaryAdvanceById } = props;
  const { salaryId } = params

  useEffect(() => {
    if (salaryId) {
      getSalaryAdvanceById(salaryId);
    }
  }, [salaryId]);

  return (
    <div>
      <Helmet>
        <title>Salary Advance Details</title>
        <meta name="description" content="Description of Salary Advance Details" />
      </Helmet>

      <SalaryAdvanceDetails />
    </div>
  );
}

SalaryAdvanceDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSalaryAdvanceById: data => dispatch(Actions.getSalaryAdvanceById(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SalaryAdvanceDetailsPage);
