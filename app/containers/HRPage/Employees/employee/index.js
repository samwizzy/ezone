/*
 * HRPage Employee
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import EmployeeDetails from './EmployeeDetails';

export function EmployeeDetailsApp(props) {
	const { getEmployee, match } = props;
	const { params } = match

	console.log(params, "emp detail params")

	React.useEffect(() => {
		getEmployee(params.status)
	}, [])

	return (
		<React.Fragment>
			<Helmet>
				<title>Employee Details Page</title>
				<meta name="description" content="ezone application employee details page" />
			</Helmet>

			<EmployeeDetails />

		</React.Fragment>
	);
}

EmployeeDetailsApp.propTypes = {
	token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
	token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
	return {
		getEmployee: (uuid) => dispatch(Actions.getEmployee(uuid)),
	};
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
