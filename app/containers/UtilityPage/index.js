/**
 *
 * OrgPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUtilityPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ProjectsApp from './ProjectsApp'

export function UtilityPage() {
  useInjectReducer({ key: 'utilityPage', reducer });
  useInjectSaga({ key: 'utilityPage', saga });

  return (
    <div>
      <Helmet>
        <title>Utility Page</title>
        <meta name="description" content="Utility Page" />
      </Helmet>
      <ProjectsApp />
    </div>
  );
}

UtilityPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  utilityPage: makeSelectUtilityPage(),
});

function mapDispatchToProps(dispatch) {
  return {
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
)(UtilityPage);
