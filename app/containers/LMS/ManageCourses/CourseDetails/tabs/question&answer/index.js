import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Avatar, List, ListSubheader, ListItem, ListItemText, ListItemAvatar, Grid, Paper, Toolbar, TextField, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  list: {
    "& .MuiListItemAvatar-root": {
      minWidth: "30px !important"
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.grey[800],
  },
  toolbar: {
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
}));

const comments = [
  { id: 1, comment: 'What is this course all about', employeeName: 'Joy Helen', dateCreated: '2020-07-24T09:34:25' },
  { id: 2, comment: 'What type of textbook should i buy to help you', employeeName: 'Samuel Okeke', dateCreated: '2020-07-24T09:34:25' },
]

const QuestionAnswer = props => {
  const classes = useStyles();
  const { loading, history } = props;

  const handleChange = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <Grid
      container
      justify='center'
    >
      <Grid item md={10}>
        <div className={classes.content}>
          <List dense={true}>
            <ListItem>
              <ListItemAvatar>
                <Avatar edge="end" aria-label="user-avi" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <TextField
                    name="comment"
                    label="Type your question here"
                    id="outlined-comment"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={''}
                    onChange={handleChange}
                  />
                }
              />
            </ListItem>
            {comments.map((comment, i) =>
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar edge="end" aria-label="user-avi" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Fragment>
                      <Typography variant="body2">{comment.employeeName}</Typography>
                      <Typography>{comment.comment}</Typography>
                    </Fragment>
                  }
                  secondary={moment(comment.dateCreated).format('lll')}
                />
              </ListItem>
            )}
          </List>
        </div>
      </Grid>
    </Grid>
  );
};

QuestionAnswer.propTypes = {
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
)(QuestionAnswer);
