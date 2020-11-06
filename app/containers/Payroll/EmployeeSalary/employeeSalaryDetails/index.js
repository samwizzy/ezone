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
import EmployeeSalaryDetails from './EmployeeSalaryDetails';

export function EmployeeSalaryDetailsPage(props) {
  const { params } = useRouteMatch();
  const { loading, getEmployeeSalaryById } = props;
  const { salaryId } = params;

  useEffect(
    () => () => {
      if (salaryId) {
        getEmployeeSalaryById(salaryId);
      }
    },
    [],
  );

  return (
    <div>
      <Helmet>
        <title>Employee Salary Details</title>
        <meta name="description" content="Description of Employee Salary Details" />
      </Helmet>

      <EmployeeSalaryDetails />
    </div>
  );
}

EmployeeSalaryDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployeeSalaryById: data => dispatch(Actions.getEmployeeSalaryById(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeSalaryDetailsPage);
