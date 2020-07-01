import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Card, CardHeader, CardContent, CardActions, List, ListItem, ListItemText, ListItemAvatar, IconButton, Typography, TextField } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import moment from 'moment';
import classNames from 'classnames'
import { green, orange } from '@material-ui/core/colors'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import RecognitionIcon from '../../../../../images/recognitionIcon.svg';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		"& .MuiCardActions-root": {
			justifyContent: "space-between"
		}
	},
	card: {
		padding: theme.spacing(2)
	},
	content: {
		margin: theme.spacing(1, 0)
	},
	text: {
		color: theme.palette.primary.main
	},
}));


const RecognitionItem = props => {
	const classes = useStyles();
	const { loading, recognition } = props;
	const [form, setForm] = React.useState({ comment: "", recognitionId: recognition.id })

	React.useEffect(() => {
	}, []);

	const handleChange = ({ target }) => {
		setForm({ ...form, [target.name]: target.value })
	}

	const handleSubmit = () => {

	}

	return (
		<Card className={classes.root} square classes={{ root: classes.card }}>
			<CardHeader
				avatar={
					<React.Fragment>
						<AvatarGroup max={3}>
							{recognition.employees && recognition.employees.map(emp =>
								<Avatar alt={emp.firstName + ' ' + emp.lastName} className={classes.avatar} src={`data:image/jpg;base64,${emp.organisation.logo}`} />
							)}
						</AvatarGroup>
						<Typography variant="body2" color="textSecondary">
							{recognition.employees ?
								<React.Fragment>
									{_.map(recognition.employees, 'firstName').join(', ')}
									<small> {recognition.employees.length > 1 ? 'were' : 'was'} Recognized for</small> Creativity
								</React.Fragment>
								:
								'No recognitions recorded'
							}
						</Typography>
					</React.Fragment>
				}
				action={
					<React.Fragment>
						<img src={RecognitionIcon} /> &nbsp;
						<Typography display="inline"> Creativity </Typography>
					</React.Fragment>
				}
			/>
			<CardContent>
				<Typography variant="subtitle1">{recognition.title}</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{recognition.description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Typography variant="caption" aria-label="add to favorites">
					<FavoriteBorderOutlinedIcon /> 13 <span className={classes.text}>likes</span>
				</Typography>

				<Typography variant="caption" aria-label="share">
					{moment(recognition.dateCreated).fromNow()} <em>by</em> <span className={classes.text}>Chike Obi</span>
				</Typography>
			</CardActions>

			<CardContent>
				<Typography variant="h6">
					Comments <span className={classes.text}>(23)</span>
				</Typography>

				<div className={classes.content}>
					<TextField
						label="Comment"
						name="comment"
						value={form.comment}
						onChange={handleChange}
						variant="outlined"
						margin="normal"
						rows={3}
						multiline
						fullWidth
					/>
					<Button variant="contained" color="primary" onClick={handleSubmit}>Comment</Button>
				</div>

				<div className={classes.content}>
					<List dense={true}>
						<ListItem>
							<ListItemAvatar>
								<Avatar edge="end" aria-label="user-avi" />
							</ListItemAvatar>
							<ListItemText
								primary={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, "}
								secondary={"3rd Jul 2019    3:00pm"}
							/>
						</ListItem>
					</List>
				</div>
			</CardContent>
		</Card>
	);
};

RecognitionItem.propTypes = {
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
)(RecognitionItem);
