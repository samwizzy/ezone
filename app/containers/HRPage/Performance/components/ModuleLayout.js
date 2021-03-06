import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { compose } from 'redux';
import { Route, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MenuBar from '../../../../components/MenuBar'
import Goals from './../Goals';
import GoalsDetail from './../Goals/goal';
import Recognition from './../Recognition';
import RecognitionDetail from './../Recognition/recognition';
import Reviews360 from './../Reviews360';
import Reviews360Detail from './../Reviews360/review';
import Reviews from './../Feedback';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  active: {
    backgroundColor: theme.palette.common.white,
    color: `${darken(theme.palette.primary.main, 0.1)} !important`,
  },
}));

function ModuleLayout(props) {
  const classes = useStyles();
  const { match } = props
  const { params, path, url } = match

  console.log(match, "match performance")

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <React.Fragment>
            <NavLink exact to="/human-resource/performance/goals" activeClassName={classes.active}>
              Goals
            </NavLink>
            <NavLink to="/human-resource/performance/recognitions" activeClassName={classes.active}>
              Recognitions
            </NavLink>
            <NavLink to="/human-resource/performance/feedbacks" activeClassName={classes.active}>
              360<small><sup>0</sup></small> &nbsp;Reviews
            </NavLink>
            <NavLink to="/human-resource/performance/reviews" activeClassName={classes.active}>
              Feedback
            </NavLink>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            <Route exact path={path} component={Goals} />
            <Route exact path={`${path}/goals`} component={Goals} />
            <Route exact path={`${path}/goal/:id`} component={GoalsDetail} />
            <Route exact path={`${path}/recognitions`} component={Recognition} />
            <Route exact path={`${path}/recognition/:id`} component={RecognitionDetail} />
            <Route exact path={`${path}/feedbacks`} component={Reviews360} />
            <Route exact path={`${path}/feedback/:id`} component={Reviews360Detail} />
            <Route exact path={`${path}/reviews`} component={Reviews} />
            <Route exact path={`${path}/review/:id`} component={Reviews} />
          </div>
        }
      />
    </div>
  );
}

ModuleLayout.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({});

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
)(ModuleLayout);
