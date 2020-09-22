import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../App/selectors';
import Widget1 from './widgets/Widget1'
import Widget2 from './widgets/Widget2'
import Widget3 from './widgets/Widget3'
import Widget4 from './widgets/Widget4'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    justifyContent: "space-between",
  },
}));

const AccountDashBoard = props => {
  const classes = useStyles();
  const { } = props;

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item xs={6}>
              <Widget1 />
            </Grid>

            <Grid item xs={6}>
              <Widget2 />
            </Grid>

            <Grid item xs={8}>
              <Widget3 />
            </Grid>

            <Grid item xs={4}>
              <Widget4 />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>

  );
};

AccountDashBoard.propTypes = {
  loading: PropTypes.bool,
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
  withConnect,
  memo,
)(AccountDashBoard);
