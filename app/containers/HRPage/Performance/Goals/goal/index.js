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
import * as AppSelectors from '../../../../App/selectors';
import * as AppActions from '../../../../App/actions';
import * as Actions from './../../actions';
import * as Selectors from './../../selectors';
import GoalsDetails from './GoalsDetails'

export function GoalsDetailsApp(props) {
  const { getGoalsById, match } = props;
  const { params } = match

  console.log(params, "goal details params")

  React.useEffect(() => {
    getGoalsById(params.id);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title> Performance Goals Detail Page</title>
        <meta name="description" content="ezone application goals detail page" />
      </Helmet>

      <GoalsDetails />

    </React.Fragment>
  );
}

GoalsDetailsApp.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getGoalsById: (id) => dispatch(Actions.getGoalsById(id)),
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
)(GoalsDetailsApp);
