import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { makeStyles, Icon, IconButton, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	title: { flexGrow: 1 },
	iconPaper: {
		boxShadow: theme.shadows[1],
	},
}));

const ControlledButtons = props => {
	const classes = useStyles();
	const { history, match } = props;

	const handleBack = () => {
		history.goBack();
	}

	return (
		<div className={classes.root}>
			<Toolbar className={classes.iconPaper} variant="dense">
				<IconButton onClick={handleBack}>
					<ArrowBackIcon />
				</IconButton>
				<Typography>Back</Typography>
				<Typography className={classes.title} />
				<IconButton>
					<Icon>print</Icon>
				</IconButton>
			</Toolbar>
		</div>
	)
}

ControlledButtons.propTypes = {};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
	return {}
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo,
)(ControlledButtons);
