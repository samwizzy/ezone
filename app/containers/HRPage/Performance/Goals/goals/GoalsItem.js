import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link as NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Box, Button, Divider, IconButton, Link, List, ListItem, ListItemText, ListItemSecondaryAction, Table, TableRow, TableCell, TableBody, Grid, Paper, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import classNames from 'classnames'
import { green, orange } from '@material-ui/core/colors'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import LensIcon from '@material-ui/icons/Lens';
import TodayIcon from '@material-ui/icons/Today';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StatusMenuList from './StatusMenuList';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		position: "relative",
		padding: theme.spacing(4, 2, 0, 2),
		margin: theme.spacing(1, 0)
	},
	status: {
		position: "absolute",
		backgroundColor: '#6DCC4C',
		color: theme.palette.common.white,
		top: 0, right: 0,
		"&::after": {
			content: "''",
			position: "absolute",
			top: 0,
			left: "-38.41px",
			width: 0,
			height: 0,
			borderTop: "38.41px solid #6DCC4C",
			borderLeft: "38.41px solid transparent"
		},
		"&::before": {
			content: "''",
			position: "absolute",
			top: 0,
			left: "-38.41px",
			width: 0,
			height: 0,
			borderBottom: "38.41px solid #6DCC4C",
			borderLeft: "38.41px solid transparent"
		}
	},
	flex: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		margin: theme.spacing(1, 0)
	},
	table: {
		whiteSpace: 'nowrap',
		'& .MuiTableCell-root': {
			border: "0 !important"
		},
	},
	icon: {
		width: 20,
		height: 20,
		marginRight: theme.spacing(0.5),
		'&.active': { color: green[500] },
	},
	link: {
		display: 'flex',
	},
	divider: {
		margin: theme.spacing(1, 0)
	}
}));


const GoalsItem = props => {
	const classes = useStyles();
	const { loading, match, goals } = props;

	React.useEffect(() => {
	}, []);

	console.log(goals, "goals")

	const handleClick = () => { }

	return (
		<div className={classes.root}>
			<Paper square className={classes.paper}>
				<div className={classes.status}>
					<StatusMenuList />
				</div>
				<List dense={true}>
					<ListItem>
						<ListItemText
							disableTypography
							primary={
								<React.Fragment>
									<Typography variant="h6">
										<NavLink to={`${match.url}/1`}>Customer follow up session</NavLink>
									</Typography>
									<Typography variant="subtitle2" color="textPrimary">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
									</Typography>
								</React.Fragment>
							}
							secondary={
								<div className={classes.flex}>
									<Breadcrumbs aria-label="breadcrumb" separator="">
										<Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
											Priority : &nbsp;
											<LensIcon className={clsx(classes.icon, { "active": true })} />
											Low
										</Link>
										<Link
											color="inherit"
											href="/getting-started/installation/"
											onClick={handleClick}
											className={classes.link}
										>
											<TodayIcon className={classes.icon} />
											Due Date : 2020/06/23
										</Link>
										<Typography color="textPrimary" className={classes.link}>
											Key Result : &nbsp;
											<CheckCircleOutlineIcon className={classes.icon} />
											7/10
										</Typography>
									</Breadcrumbs>
									<Breadcrumbs aria-label="breadcrumb" separator="">
										<Typography color="textPrimary" className={classes.link}>
											Sent To:
										</Typography>
										<Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
											View Employees
										</Link>
									</Breadcrumbs>
								</div>
							}
						/>
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete">
								<MoreVertIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Paper>
		</div>
	);
};

GoalsItem.propTypes = {
	loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
	loading: Selectors.makeSelectLoading(),
	goals: Selectors.makeSelectGoals()
});

function mapDispatchToProps(dispatch) {
	return {};
}

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

export default compose(
	withRouter,
	withConnect,
	memo,
)(GoalsItem);
