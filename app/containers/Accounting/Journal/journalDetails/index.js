import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useRouteMatch } from "react-router-dom";
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import JournalDetails from './JournalDetails';

export function JournalDetailsPage(props) {
	const { params } = useRouteMatch();
	const { loading, getJournalById } = props;
	const { journalId } = params
	console.log(params, "paramss")

	useEffect(() => {
		if (journalId) {
			getJournalById(journalId);
		}
	}, []);

	return (
		<div>
			<Helmet>
				<title>Journal Details</title>
				<meta name="description" content="Description of Journal Details" />
			</Helmet>

			<JournalDetails />
		</div>
	)
}

JournalDetailsPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
	return {
		getJournalById: data => dispatch(Actions.getJournalById(data)),
	}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(JournalDetailsPage);
