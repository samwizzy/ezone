import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, AppBar, Button, ButtonGroup, Card, CardContent, CardMedia, Icon, IconButton, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../../../../actions';
import * as Selectors from '../../../../selectors';
import * as AppSelectors from '../../../../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VideoImage from '../../../../../../../images/videoImage.svg';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
		marginBottom: theme.spacing(1)
	},
	card: {
		// width: 600,
		border: `1px solid ${theme.palette.divider}`
	},
	media: {
		width: 300,
		height: 300,
		backgroundSize: 'contain'
	},
	icon: {
		color: theme.palette.grey[800],
	},
	details: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: 'center'
	},
	flex: {
		display: "flex",
		justifyContent: "space-between",
	},
	toolbar: {
		justifyContent: "space-between",
		padding: theme.spacing(1),
	}
}));

const AssignmentDetails = props => {
	const classes = useStyles();
	const { loading, history } = props;

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<AppBar color="inherit" position="static" elevation={1}>
						<Toolbar variant="dense" className={classes.toolbar}>
							<Typography variant="h6">
								<IconButton onClick={() => history.goBack()}><ArrowBackIcon className={classes.icon} /></IconButton> Assignment Statistics
							</Typography>
						</Toolbar>
					</AppBar>
				</Grid>
				<Grid item md={12}>

					<Card>
						<CardContent>
							<div className={classes.content}>
								<Typography variant="subtitle1">Description</Typography>
								<Typography variant="body2">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis id sit accumsan, posuere velit neque ac auctor tellus. Ipsum interdum condimentum adipiscing netus eget lobortis imperdiet.
								</Typography>
							</div>
							<div className={classes.content}>
								<Typography variant="subtitle1">Instructions</Typography>
								<Typography variant="body2">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis id sit accumsan, posuere velit neque ac auctor tellus. Ipsum interdum condimentum adipiscing netus eget lobortis imperdiet. Posuere viverra amet massa cursus elementum. Amet lacus amet risus quam mattis aenean velit quam. Vulputate euismod mauris massa nunc senectus cras odio elementum pulvinar. Non mauris diam mauris mattis volutpat nisi arcu, amet, sodales. Velit quam pretium dictum et tincidunt turpis. Nulla eget quis egestas maecenas tristique porta ac pulvinar. Est purus dui, quam nibh duis volutpat leo, id ac. Nisl eu, lectus feugiat massa semper diam. Turpis neque sit placerat sagittis amet. Sociis et tristique nunc aliquet risus, nulla nam duis. Sed suspendisse senectus habitant adipiscing eget.
								</Typography>
							</div>
							<div className={classes.content}>
								<Typography variant="subtitle1" gutterBottom>Due Date</Typography>
								<div className={classes.flex}>
									<Typography variant="body2">3rd July, 2020 &nbsp; 3 : 00 PM</Typography>
									<Typography variant="body2">20 marks</Typography>
								</div>

								<Card className={classes.card} elevation={0}>
									<div className={classes.details}>
										<CardMedia
											className={classes.media}
											image={VideoImage}
											title="Live from space album cover"
										/>
										<CardContent className={classes.nn}>
											<Typography component="subtitle1" variant="h5">
												Intoduction to statistics  - YouTube
											</Typography>
											<Typography variant="body2" color="textSecondary">
												YouTube video    7 minutes
											</Typography>
										</CardContent>
									</div>
								</Card>
							</div>
						</CardContent>
					</Card>

				</Grid>
			</Grid>
		</div>
	);
};

AssignmentDetails.propTypes = {
	loading: PropTypes.bool,
	getEmployees: PropTypes.func,
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
	withRouter,
	withConnect,
	memo,
)(AssignmentDetails);
