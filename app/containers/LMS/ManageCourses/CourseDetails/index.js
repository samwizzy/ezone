import React, { useEffect, Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import CourseDetail from './CourseDetail'
import AssignmentDetail from './tabs/structure/AssignmentDetail'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const CourseDetailsPage = props => {
  const classes = useStyles();
  const { loading, history, match, getCourseById } = props;
  const { params } = match

  useEffect(() => {
    getCourseById(params.id)
  }, [])

  console.log(match, "match course details")

  return (
    <Fragment>
      <Route exact path={match.path} component={CourseDetail} />
      <Route exact path={`${match.path}/lecture/:id`} component={CourseDetail} />
      <Route exact path={`${match.path}/assignment/:id`} component={AssignmentDetail} />
    </Fragment>
  );
};

CourseDetailsPage.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCourseById: id => dispatch(Actions.getCourseById(id))
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
)(CourseDetailsPage);
