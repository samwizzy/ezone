import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Selectors from "./selectors"
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { Widget1, Widget2, Widget3, Widget4, Widget5, Widget6, Widget7 } from './components/widgets'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	box: {
		width: theme.spacing(20),
		height: theme.spacing(20),
		//flex: '1 0 12em', // flex-grow flex-shrink flex-basis
		margin: theme.spacing(1, 0),
		padding: theme.spacing(2),
		borderRadius: '10px',
		display: 'flex',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
  },
}))

export function DashBoard(props) {
	const classes = useStyles()
	const { stats } = props

	console.log(stats, "stats")

	return (
	<div className={classes.root}>
		<Helmet>
			<title>Ezone - Dashboard</title>
			<meta name="description" content="Description of Crm" />
		</Helmet>

		<Grid container spacing={3}>
			<Grid item xs={12}>
				<Grid container className={classes.grid} spacing={3}>
					<Grid item xs={3}>
						<Widget1 activeModuleCount={stats && stats.activeModuleCount} />
					</Grid>
					<Grid item xs={3}>
						<Widget2 activeUsersCount={stats && stats.activeUsersCount} />
					</Grid>
					<Grid item xs={3}>
						<Widget3  inactiveUsersCount={stats && stats.inactiveUsersCount} />
					</Grid>
					<Grid item xs={3}>
						<Widget4 pendingModuleCount={stats && stats.pendingModuleCount} />
					</Grid>
					{/* <Grid item xs={4}>
						<Widget5 />
					</Grid> */}
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Grid container className={classes.grid} spacing={3}>
					<Grid item xs={6}>
						<Widget6 />
					</Grid>
					<Grid item xs={6}>
						<Widget7 />
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	</div>
	);
}

DashBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
	stats: Selectors.makeSelectStats()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DashBoard);
