import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
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
  const { getEmployees, getGoals, getRecognitions } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    getEmployees();
    getGoals();
    getRecognitions();
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

PerformancePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  performance: makeSelectPerformancePage(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getGoals: () => dispatch(Actions.getGoals()),
    getRecognitions: () => dispatch(Actions.getRecognitions()),
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
