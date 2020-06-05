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
import classNames from 'classnames'
import { green, orange } from '@material-ui/core/colors'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import AwardIcon from '../../../../../images/awardIcon.svg';

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
	const { loading } = props;
	const [comment, setComment] = React.useState({comment: ""})

  React.useEffect(() => {
  }, []);

  const handleChange = ({target}) => {
    setComment({...state, [target.name]: target.value})
  }

  return (
		<Card className={classes.root} square classes={{root: classes.card}}>
			<CardHeader
				avatar={
					<>
					<AvatarGroup max={3}>
						<Avatar alt="Remy Sharp" className={classes.avatar} src="/static/images/avatar/1.jpg" />
						<Avatar alt="Travis Howard" className={classes.avatar} src="/static/images/avatar/2.jpg" />
						<Avatar alt="Cindy Baker" className={classes.avatar} src="/static/images/avatar/3.jpg" />
						<Avatar alt="Agnes Walker" className={classes.avatar} src="/static/images/avatar/4.jpg" />
						<Avatar alt="Trevor Henderson" className={classes.avatar} src="/static/images/avatar/5.jpg" />
					</AvatarGroup>
					<Typography variant="body2" color="textSecondary">
						Mike Eze, Mike Eze, Mike Eze & Mike Eze <small>were Recognized for</small> Creativity
					</Typography>
					</>
				}
				action={
					<React.Fragment>
						<img src={AwardIcon} /> &nbsp;
						<Typography display="inline"> Creativity </Typography>
					</React.Fragment>
				}
			/>
			<CardContent>
				<Typography variant="subtitle1">Great Job on the new Sales</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					This impressive paella is a perfect party dish and a fun meal to cook together with your
					guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<Typography variant="caption" aria-label="add to favorites">
					<FavoriteBorderOutlinedIcon /> 13 <span className={classes.text}>likes</span>
				</Typography>
				
				<Typography variant="caption" aria-label="share">
					3 days ago <em>by</em> <span className={classes.text}>Chike Obi</span>
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
						value=""
						onChange={handleChange}
						variant="outlined"
						margin="normal"
						rows={3}
						multiline
						fullWidth
					/>
					<Button variant="contained" color="primary">Comment</Button>
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
