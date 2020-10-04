/* eslint-disable react/prop-types */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import clsx from "clsx";
import {
	makeStyles,
	Button,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	IconButton,
	Typography,
	Paper,
} from '@material-ui/core';
import * as Actions from '../../actions';
import * as AppSelectors from './../../../App/selectors'
import subscriptionIcon from '../../../../images/subscriptionIcon.svg'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		display: "flex",
		margin: theme.spacing(2)
	},
	card: {
		width: 275,
		color: "#fff",
		margin: theme.spacing(2),
		borderRadius: theme.shape.borderRadius * 4,
		textAlign: "center",
		"& .MuiCardContent-root": {
			minHeight: 220,
		},
		"& .MuiCardActions-root": {
			borderTop: `1px solid ${theme.palette.divider}`,
			justifyContent: "center"
		},
		"&.basic": {
			backgroundImage: "linear-gradient(180deg, #1A88E1 40.1%, #0A5A9B 79.69%)"
		},
		"&.full": {
			backgroundImage: "linear-gradient(180deg, #F1CA40 29.43%, #D52424 100%)"
		}
	},
	paper: {
		width: `calc(100% - 20px)`,
		padding: theme.spacing(1),
		borderRadius: "0 50px 50px 0"
	}
}));

const SubscriptionList = props => {
	const classes = useStyles();
	const { loading, currentUser } = props;

	return (
		<div className={classes.root}>
			<Card className={clsx(classes.card, { "basic": true })}>
				<CardHeader
					title="Basic License"
				/>
				<Paper className={classes.paper}>
					<Typography variant="h6" color="primary">
						N5000
					</Typography>
					<Typography variant="overline" component="h6" color="primary">
						Per Year / Monthly
					</Typography>
				</Paper>
				<CardContent>
					<Typography variant="body2">
						Full access to the application without support.
					</Typography>
				</CardContent>
				<CardActions>
					<Button color="inherit">Subscribe</Button>
				</CardActions>
			</Card>

			<Card className={clsx(classes.card, { "full": true })}>
				<CardHeader
					title="Full License"
				/>
				<Paper className={classes.paper}>
					<Typography variant="h6" color="primary">
						N10000
					</Typography>
					<Typography variant="overline" component="h6" color="primary">
						Per Year / Monthly
					</Typography>
				</Paper>
				<CardContent>
					<Typography variant="body2">
						Full access to the application with support inclusive.
					</Typography>
				</CardContent>
				<CardActions>
					<Button color="inherit">Subscribe</Button>
				</CardActions>
			</Card>
		</div>
	);
};

SubscriptionList.prototypes = {
	classes: PropTypes.object.isRequired,
	currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
	currentUser: AppSelectors.makeSelectCurrentUser()
});

function mapDispatchToProps(dispatch) {
	return {
		openSignatureDialog: evt => dispatch(Actions.openSignatureDialog(evt)),
	};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(SubscriptionList);
