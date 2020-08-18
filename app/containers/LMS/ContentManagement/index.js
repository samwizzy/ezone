/**
 *
 * Companies
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
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
import ContentsList from './ContentsList';
import AddCourse from './components/AddCourse';
import ModuleLayout from './ModuleLayout';

const key = "lmsContentMgt"

export function ContentManagement(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getContents, match } = props;
  const { path, url } = match

  console.log(match, "match")

  useEffect(() => {
    getContents();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Content Management</title>
        <meta name="description" content="Description of Content Management" />
      </Helmet>

      <ModuleLayout>
        <Route exact path={path} component={ContentsList} />
      </ModuleLayout>
    </div>
  );
}

ContentManagement.propTypes = {
  getContents: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lmsContentMgt: makeSelectCompanies(),
});

function mapDispatchToProps(dispatch) {
  return {
    getContents: () => dispatch(Actions.getContents()),
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
)(ContentManagement);
