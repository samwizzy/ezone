import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import Widget1 from './widgets/Widget1'
import Widget2 from './widgets/Widget2'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  },
}));

const ReportDashboard = props => {
  const classes = useStyles(props);
  const { accData, accounts } = props;

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Reports"
      />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Widget1 accData={accData} accounts={accounts} />
          </Grid>

          <Grid item xs={4}>
            <Widget2 accData={accData} accounts={accounts} />
          </Grid>

          <Grid item xs={4}>
            <Widget2 accData={accData} accounts={accounts} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>

  );
};

ReportDashboard.propTypes = {
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
)(ReportDashboard);
