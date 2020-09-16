/**
 *
 * Companies
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCompanies from './../selectors';
import reducer from './../reducer';
import saga from './../saga';
import * as Actions from './../actions';
import ModuleLayout from '../../components/ModuleLayout';

export function UserDetailsPage(props) {
  useInjectReducer({ key: 'crmCompanies', reducer });
  useInjectSaga({ key: 'crmCompanies', saga });

  const { getAllCompaniesAction, match } = props;
  const { path } = match

  useEffect(() => {
    getAllCompaniesAction();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Student Details Page</title>
        <meta name="description" content="Description of Student Details Page" />
      </Helmet>

      <ModuleLayout>
      </ModuleLayout>
    </div>
  );
}

UserDetailsPage.propTypes = {
  getAllCompaniesAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  companies: makeSelectCompanies(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(UserDetailsPage);
