import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Breadcrumbs, Box, Button, Card, CardHeader, CardContent, CardActions, Divider, IconButton, Paper, Typography } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
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
    "& .MuiCardActions-root": {
      justifyContent: "space-between",
      "& span:not(:last-child)": {
        marginRight: theme.spacing(2)
      }
    }
  },
  card: {
    padding: theme.spacing(2)
  },
  text: {
    color: theme.palette.primary.main
  },
}));


const RecognitionItem = props => {
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
        avatar={
          <React.Fragment>
            <AvatarGroup max={3}>
              {recognition.employees && recognition.employees.map((emp, i) =>
                <Avatar key={i} alt={emp.firstName + ' ' + emp.lastName} className={classes.avatar} src={`data:image/jpg;base64,${emp.organisation.logo}`} />
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
						<Typography display="inline"> Creativity</Typography>
          </React.Fragment>
        }
      />
      <CardContent>
        <Typography variant="subtitle1"><Link to={`/human-resource/performance/recognition/${recognition.id}`}>{recognition.title}</Link></Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {recognition.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <div>
          <Typography variant="caption" aria-label="add to favorites">
            <FavoriteBorderOutlinedIcon /> 13 <span className={classes.text}>likes</span>
          </Typography>
          <Typography variant="caption" aria-label="share">
            <CommentOutlinedIcon /> 14 <span className={classes.text}>comments</span>
          </Typography>
        </div>

        <Typography variant="caption" aria-label="share">
          {moment(recognition.dateCreated).fromNow()} <em>by</em> <span className={classes.text}>Chike Obi</span>
        </Typography>
      </CardActions>
    </Card>
  );
};

RecognitionItem.propTypes = {
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
)(RecognitionItem);
