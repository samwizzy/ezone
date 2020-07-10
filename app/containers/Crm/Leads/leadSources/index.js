/**
 *
 * Crm
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import LeadSourcesList from './LeadSourcesList';
import LeadSourceDialog from './components/LeadSourceDialog';

const key = 'crmLeads'

export function LeadSources(props) {
	useInjectReducer({ key, reducer });
	useInjectSaga({ key, saga });

	// const { } = props;
	useEffect(() => {
	}, []);

	return (
		<div>
			<Helmet>
				<title>Crm - Leads</title>
				<meta name="description" content="Description of Leads" />
			</Helmet>

			<LeadSourcesList />

			<LeadSourceDialog />

		</div>
	);
}

LeadSources.propTypes = {
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
	return {
		getLeads: () => dispatch(Actions.getLeads()),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(LeadSources);
