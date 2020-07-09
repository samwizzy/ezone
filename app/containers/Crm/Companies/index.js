/**
 *
 * Companies
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCrmCompanies from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import CompaniesList from './components/CompaniesList';
import ModuleLayout from '../components/ModuleLayout';

const key = 'crmCompanies'
export function Companies(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getAllCompanies, getEmployees } = props;

  useEffect(() => {
    getAllCompanies();
    getEmployees();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Companies</title>
        <meta name="description" content="Description of Companies" />
      </Helmet>

      <ModuleLayout>
        <CompaniesList />
      </ModuleLayout>
    </div>
  );
}

Companies.propTypes = {
  getAllCompanies: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  crmCompanies: makeSelectCrmCompanies(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllCompanies: () => dispatch(Actions.getAllCompanies()),
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
)(Companies);
