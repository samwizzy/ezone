/* eslint-disable prettier/prettier */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	makeStyles,
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
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import LoadingIndicator from '../../../../../components/LoadingIndicator';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import YouTubeIcon from '@material-ui/icons/YouTube';

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
		'& svg, & h6, & .material-icons': {
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

const smses = [
	{ name: 'SMS campaigns', icon: 'mail_outlined' },
	{ name: 'Text/SMS ads', icon: 'mail_outlined' },
]

const SMSMediaItems = props => {
	const classes = useStyles();
	const { loading } = props;

	return (
		<React.Fragment>
			<Toolbar variant="dense" className={classes.toolbar}>
				<Typography variant="h6" className={classes.title}>SMS</Typography>
				<IconButton><AddCircleOutlineIcon /></IconButton>
			</Toolbar>
			<div className={classes.root}>
				{smses.map((card, i) =>
					<Grid key={i} container alignItems="center" className={classes.grid}>
						<Icon fontSize="large">{card.icon}</Icon>
						<Typography variant="body1">{card.name}</Typography>
					</Grid>
				)}
			</div>
		</React.Fragment>
	);
};

SMSMediaItems.propTypes = {
	loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
	return {};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withConnect,
	memo,
)(SMSMediaItems);
