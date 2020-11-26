import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { darken } from '@material-ui/core/styles/colorManipulator';
import MenuBar from '../../../components/MenuBar'

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

  return (
    <div className={classes.root}>
      <MenuBar
        navigations={
          <React.Fragment>
            <NavLink exact to="/payroll/payroll-items/allowance" activeClassName={classes.active}>
              Allowance
            </NavLink>
            <NavLink to="/payroll/payroll-items/benefits" activeClassName={classes.active}>
              Benefits
            </NavLink>
            <NavLink to="/payroll/payroll-items/earnings" activeClassName={classes.active}>
              Earnings
            </NavLink>
            <NavLink to="/payroll/payroll-items/deductions" activeClassName={classes.active}>
              Deductions
            </NavLink>
          </React.Fragment>
        }
        content={
          <div className={classes.content}>
            {props.children}
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