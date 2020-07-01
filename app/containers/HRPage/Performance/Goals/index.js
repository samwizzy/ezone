/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as AppSelectors from '../../../App/selectors';
import * as AppActions from '../../../App/actions';
import * as Actions from './../actions';
import * as Selectors from './../selectors';
import GoalsList from './GoalsList'
import GoalsDetails from './goal'
import GoalsDialog from './components/GoalsDialog'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export function GoalsPage(props) {
  const { getGoals, match } = props;
  const { params } = match

  React.useEffect(() => {
    getGoals();
  }, []);

  console.log(params, "params")

  return (
    <React.Fragment>
      <Helmet>
        <title> Performance Goals Page</title>
        <meta name="description" content="ezone application goals page" />
      </Helmet>

      {params.pageId ?
        <GoalsDetails /> : <GoalsList />
      }

      <GoalsDialog />

    </React.Fragment>
  );
}

GoalsPage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getGoals: () => dispatch(Actions.getGoals()),
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
)(GoalsPage);
