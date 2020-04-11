import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from '../actions';
import MenuBar from '../../../components/MenuBar'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
        content={
          <Grid container>
            <Grid item xs={12} md={12}>
              {props.children}
            </Grid>
          </Grid>
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

export default withRouter(
  compose(
    withConnect,
    memo,
  )(ModuleLayout),
);
