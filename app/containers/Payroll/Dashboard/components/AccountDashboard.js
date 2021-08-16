import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const AccountDashBoard = props => {
  const classes = useStyles(props);
  const { accData, accounts, accountsInTens } = props;

  console.log(accountsInTens, 'accounts In Tens');

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Widget1 accData={accData} accounts={accounts} />
        </Grid>

        <Grid item xs={8}>
          <Widget2 accData={accData} accounts={accounts} />
        </Grid>

        <Grid item xs={6}>
          <Widget3 />
        </Grid>

        <Grid item xs={6}>
          <Widget4 accData={accData} accounts={accounts} />
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
  accountsInTens: Selectors.makeSelectChartofAccountsRange(),
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
