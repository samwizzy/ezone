/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
	Backdrop,
	CircularProgress,
	Divider,
	Grid,
	Icon,
	IconButton,
	Button,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FacebookIcon from '@material-ui/icons/Facebook';
import SocialMediaItems from './sources/SocialMediaItems'
import VideoMediaItems from './sources/VideoMediaItems'
import EmailMediaItems from './sources/EmailMediaItems'
import SMSMediaItems from './sources/SMSMediaItems'
import SEOMediaItems from './sources/SEOMediaItems'
import ADMediaItems from './sources/ADMediaItems'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'space-between',
		whiteSpace: 'nowrap',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	},
	grid: {
		width: 'fit-content',
		flex: '1 1',
		margin: theme.spacing(1),
		paddingRight: theme.spacing(4),
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: theme.shape.borderRadius * 2,
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.secondary,
		'& svg, & h6': {
			margin: theme.spacing(2),
		},
		'& p': {
			margin: theme.spacing(2, 2, 2, 0),
		},
		'& hr': {
			margin: theme.spacing(0, 0.5),
		},
	},
	toolbar: {
		alignItems: 'center',
		...theme.palette.toolbar
	},
	title: {
		flexGrow: 1
	}
}));

const LeadSourcesList = props => {
	const classes = useStyles();

	const {
		loading,
		leadSources,
		openNewLeadSourceDialog,
		openEditLeadSourceDialog,
	} = props;

	useEffect(() => {
	}, []);

	return (
		<React.Fragment>
			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Grid container spacing={1}>
				<Grid item xs={12}>
					<SocialMediaItems />
				</Grid>
				<Grid item xs={12}>
					<VideoMediaItems />
				</Grid>
				<Grid item xs={12}>
					<EmailMediaItems />
				</Grid>
				<Grid item xs={12}>
					<SMSMediaItems />
				</Grid>
				<Grid item xs={12}>
					<SEOMediaItems />
				</Grid>
				<Grid item xs={12}>
					<ADMediaItems />
				</Grid>
			</Grid>

		</React.Fragment>
	);
};

LeadSourcesList.propTypes = {
	loading: PropTypes.bool,
	openNewLeadSourceDialog: PropTypes.func,
	openEditLeadSourceDialog: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
	leadSources: Selectors.makeSelectLeadSources(),
});

function mapDispatchToProps(dispatch) {
	return {
		openNewLeadSourceDialog: () => dispatch(Actions.openNewLeadSourceDialog()),
		openEditLeadSourceDialog: data => dispatch(Actions.openEditLeadSourceDialog(data)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(LeadSourcesList);
