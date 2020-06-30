import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MenuBar from '../../../../components/MenuBar'
import LeaveRequest from './../LeaveRequest';
import LeaveType from './../LeaveType';
import Holidays from './../Holidays';

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

  console.log(match, "match leave management")

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <React.Fragment>
            <NavLink exact to="/human-resource/leave-management/leave-request" activeClassName={classes.active}>
              Leave Requests
            </NavLink>
            <NavLink to="/human-resource/leave-management/leave-type" activeClassName={classes.active}>
              Leave Types
            </NavLink>
            <NavLink to="/human-resource/leave-management/holidays" activeClassName={classes.active}>
              Holidays
            </NavLink>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            {params.page === "leave-request" && <LeaveRequest />}
            {params.page === "leave-type" && <LeaveType />}
            {params.page === "holidays" && <Holidays />}
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
