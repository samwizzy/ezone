import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import EmployeeDetails from './EmployeeDetails';
import ConfirmDeleteEmployeeDialog from './ConfirmDeleteEmployeeDialog';

export function EmployeeDetailsApp(props) {
  const { getEmployee, match } = props;
  const { params } = match

  console.log(params, "emp detail params")

  useEffect(() => {
    getEmployee(params.empId)
  }, [])

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Details Page</title>
        <meta name="description" content="ezone application employee details page" />
      </Helmet>

      <EmployeeDetails />

      <ConfirmDeleteEmployeeDialog />

    </React.Fragment>
  );
}

EmployeeDetailsApp.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export function mapDispatchToProps(dispatch) {
  return {
    getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(EmployeeDetailsApp);
