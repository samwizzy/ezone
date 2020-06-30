/*
 * HRPage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as AppSelectors from '../../App/selectors';
import * as AppActions from '../../App/actions';
import * as Actions from './actions';
import makeSelectPerformancePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from './components/ModuleLayout';

const key = 'performance';

export function PerformancePage(props) {
  const { getEmployees, getGoals } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getEmployees();
    getGoals();
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>Performance Page</title>
        <meta name="description" content="ezone application performance page" />
      </Helmet>

      <ModuleLayout />
    </React.Fragment>
  );
}

PerformancePage.propTypes = {
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  performance: makeSelectPerformancePage(),
  token: AppSelectors.makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getGoals: () => dispatch(Actions.getGoals()),
    getEmployees: () => dispatch(Actions.getEmployees()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PerformancePage);
