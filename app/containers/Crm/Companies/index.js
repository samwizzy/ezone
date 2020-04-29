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
import makeSelectCompanies from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as Actions from './actions';
import CompaniesList from './components/CompaniesList';

export function Companies(props) {
  useInjectReducer({ key: 'crmCompanies', reducer });
  useInjectSaga({ key: 'crmCompanies', saga });

  const { getAllCompaniesAction } = props;

  useEffect(() => {
    getAllCompaniesAction();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Companies</title>
        <meta name="description" content="Description of Companies" />
      </Helmet>
      <CompaniesList />
    </div>
  );
}

Companies.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getAllCompaniesAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  companies: makeSelectCompanies(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllCompaniesAction: () => dispatch(Actions.getAllCompanies()),
    dispatch,
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
