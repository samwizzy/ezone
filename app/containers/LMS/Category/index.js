/** LMS Cateory **/
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import makeSelectLMSCategory from './selectors';
import reducer from './reducer';
import saga from './saga';
import CategoryList from './components/CategoryList';
import CategoryDialog from './components/CategoryDialog'
import ModuleLayout from '../components/ModuleLayout';

const key = "lmsCategories"

export function CategoryApp(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getCategories } = props

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div>
      <Helmet>
        <title>LMS - Category</title>
        <meta name="description" content="Description of LMS Category" />
      </Helmet>

      <ModuleLayout>
        <CategoryList />
      </ModuleLayout>

      <CategoryDialog />
    </div>
  );
}

CategoryApp.propTypes = {
};

const mapStateToProps = createStructuredSelector({
  lmsCategories: makeSelectLMSCategory()
});

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(Actions.getCategories())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CategoryApp);
