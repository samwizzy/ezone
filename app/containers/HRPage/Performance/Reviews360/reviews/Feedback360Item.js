import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardHeader, CardContent, CardActions, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import clsx from 'clsx';
import moment from 'moment';
import classNames from 'classnames'
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import RecognitionIcon from '../../../../../images/recognitionIcon.svg';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
    "& .MuiCardHeader-root": {
      backgroundColor: lighten(theme.palette.divider, 0.8)
    },
    "& .MuiCardActions-root": {
      justifyContent: "space-between",
      flexDirection: 'column',
      "& span:not(:last-child)": {
        marginRight: theme.spacing(2)
      }
    },
  },
  card: {
    padding: theme.spacing(2)
  },
  text: {
    color: theme.palette.primary.main
  },
}));


const Feedback360Item = props => {
  const classes = useStyles();
  const { loading, match, recognition } = props;

  React.useEffect(() => {
  }, []);

  if (!recognition) {
    return ''
  }

  return (
    <Card className={classes.root} square classes={{ root: classes.card }}>
      <CardHeader
        title={
          <Typography variant="subtitle1" color="textSecondary">
            <Link to={`/human-resource/performance/feedback/${recognition.id}`}>{recognition.title}</Link>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {recognition.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div>
          <Typography variant="caption" aria-label="add to favorites">
            Reviewees: <span className={classes.text}>Mark Jones</span>
          </Typography>
          <Typography variant="caption" aria-label="share">
            Reviewers: <span className={classes.text}>Mark Jones, Mary Jane</span>
          </Typography>
        </div>
        <div>
          <Typography variant="caption" aria-label="add to favorites">
            <span className={classes.text}>10 / 15 Replies</span>
          </Typography>
          <Typography variant="caption" aria-label="share">
            Request deadline : {moment(recognition.dateCreated).format('ll')}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

Feedback360Item.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  recognitions: Selectors.makeSelectRecognitions()
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
)(Feedback360Item);
