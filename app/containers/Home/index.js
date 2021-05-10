import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import * as Selectors from './selectors';
import saga from './saga';
import makeSelectHome from './selectors';
import * as Actions from './actions';
import ProjectsApp from './ProjectsApp';

export function Home(props) {
  useInjectReducer({ key: 'home', reducer });
  useInjectSaga({ key: 'home', saga });

  const { applications, getApplications } = props;

  React.useEffect(() => {
    getApplications();
  }, []);

  console.log(applications, 'applications');

  return (
    <div>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Helmet>
      <ProjectsApp />
    </div>
  );
}

Home.propTypes = {};

const mapStateToProps = createStructuredSelector({
  home: makeSelectHome(),
  applications: Selectors.makeSelectApplications(),
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
