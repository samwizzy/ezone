import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, Avatar, Button, Card, CardHeader, CardContent, CardActions, Divider, Grid, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, IconButton, Typography, Slider } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import moment from 'moment';
import classNames from 'classnames'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import ProgressCircular from './ProgressCircular'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    "& .MuiCardActions-root": {
      justifyContent: "space-between"
    }
  },
  sliderRoot: {
    margin: 'auto',
    width: 300 + theme.spacing(3) * 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  card: {
    padding: theme.spacing(2)
  },
  content: {
    margin: theme.spacing(2, 0),
    "& h6": {
      margin: theme.spacing(2, 0),
    }
  },
  text: {
    color: theme.palette.primary.main
  },
}));

const reviews = [
  { value: 'Strongly Disagree' },
  { value: 'Disagree' },
  { value: 'Neither Disagree/Agree' },
  { value: 'Agree' },
  { value: 'Strongly Agree' },
]

const qualities = [
  { value: 'A multitasker' },
  { value: 'Collaborates with team mates' },
  { value: 'Excellect customer relationship' },
]

const marks = [
  {
    value: 0,
    label: 'Poor',
  },
  {
    value: 100,
    label: 'Excellent',
  },
];

function valuetext(value) {
  return `${value}%`;
}

const MyDivider = withStyles(theme => ({
  root: {
    margin: theme.spacing(5, 0)
  }
}))(Divider)

const Feedback360Detail = props => {
  const classes = useStyles();
  const { loading, recognition, commentRecognition } = props;
  const [form, setForm] = React.useState({ comment: "", recognitionId: "" })

  React.useEffect(() => {
    recognition &&
      setForm({ ...form, recognitionId: recognition.id })
  }, [recognition]);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleSubmit = () => {
    commentRecognition(form)
  }

  console.log(form, "recognition form")

  return (
    <Card className={classes.root} square classes={{ root: classes.card }}>
      <CardContent>
        <Typography variant="subtitle1">{recognition.title}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {recognition.description}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography variant="h6">
          Replies for <span>Mark Jones</span>
        </Typography>

        <div className={classes.content}>
          <Typography variant="subtitle1" gutterBottom>
            1.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ?
          </Typography>

          <Grid container spacing={2}>
            {[0, 1].map((review, i) =>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  <IconButton size="small"><Avatar alt="avatar" /></IconButton> <span>Mike Adonis</span>
                </Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqui
                </Typography>
              </Grid>
            )}
          </Grid>
        </div>

        <MyDivider />

        <div className={classes.content}>
          <Typography variant="subtitle1" gutterBottom>
            2.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ?
          </Typography>
          {recognition.comments.length > 0 ?
            <List dense={true}>
              {reviews.map((review, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <ProgressCircular />
                  </ListItemAvatar>
                  <ListItemText
                    primary={review.value}
                    secondary={moment().format('lll')}
                  />
                  <ListItemSecondaryAction>
                    <AvatarGroup max={3} >
                      {[0, 1, 2, 3].map((avi, i) =>
                        <Avatar key={i} />
                      )}
                    </AvatarGroup>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
            </List> :
            <Typography variant="subtitle1" color="textSecondary">You are no reviews</Typography>
          }
        </div>
        <MyDivider />

        <div className={classes.content}>
          <Typography variant="subtitle1">
            3.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ?
          </Typography>
          {recognition.comments.length > 0 ?
            <Fragment>
              <div className={classes.sliderRoot}>
                <Slider
                  defaultValue={80}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider-always"
                  step={10}
                  marks={marks}
                  valueLabelDisplay="on"
                />
                <AvatarGroup max={3}>
                  {[0, 1, 2, 3].map((avi, i) =>
                    <Avatar key={i} />
                  )}
                </AvatarGroup>
              </div>

            </Fragment>
            :
            <Typography variant="subtitle1" color="textSecondary">You are no reviews</Typography>
          }
        </div>
        <MyDivider />
        <div className={classes.content}>
          <Typography variant="subtitle1" gutterBottom>
            4.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ?
          </Typography>
          {recognition.comments.length > 0 ?
            <List dense={true}>
              {qualities.map((quality, i) =>
                <ListItem key={i}>
                  <ListItemAvatar>
                    <CheckIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary={quality.value}
                  />
                </ListItem>
              )}
            </List> :
            <Typography variant="subtitle1" color="textSecondary">You are no qualities</Typography>
          }
        </div>
        <MyDivider />
      </CardContent>
    </Card>
  );
};

Feedback360Detail.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  goals: Selectors.makeSelectGoals()
});

function mapDispatchToProps(dispatch) {
  return {
    commentRecognition: (data) => dispatch(Actions.commentRecognition(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(Feedback360Detail);
