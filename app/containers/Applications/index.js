import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectHome from './selectors';
import * as Actions from './actions';
import ProjectsApp from './ProjectsApp';

export function Home(props) {
  useInjectReducer({ key: 'applications', reducer });
  useInjectSaga({ key: 'applications', saga });

  const { getApplications } = props;

  React.useEffect(() => {
    getApplications();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Applications</title>
        <meta name="description" content="applications" />
      </Helmet>
      <ProjectsApp />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  applications: makeSelectHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    getApplications: () => dispatch(Actions.getApplications()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
