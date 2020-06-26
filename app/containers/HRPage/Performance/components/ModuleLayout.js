import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MenuBar from '../../../../components/MenuBar'
import Goals from './../Goals';
import Recognition from './../Recognition';
import Feedback360 from './../Feedback360';
import Reviews from './../Reviews';

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
  const { params } = match

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
              Feedback360
            </NavLink>
            <NavLink to="/human-resource/performance/reviews" activeClassName={classes.active}>
              Reviews
            </NavLink>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            {params.page === "goals" && <Goals />}
            {params.page === "recognitions" && <Recognition />}
            {params.page === "feedbacks" && <Feedback360 />}
            {params.page === "reviews" && <Reviews />}
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
