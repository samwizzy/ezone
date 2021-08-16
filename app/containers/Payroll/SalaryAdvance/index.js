import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Route, useRouteMatch } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSalaryAdvance from './selectors';
import * as Actions from './actions';
import * as Selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import ModuleLayout from '../components/ModuleLayout';
import SalaryAdvanceList from './components/SalaryAdvanceList';
import SalaryAdvanceDetails from './SalaryAdvanceDetails';
import SalaryAdvanceDialog from './components/SalaryAdvanceDialog';
import ConfirmDeleteSalaryAdvanceDialog from './components/ConfirmDeleteSalaryAdvanceDialog';

const key = 'salaryAdvance';
export function SalaryAdvancePage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { path } = useRouteMatch();

  const { loading, getSalaryAdvances } = props;

  useEffect(() => {
    // getSalaryAdvances();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Payroll — Salary Advance</title>
        <meta name="description" content="Description of Salary Advance" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={SalaryAdvanceList} />
        <Route path={`${path}/:salaryId`} component={SalaryAdvanceDetails} />
      </ModuleLayout>

      <SalaryAdvanceDialog />
      <ConfirmDeleteSalaryAdvanceDialog />
    </div>
  );
}

SalaryAdvancePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  salaryAdvance: makeSelectSalaryAdvance(),
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSalaryAdvances: () => dispatch(Actions.getSalaryAdvances()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SalaryAdvancePage);
